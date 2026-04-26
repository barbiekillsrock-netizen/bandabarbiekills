-- ============================================
-- LIVE REQUEST ENGINE — Tabelas isoladas
-- ============================================

-- 1) Repertório global
CREATE TABLE public.songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist TEXT,
  default_min_price NUMERIC(10,2) NOT NULL DEFAULT 20 CHECK (default_min_price >= 1),
  default_sug_price NUMERIC(10,2) NOT NULL DEFAULT 50 CHECK (default_sug_price >= 1),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2) Sessões de show
CREATE TABLE public.shows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  event_date DATE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Garante que apenas UM show esteja ativo por vez
CREATE UNIQUE INDEX shows_only_one_active
  ON public.shows ((is_active)) WHERE is_active = true;

-- 3) Setlist do dia
CREATE TYPE public.setlist_status AS ENUM ('available', 'pending', 'locked', 'played');

CREATE TABLE public.show_setlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  show_id UUID NOT NULL REFERENCES public.shows(id) ON DELETE CASCADE,
  song_id UUID NOT NULL REFERENCES public.songs(id) ON DELETE RESTRICT,
  custom_min_price NUMERIC(10,2),
  custom_sug_price NUMERIC(10,2),
  status public.setlist_status NOT NULL DEFAULT 'available',
  pending_until TIMESTAMPTZ,
  locked_at TIMESTAMPTZ,
  played_at TIMESTAMPTZ,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (show_id, song_id)
);

CREATE INDEX idx_show_setlist_show ON public.show_setlist(show_id, status);

-- 4) Pagamentos
CREATE TYPE public.payment_status AS ENUM ('pending', 'approved', 'rejected', 'cancelled', 'refunded');

CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  show_setlist_id UUID NOT NULL REFERENCES public.show_setlist(id) ON DELETE CASCADE,
  show_id UUID NOT NULL REFERENCES public.shows(id) ON DELETE CASCADE,
  requester_name TEXT NOT NULL CHECK (char_length(requester_name) BETWEEN 1 AND 60),
  amount NUMERIC(10,2) NOT NULL CHECK (amount >= 1),
  status public.payment_status NOT NULL DEFAULT 'pending',
  mp_payment_id TEXT UNIQUE,
  qr_code TEXT,
  qr_code_base64 TEXT,
  ticket_url TEXT,
  expires_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  played_at TIMESTAMPTZ,
  is_manual BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_show_status ON public.payments(show_id, status);
CREATE INDEX idx_payments_setlist ON public.payments(show_setlist_id);

-- 5) Log de webhooks
CREATE TABLE public.mp_webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mp_payment_id TEXT,
  event_type TEXT,
  raw_payload JSONB,
  processed BOOLEAN NOT NULL DEFAULT false,
  error_message TEXT,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- Trigger updated_at
-- ============================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_songs_updated BEFORE UPDATE ON public.songs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_shows_updated BEFORE UPDATE ON public.shows
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_setlist_updated BEFORE UPDATE ON public.show_setlist
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_payments_updated BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================
-- RLS
-- ============================================
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.show_setlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mp_webhook_logs ENABLE ROW LEVEL SECURITY;

-- Admins (autenticados) — acesso total
CREATE POLICY "Authenticated full access songs" ON public.songs
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated full access shows" ON public.shows
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated full access setlist" ON public.show_setlist
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated full access payments" ON public.payments
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated full access webhook_logs" ON public.mp_webhook_logs
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- Anon — leitura mínima APENAS do show ativo
CREATE POLICY "Anon read active show" ON public.shows
  FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "Anon read active show setlist" ON public.show_setlist
  FOR SELECT TO anon USING (
    EXISTS (SELECT 1 FROM public.shows s WHERE s.id = show_setlist.show_id AND s.is_active = true)
  );

-- Necessário para o JOIN com songs no setlist
CREATE POLICY "Anon read songs of active show" ON public.songs
  FOR SELECT TO anon USING (
    EXISTS (
      SELECT 1 FROM public.show_setlist ss
      JOIN public.shows s ON s.id = ss.show_id
      WHERE ss.song_id = songs.id AND s.is_active = true
    )
  );

-- Anon pode VER apenas o próprio pagamento via id (mas não listar todos)
-- Como não há login, o frontend filtra por id retornado pela edge function
CREATE POLICY "Anon read approved payments of active show" ON public.payments
  FOR SELECT TO anon USING (
    status = 'approved' AND
    EXISTS (SELECT 1 FROM public.shows s WHERE s.id = payments.show_id AND s.is_active = true)
  );

-- Anon NÃO escreve em lugar nenhum — tudo via Edge Functions (service role).

-- ============================================
-- Realtime
-- ============================================
ALTER TABLE public.show_setlist REPLICA IDENTITY FULL;
ALTER TABLE public.payments REPLICA IDENTITY FULL;
ALTER TABLE public.shows REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.show_setlist;
ALTER PUBLICATION supabase_realtime ADD TABLE public.payments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.shows;

-- ============================================
-- RPC pública: buscar pagamento próprio por ID (para polling de fallback)
-- ============================================
CREATE OR REPLACE FUNCTION public.get_payment_status(p_payment_id UUID)
RETURNS TABLE (id UUID, status public.payment_status, approved_at TIMESTAMPTZ)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT id, status, approved_at FROM public.payments WHERE id = p_payment_id LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_payment_status(UUID) TO anon, authenticated;

-- ============================================
-- Cron: liberar pendings expirados a cada 1 min
-- ============================================
CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE OR REPLACE FUNCTION public.release_expired_pending()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.show_setlist
  SET status = 'available', pending_until = NULL
  WHERE status = 'pending' AND pending_until IS NOT NULL AND pending_until < now();

  UPDATE public.payments
  SET status = 'cancelled'
  WHERE status = 'pending' AND expires_at IS NOT NULL AND expires_at < now();
END; $$;

SELECT cron.schedule(
  'release-expired-pending',
  '* * * * *',
  $$SELECT public.release_expired_pending();$$
);