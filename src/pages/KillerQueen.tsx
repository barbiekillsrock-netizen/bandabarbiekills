import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import KillerQueenNavbar from "@/components/KillerQueenNavbar";
import Footer from "@/components/Footer";
import killerQueenLogo from "@/assets/killer-queen-logo.png";

const VOCALIST_IMG = "/vocalista-banda-casamento.webp";
const BODY_IMG = "/banda-casamentos-eventos-campinas-barbie-kills.webp";

const videos = [
  { id: "rAVb_-U7OAU", title: "Killer Queen Performance ao vivo 1" },
  { id: "lF0BWL3VamQ", title: "Killer Queen Performance ao vivo 2" },
  { id: "RLIIDCt0MlA", title: "Killer Queen Performance ao vivo 3" },
];

const repertorio = [
  { title: "A Trindade Pop", artists: "Madonna, Lady Gaga e Britney Spears." },
  { title: "Divas Internacionais", artists: "Beyoncé, Rihanna, Katy Perry e Cher." },
  { title: "Nostalgia & Energia", artists: "Spice Girls, Cyndi Lauper e Blondie." },
  { title: "Hits Atuais", artists: "Dua Lipa, Miley Cyrus e Kim Petras." },
  { title: "Poder Nacional", artists: "Pabllo Vittar e Gloria Groove." },
];

const formatos = [
  {
    name: "GOLDEN PULSE",
    sub: "Quarteto",
    desc: "2 vozes, guitarra, teclado, baixo e bateria. O núcleo essencial da Barbie Kills. Entrega máxima de energia e hits com logística enxuta.",
  },
  {
    name: "ELECTRIC BLOOM",
    sub: "Sexteto",
    desc: 'A experiência "Premium". 3 vozes, trompete, guitarra, teclado, baixo e bateria. Conta com Bruno Almeida (trompetista nacionalmente reconhecido) e Sarah Souza nos vocais de apoio, trazendo um brilho de big band moderna para o palco.',
  },
  {
    name: "HYBRID NIGHT",
    sub: "Banda + DJ",
    desc: "Show integrado organicamente ao set do nosso DJ Oficial Barbie Kills. Uma solução completa para a noite inteira, eliminando silêncios e criando uma narrativa contínua.",
  },
];

const KillerQueen = () => {
  const scrollToVideos = () => {
    document.getElementById("videos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>Killer Queen by Barbie Kills | Show Premium para Casas Noturnas</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Killer Queen by Barbie Kills: experiência live de luxo para casas noturnas, unindo banda ao vivo e energia das pistas."
        />
      </Helmet>

      <KillerQueenNavbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 bg-black">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="font-oswald uppercase tracking-[0.3em] text-neon-pink text-sm md:text-base mb-8">
            Barbie Kills apresenta
          </p>
          <img
            src={killerQueenLogo}
            alt="Killer Queen by Barbie Kills"
            className="mx-auto w-full max-w-2xl h-auto mb-10"
            width={1024}
            height={520}
          />
          <p className="font-inter font-light text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            A fusão definitiva entre o prestígio da música ao vivo e a energia imparável das pistas.
          </p>
        </div>
      </section>

      {/* CONCEITO */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#050505] via-[#0B0015] to-[#020005]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-bebas text-5xl md:text-6xl text-foreground mb-2 tracking-wide">O CONCEITO:</h2>
            <h2 className="font-bebas text-5xl md:text-6xl text-neon-pink mb-8 tracking-wide">KILLER QUEEN</h2>
            <div className="space-y-5 font-inter font-light text-gray-200 leading-relaxed">
              <p>
                O projeto Killer Queen não é apenas um tributo; é uma intervenção artística desenhada para o cenário das
                grandes casas noturnas. Em um mercado saturado por DJs e covers genéricos, a Barbie Kills entrega o que
                faltava na noite: a experiência live de luxo.
              </p>
              <p>
                Reinterpretamos os hinos que moldaram a cultura pop, de Madonna, Lady Gaga e Dua Lipa a Gloria Groove e
                Pablo Vittar, sob uma ótica de alta performance. O resultado é um show que une o groove e a batida das
                pistas com a alma e a pegada orgânica do rock, mantendo a pista em um estado de euforia e movimento.
              </p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(255,0,127,0.2)]">
            <img
              src={VOCALIST_IMG}
              alt="Vocalista da Barbie Kills em performance Killer Queen"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bebas text-5xl md:text-6xl text-center text-foreground mb-4 tracking-wide">
            DIFERENCIAIS <span className="text-neon-pink">ESTRATÉGICOS</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              {
                title: "Autoridade Artística e Poder Feminino",
                body: "Diferente de bandas convencionais, a Barbie Kills é liderada por mulheres que são referências em suas áreas. O palco é dominado pela voz marcante e presença magnética de Mariana Chaib. Na bateria, o show ganha um nível de prestígio e técnica raramente visto na noite: Mey Fogari, baterista também da Orquestra Sinfônica de Campinas, imprime uma execução impecável e uma dinâmica que eleva o nível sonoro da casa. É a segurança de músicos de elite entregando um entretenimento de massa.",
              },
              {
                title: "Repertório que fala a língua do público",
                body: 'Nós focamos em músicas que geram identificação imediata e diversão. O setlist é composto por hinos de Britney Spears, Beyoncé, Spice Girls, Cher, Katy Perry, Adele, Lady Gaga, Gloria Groove e Pablo Vittar, transformando cada refrão em um momento "instagramável", levando a engajamento espontâneo e uma memória positiva duradoura associada à marca da casa.',
              },
              {
                title: "Dinâmica de Pista",
                body: "Entendemos que na balada, a música é o combustível do bar. Nosso show de 120 minutos é estruturado sem intervalos ou pausas que esfriem o público. As transições são emendadas de forma inteligente, mantendo a energia no topo. É a força de uma banda ao vivo com a fluidez de um DJ Set.",
              },
              {
                title: "Alta Performance",
                body: "Sabemos que o tempo de montagem e a clareza sonora são críticos. Nossa operação é otimizada para ser rápida e eficiente: Agilidade na montagem e passagem de som rápidas, respeitando o cronograma da casa. Controle total com tecnologia de ponta para garantir um som de festival com volume de palco controlado, garantindo conforto acústico e qualidade sonora para o público.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-8 hover:border-neon-pink/40 transition-colors"
              >
                <h3 className="font-oswald uppercase tracking-wider text-xl text-neon-pink mb-4">{item.title}</h3>
                <p className="font-inter font-light text-gray-200 leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATOS */}
      <section
        className="py-24 px-4 relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.92), rgba(0,0,0,0.95)), url(${BODY_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-bebas text-5xl md:text-6xl text-center text-foreground mb-4 tracking-wide">
            <span className="text-neon-pink">FORMATOS</span>
          </h2>
          <p className="text-center font-inter font-light text-gray-300 max-w-2xl mx-auto mb-16">
            Adaptamos a experiência Killer Queen conforme o impacto da sua noite.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {formatos.map((f) => (
              <div
                key={f.name}
                className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-8 flex flex-col"
              >
                <h3 className="font-bebas text-3xl text-neon-pink tracking-wide">{f.name}</h3>
                <p className="font-oswald uppercase tracking-widest text-sm text-cyan-300 mb-5">{f.sub}</p>
                <p className="font-inter font-light text-gray-200 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REPERTÓRIO */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#050505] via-[#0B0015] to-[#020005]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-bebas text-5xl md:text-6xl text-foreground tracking-wide">
              REPERTÓRIO: <span className="text-neon-pink">OS HINOS DA PISTA</span>
            </h2>
            <p className="font-inter font-light text-gray-200 leading-relaxed mt-4 text-lg max-w-2xl mx-auto">
              Uma jornada dinâmica e sem pausas pelos ícones que definem gerações.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(255,0,127,0.2)] max-w-[280px] w-full aspect-[3/4]">
                <img
                  src={BODY_IMG}
                  alt="Banda Barbie Kills em show ao vivo Killer Queen"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <ul className="md:col-span-8 grid sm:grid-cols-2 gap-4">
              {repertorio.map((r) => (
                <li
                  key={r.title}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:border-neon-pink/40 transition-colors"
                >
                  <p className="font-oswald uppercase tracking-wider text-neon-pink text-sm mb-2">{r.title}</p>
                  <p className="font-inter font-light text-gray-100 text-sm leading-relaxed">{r.artists}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="videos" className="py-24 px-4 bg-gradient-to-b from-[#020005] via-[#0B0015] to-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-5xl md:text-6xl text-foreground mb-6 tracking-wide">
              POR QUE <span className="text-neon-pink">AGORA?</span>
            </h2>
            <p className="font-inter font-light text-gray-200 max-w-3xl mx-auto leading-relaxed text-lg">
              A Barbie Kills está selecionando parceiros e clubes referência para as próximas datas do projeto Killer
              Queen. Se o seu objetivo é oferecer uma atração que una músicos renomados, estética impecável e uma
              entrega profissional que garanta o sucesso da sua pista, estamos prontos para conversar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {videos.map((v) => (
              <div
                key={v.id}
                className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,0,127,0.15)]"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://wa.me/5519982846842?text=Ol%C3%A1!%20Tenho%20interesse%20no%20projeto%20Killer%20Queen."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="hero" size="lg">
                Booking e Contratação
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer variant="minimal" />
    </main>
  );
};

export default KillerQueen;
