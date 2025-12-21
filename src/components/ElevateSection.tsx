import { Button } from '@/components/ui/button';
const ElevateSection = () => {
  return <section className="py-24 lg:py-32 section-gradient-alt">
      <div className="container mx-auto px-6">
        <div className="relative flex flex-col lg:flex-row items-stretch">
          {/* Text Box (Overlay on desktop) */}
          <div className="relative z-10 lg:w-1/2 lg:-mr-24">
            <div className="glass-card bg-black/60 backdrop-blur-xl p-10 lg:p-14 rounded-2xl lg:rounded-3xl h-full flex flex-col justify-center">
              <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-none">ELEVE O NÍVEL
DO SEU EVENTO<span className="neon-pink-text">ELEVE O NÍVEL</span>
                <br />
                DO SEU EVENTO?
              </h2>

              <div className="space-y-6 text-body text-lg leading-relaxed">
                <p>
                  Nos palcos, a banda é liderada por <span className="text-foreground font-medium">Mariana Chaib</span>, que chama atenção pela sua atitude e principalmente pela sua voz intoxicante que prende a atenção de quem a ouve em segundos.
                </p>
                <p>
                  A performance é uma explosão de energia que transforma qualquer ambiente. Cada música é pensada para criar momentos únicos, desde as baladas que emocionam até os hits que fazem todos dançarem.
                </p>
                <p>
                  Com leitura de pista impecável e repertório versátil, garantimos que seu evento seja lembrado para sempre.
                </p>
              </div>

              <div className="mt-10">
                <Button variant="neonPinkOutline" size="lg">
                  Conheça Nosso Show
                </Button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:w-2/3 h-[400px] lg:h-[650px] -mt-8 lg:mt-0">
            <img src="/banda-casamento-interacao-noiva.jpg" alt="Barbie Kills interação com noiva em casamento" className="w-full h-full object-cover rounded-2xl lg:rounded-l-none lg:rounded-r-3xl shadow-2xl" />
            {/* Pink Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-neon-pink/10 rounded-2xl lg:rounded-l-none lg:rounded-r-3xl" />
          </div>
        </div>
      </div>
    </section>;
};
export default ElevateSection;