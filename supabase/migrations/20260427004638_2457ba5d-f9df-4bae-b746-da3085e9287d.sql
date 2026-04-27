
-- 1) Remover campos de "preço sugerido" - manter apenas mínimo
ALTER TABLE public.songs DROP COLUMN IF EXISTS default_sug_price;
ALTER TABLE public.show_setlist DROP COLUMN IF EXISTS custom_sug_price;

-- 2) Adicionar estilo musical
ALTER TABLE public.songs ADD COLUMN IF NOT EXISTS style text;

-- 3) Adicionar status operacional do pedido (tocando | concluida | descartada)
--    Mantemos played_at para auditoria e usamos play_state para a fila operacional.
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS play_state text NOT NULL DEFAULT 'queued';

-- (queued = na fila ativa | tocando = destaque neon | concluida = histórico | descartada = arquivada)
-- 4) Garantir que release_expired_pending continua funcional (sem alterações necessárias).
