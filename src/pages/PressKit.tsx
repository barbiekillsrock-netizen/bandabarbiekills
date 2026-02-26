import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Link } from 'react-router';

const PressKit = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0B0015] to-[#020005] flex flex-col">
      <Helmet>
        <title>Press Kit - Barbie Kills</title>
        <meta name="description" content="Press Kit oficial da banda Barbie Kills. Fotos, logos, rider técnico e informações para imprensa." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <header className="w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="transition-transform duration-300 hover:scale-105">
            <img
              src="/logo-barbie-kills.png"
              alt="Logo da banda Barbie Kills"
              width={160}
              height={56}
              className="h-12 md:h-14"
            />
          </Link>
          <Button variant="neonPink" size="lg" asChild>
            <a
              href="https://drive.google.com/drive/folders/10an798APQs6ewVd_v-2Dcq-ZjVutEPMP?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2" size={20} />
              Baixar Press Kit
            </a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center py-24 px-6">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h1 className="heading-display text-6xl md:text-8xl neon-pink-text">
            Press Kit
          </h1>
          <p className="subtitle text-sm md:text-base text-muted-foreground tracking-widest">
            Material oficial para imprensa e contratantes
          </p>
          <p className="text-body text-lg leading-relaxed">
            Acesse fotos em alta resolução, logotipos, rider técnico e todas as informações necessárias sobre a Barbie Kills.
          </p>
          <Button variant="hero" size="xl" asChild>
            <a
              href="https://drive.google.com/drive/folders/10an798APQs6ewVd_v-2Dcq-ZjVutEPMP?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2" size={24} />
              Acessar Press Kit Completo
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default PressKit;
