import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Rota não encontrada:", location.pathname);
  }, [location.pathname]);

  const internalLinks = [
    { title: "Banda para Casamento em Campinas", url: "/cidade/banda-casamento-campinas" },
    { title: "Eventos Corporativos em São Paulo", url: "/cidade/evento-corporativo-sao-paulo" },
    { title: "Show para Eventos em Barueri", url: "/cidade/evento-corporativo-barueri" },
    { title: "Blog e Dicas de Organização", url: "/blog" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 font-inter">
      <Helmet>
        <title>Página não encontrada | 404 - Barbie Kills</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="text-center max-w-2xl py-12">
        <h1 className="mb-4 text-7xl md:text-9xl font-bold font-oswald text-white tracking-tighter">404</h1>

        <p className="mb-6 text-xl md:text-2xl font-oswald uppercase tracking-[0.2em] text-gray-400">
          O show não pode parar, mas esta página parou.
        </p>

        <p className="mb-8 text-gray-500 font-light max-w-md mx-auto">
          Parece que você pegou o caminho errado para os bastidores. Que tal voltar para o palco principal ou explorar
          nossos destinos?
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <a
            href="/"
            className="inline-block bg-white text-black px-10 py-4 rounded-full font-oswald uppercase tracking-widest text-sm hover:bg-gray-200 transition-all transform hover:scale-105"
          >
            Voltar para a Home
          </a>
        </div>

        {/* Seção de Links para SEO e Retenção */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-xs uppercase tracking-widest text-gray-600 mb-6 font-oswald">Páginas Recomendadas</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {internalLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="group flex items-center p-3 rounded-lg border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all"
              >
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{link.title}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 opacity-20 grayscale flex justify-center">
          <img src="/barbie-kills-banda-eventos-casamentos.webp" alt="Barbie Kills" className="w-32" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
