import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const channelList = [
  { canal: '1', instrumento: 'Kick', microfone: 'AKG D112', pedestal: 'Chão' },
  { canal: '2', instrumento: 'Snare Top', microfone: 'Shure SM57', pedestal: 'Clamp' },
  { canal: '3', instrumento: 'Hi-Hat', microfone: 'Shure SM81', pedestal: 'Girafa' },
  { canal: '4', instrumento: 'Tom 1', microfone: 'Sennheiser e604', pedestal: 'Clamp' },
  { canal: '5', instrumento: 'Tom 2', microfone: 'Sennheiser e604', pedestal: 'Clamp' },
  { canal: '6', instrumento: 'Floor', microfone: 'Sennheiser e604', pedestal: 'Clamp' },
  { canal: '7', instrumento: 'Over L', microfone: 'Shure SM81', pedestal: 'Girafa' },
  { canal: '8', instrumento: 'Over R', microfone: 'Shure SM81', pedestal: 'Girafa' },
  { canal: '9', instrumento: 'Contrabaixo', microfone: 'Direct Box', pedestal: 'N/A' },
  { canal: '10', instrumento: 'Guitarra', microfone: 'Shure SM57', pedestal: 'Girafa ou de chão' },
  { canal: '11', instrumento: 'Violão', microfone: 'Direct Box', pedestal: 'N/A' },
  { canal: '12', instrumento: 'Ukulele', microfone: 'Direct Box', pedestal: 'N/A' },
  { canal: '13', instrumento: 'Trompete', microfone: 'Shure Beta 98H/C ou SM58', pedestal: 'Girafa' },
  { canal: '14', instrumento: 'VS', microfone: 'Direct Box', pedestal: 'N/A' },
  { canal: '15', instrumento: 'Voz Principal 1', microfone: 'Beta 58A sem fio', pedestal: 'Girafa' },
  { canal: '16', instrumento: 'Voz Principal 2', microfone: 'Beta 58A sem fio', pedestal: 'Girafa' },
  { canal: '17', instrumento: 'Voz Masculino', microfone: 'Shure Beta 58A (com fio)', pedestal: 'Girafa' },
];

const Rider = () => {
  return (
    <>
      <Helmet>
        <title>Rider Técnico e Camarim | Barbie Kills</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="bg-black border-b border-white/10 py-6 px-4 md:px-8">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link to="/">
              <img src="/logo-barbie-kills.webp" alt="Barbie Kills" className="h-10 md:h-14 w-auto object-contain" />
            </Link>
            <span className="font-oswald text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Rider Técnico & Camarim
            </span>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20 space-y-20">

          {/* ===== RIDER TÉCNICO ===== */}
          <section className="space-y-12">
            <div className="text-center space-y-3">
              <h1 className="heading-display text-5xl md:text-7xl neon-pink-text">Rider Técnico</h1>
              <p className="text-muted-foreground font-light max-w-2xl mx-auto">
                Equipamentos a serem disponibilizados pelo contratante, caso optem pela contratação do som por conta própria.
              </p>
              <p className="subtitle text-xs text-neon-cyan tracking-[0.3em]">Banda Pop Rock — 4 a 6 músicos</p>
            </div>

            {/* PA */}
            <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
              <h2 className="heading-display text-3xl md:text-4xl text-neon-pink">Equipamentos de P.A.</h2>
              <ul className="space-y-3 text-sm md:text-base text-foreground/80 font-light list-disc list-inside marker:text-neon-pink">
                <li>Sistema de PA com no mínimo 20 canais com potência adequada para as condições de apresentação</li>
                <li>Mesa de som digital operada por técnico capacitado — <strong className="text-neon-cyan">não aceitamos mesa de som analógica</strong></li>
                <li>5 monitores de chão — caixas ativas de primeira linha: QSC K12.2, EV ZLX12P ou Yamaha DBR12 — <strong className="text-neon-cyan">não aceitamos Antera nem marcas nacionais</strong></li>
                <li>SPL mínimo de 110 dB, sem nenhuma distorção e/ou ruído indesejável na house mix</li>
              </ul>
            </div>

            {/* Pedestais */}
            <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
              <h2 className="heading-display text-3xl md:text-4xl text-neon-pink">Pedestais</h2>
              <ul className="space-y-3 text-sm md:text-base text-foreground/80 font-light list-disc list-inside marker:text-neon-pink">
                <li>10 pedestais do tipo girafa — marcas de primeira linha (RMV ou Santo Ângelo)</li>
                <li>5 clamps — suporte microfone bateria</li>
              </ul>
            </div>

            {/* Microfones */}
            <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
              <h2 className="heading-display text-3xl md:text-4xl text-neon-pink">Microfones</h2>
              <ul className="space-y-3 text-sm md:text-base text-foreground/80 font-light list-disc list-inside marker:text-neon-pink">
                <li>2 Microfones Shure Beta58A sem fio para voz</li>
                <li>3 Microfones Shure Beta58A para voz</li>
                <li>1 Microfone Shure SM57 para amplificador de guitarra</li>
                <li>AKG D112 para Bumbo, 2 Shure SM57 para caixa e chimbal, 3 Sennheiser e604 para tons e Shure SM81 (over)</li>
              </ul>
            </div>

            {/* Bateria */}
            <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
              <h2 className="heading-display text-3xl md:text-4xl text-neon-pink">Bateria</h2>
              <ul className="space-y-3 text-sm md:text-base text-foreground/80 font-light list-disc list-inside marker:text-neon-pink">
                <li>Bateria (casco) de marcas importadas de primeira linha: Pearl, DW, Tama, Gretsch, Ludwig, Yamaha</li>
                <li><strong className="text-neon-cyan">Não aceitamos marcas nacionais nem de segunda linha</strong> (RMV, Odery, Michael, Peace, Turbo, etc)</li>
                <li>Bumbo de no mínimo 20"</li>
                <li>5 estantes para prato</li>
                <li>1 estante para caixa · 1 máquina de hi-hat · 1 caixa · 1 banco de bateria</li>
                <li>Peles novas</li>
                <li>A bateria deve estar em perfeito estado de conservação. Não serão aceitas estantes faltando presilhas ou feltros.</li>
              </ul>
            </div>

            {/* Amplificadores */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
                <h2 className="heading-display text-2xl md:text-3xl text-neon-pink">Amplificador de Contrabaixo</h2>
                <ul className="space-y-3 text-sm text-foreground/80 font-light list-disc list-inside marker:text-neon-pink">
                  <li>Marca importada — 1ª linha: MarkBass, Ampeg, GK, Hartke, Carlsbro</li>
                  <li>Potência mínima de 500W</li>
                </ul>
              </div>
              <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
                <h2 className="heading-display text-2xl md:text-3xl text-neon-pink">Amplificador de Guitarra</h2>
                <ul className="space-y-3 text-sm text-foreground/80 font-light list-disc list-inside marker:text-neon-pink">
                  <li>1 amplificador valvulado: Fender Bassman, Twin Reverb, Marshall Plexi ou Marshall JCM800</li>
                  <li><strong className="text-neon-cyan">Não aceitamos Roland Jazz Chorus, transistorizados nem marcas nacionais</strong></li>
                </ul>
              </div>
            </div>

            {/* Palco */}
            <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
              <h2 className="heading-display text-3xl md:text-4xl text-neon-pink">Palco</h2>
              <p className="text-foreground/80 font-light">
                Palco de no mínimo <strong className="text-neon-cyan">6 × 3 metros</strong> — sem fissuras, totalmente firme, totalmente coberto por carpete com fechamento frontal, lateral e fundos e com escada lateral.
              </p>
            </div>

            {/* Outros */}
            <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
              <h2 className="heading-display text-3xl md:text-4xl text-neon-pink">Outros</h2>
              <ul className="space-y-3 text-sm md:text-base text-foreground/80 font-light list-disc list-inside marker:text-neon-pink">
                <li>4 direct box para violões, ukulele, baixo e VS</li>
                <li>Cabos e conectores de áudio e alimentação para todo o sistema</li>
                <li>4 filtros de linha 127V AC para ligação de pedaleiras e acessórios</li>
                <li>Sistema todo aterrado, sem choques e riscos</li>
                <li>1 ventilador grande e potente (sugestão: Britânia C50 Turbo 200W)</li>
              </ul>
            </div>

            {/* Recursos humanos */}
            <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
              <h2 className="heading-display text-3xl md:text-4xl text-neon-pink">Recursos Humanos</h2>
              <ul className="space-y-3 text-sm md:text-base text-foreground/80 font-light list-disc list-inside marker:text-neon-pink">
                <li>Técnico de som capacitado da empresa contratada</li>
                <li>Roadie capacitado para apoio durante o show</li>
              </ul>
            </div>

            {/* Channel List Table */}
            <div className="space-y-4">
              <h2 className="heading-display text-3xl md:text-4xl text-neon-pink text-center">Channel List</h2>
              <div className="glass-card rounded-xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-neon-cyan font-oswald uppercase tracking-wider text-xs">Canal</TableHead>
                      <TableHead className="text-neon-cyan font-oswald uppercase tracking-wider text-xs">Instrumento / Voz</TableHead>
                      <TableHead className="text-neon-cyan font-oswald uppercase tracking-wider text-xs">Microfone / DI</TableHead>
                      <TableHead className="text-neon-cyan font-oswald uppercase tracking-wider text-xs">Pedestal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {channelList.map((ch) => (
                      <TableRow key={ch.canal} className="border-white/5 hover:bg-white/5">
                        <TableCell className="font-mono text-neon-pink font-bold">{ch.canal}</TableCell>
                        <TableCell className="text-foreground/80 font-light">{ch.instrumento}</TableCell>
                        <TableCell className="text-foreground/80 font-light">{ch.microfone}</TableCell>
                        <TableCell className="text-foreground/80 font-light">{ch.pedestal}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Mapa de Palco */}
            <div className="space-y-4 text-center">
              <h2 className="heading-display text-3xl md:text-4xl text-neon-pink">Mapa de Palco</h2>
              <div className="glass-card rounded-xl p-4 inline-block mx-auto">
                <img
                  src="/rider/mapa-palco.png"
                  alt="Mapa de palco Barbie Kills"
                  className="max-w-full md:max-w-2xl mx-auto rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Equipamentos da banda */}
            <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
              <h2 className="heading-display text-3xl md:text-4xl text-neon-pink">Equipamentos de Responsabilidade da Banda</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="subtitle text-sm text-neon-cyan mb-2">Instrumentos de corda</h3>
                  <ul className="space-y-2 text-sm text-foreground/80 font-light list-disc list-inside marker:text-neon-pink">
                    <li>Guitarras / Contrabaixos / Violão / Ukulele</li>
                    <li>Pedaleira de efeitos para guitarra</li>
                    <li>Pedaleira de efeitos para contrabaixo</li>
                    <li>Cabos de áudio dos instrumentos até os amplificadores (de posse da banda) apenas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="subtitle text-sm text-neon-cyan mb-2">Alimentação</h3>
                  <ul className="space-y-2 text-sm text-foreground/80 font-light list-disc list-inside marker:text-neon-pink">
                    <li>30 garrafas de água de 500 mL (mineral ou filtrada potável)</li>
                    <li>Alimentação adequada para toda equipe 2 horas antes do show</li>
                    <li>Proposta Golden Pulse: 6 pessoas</li>
                    <li>Proposta Electric Bloom: 8 pessoas</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Considerações */}
            <div className="glass-card rounded-xl p-6 md:p-8 space-y-4 border-neon-pink/30">
              <h2 className="heading-display text-3xl md:text-4xl text-neon-pink">Considerações Importantes</h2>
              <ul className="space-y-3 text-sm text-foreground/80 font-light list-disc list-inside marker:text-neon-cyan">
                <li>A empresa de som responsável pelo evento deve dispor de equipamentos de nível profissional em excelentes condições de funcionamento</li>
                <li>O técnico de som da empresa contratada deverá seguir todas as orientações dadas pelo Produtor Musical da banda</li>
                <li>Não serão aceitos equipamentos falsificados nem em más condições</li>
                <li>Necessária alimentação estabilizada na tensão 127 Volts no palco</li>
                <li>O palco deverá estar nivelado e firme ao pisar, sem fissuras, furos ou pregos</li>
                <li>Verificar todo equipamento com no mínimo 5 horas de antecedência da passagem de som</li>
                <li>A banda não se responsabiliza por quaisquer danos ocorridos nos equipamentos disponibilizados pela empresa de som contratada</li>
                <li>Deve ser disponibilizado local coberto para apresentação, devidamente protegido no caso de chuvas</li>
                <li>O rider de som pode ser flexibilizado com contato antecipado de no mínimo 7 dias</li>
              </ul>
            </div>
          </section>

          {/* Divisor */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent" />
            <span className="subtitle text-xs text-neon-pink tracking-[0.3em]">★</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent" />
          </div>

          {/* ===== RIDER DE CAMARIM ===== */}
          <section className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="heading-display text-5xl md:text-7xl neon-pink-text">Rider de Camarim</h2>
              <p className="text-muted-foreground font-light max-w-2xl mx-auto">
                A necessidade do camarim é para que nossa equipe acomode seus equipamentos, consiga ter um descanso e se alimente nos intervalos para oferecer a melhor performance possível e realize as trocas de roupa e maquiagem.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 md:p-8 space-y-6 border-neon-cyan/20">
              <p className="text-foreground/70 font-light text-sm italic">
                Em caso de indisponibilidade ou restrições quanto ao camarim do local, avisar previamente para que a equipe possa se preparar. A Banda Barbie Kills tem experiência o suficiente para compreender que cada evento é único e que cada local oferece uma infraestrutura diferente, portanto, estamos abertos para conversar.
              </p>
            </div>

            {/* Especificações */}
            <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
              <h3 className="heading-display text-3xl md:text-4xl text-neon-pink">Especificações do Camarim</h3>
              <ul className="space-y-3 text-sm md:text-base text-foreground/80 font-light list-disc list-inside marker:text-neon-pink">
                <li>Banheiro limpo, sem infiltrações, com vaso, pia, espelho, sabonete, papel higiênico, papel de mão, toalhas limpas e tapete</li>
                <li>Espelho grande</li>
                <li>Mesa para 8 lugares</li>
                <li>8 cadeiras</li>
                <li>Ar-condicionado ou ventilador</li>
                <li>Lixeira grande</li>
                <li>Ponto de energia (110 ou 220V)</li>
                <li>Área recomendada: <strong className="text-neon-cyan">16 m² ou maior</strong></li>
                <li>Água potável gelada disponível desde a abertura do local</li>
                <li>A chave do camarim deve ser compartilhada apenas com o Produtor da Banda. O camarim não deve ser compartilhado com demais equipes e/ou artistas.</li>
              </ul>
            </div>

            {/* Alimentação */}
            <div className="glass-card rounded-xl p-6 md:p-8 space-y-4">
              <h3 className="heading-display text-3xl md:text-4xl text-neon-pink">Alimentação da Banda e da Equipe</h3>
              <p className="text-foreground/80 font-light mb-4">Os contratantes podem optar livremente por uma das duas opções:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-5 border border-neon-pink/20 space-y-2">
                  <h4 className="subtitle text-sm text-neon-cyan">Opção 1 — Buffet da Festa</h4>
                  <p className="text-foreground/70 font-light text-sm">
                    Oferecer o buffet da festa para a equipe da banda — exatamente a mesma alimentação e bebidas que serão oferecidos para os convidados/público. É padrão de mercado os buffets terem valores reduzidos para staff.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-5 border border-neon-pink/20 space-y-2">
                  <h4 className="subtitle text-sm text-neon-cyan">Opção 2 — Valor por Integrante</h4>
                  <p className="text-foreground/70 font-light text-sm">
                    Pagamento de <strong className="text-neon-pink">R$ 120,00</strong> por integrante da equipe (músicos e funcionários como carregadores, técnicos de som) referente a alimentação do dia todo.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contato */}
          <div className="text-center space-y-4 pt-8 pb-4">
            <p className="subtitle text-xs text-muted-foreground tracking-[0.3em]">Contato — Produção de Eventos</p>
            <p className="heading-display text-2xl text-foreground">Renato Santoro</p>
            <a
              href="https://wa.me/5519981736659"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-neon-pink hover:text-neon-cyan transition-colors font-light"
            >
              (19) 98173-6659 — Cel e WhatsApp
            </a>
            <br />
            <a href="mailto:barbiekillsrock@gmail.com" className="text-foreground/60 hover:text-neon-cyan transition-colors font-light text-sm">
              barbiekillsrock@gmail.com
            </a>
          </div>

        </main>
      </div>
    </>
  );
};

export default Rider;
