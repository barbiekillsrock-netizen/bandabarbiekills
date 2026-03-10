import { useState, useCallback } from 'react';

const videos = [{
  id: 'rAVb_-U7OAU',
  title: 'Barbie Kills - Show Completo',
  main: true
}, {
  id: 's0BHAN9Edew',
  title: 'Barbie Kills - Casamento',
  main: false
}, {
  id: 'RLIIDCt0MlA',
  title: 'Barbie Kills - Evento Corporativo',
  main: false
}];

const YouTubeFacade = ({ id, title }: { id: string; title: string }) => {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  if (loaded) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1`}
        title={`Assista ao show da Barbie Kills: ${title}`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    );
  }

  return (
    <button
      onClick={handleLoad}
      className="relative w-full h-full bg-black group cursor-pointer"
      aria-label={`Reproduzir vídeo: ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt={`Banda Barbie Kills ao vivo - ${title}`}
        width={480}
        height={360}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
        <svg viewBox="0 0 68 48" className="w-16 h-12" aria-hidden="true">
          <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/>
          <path d="M45 24 27 14v20" fill="white"/>
        </svg>
      </div>
    </button>
  );
};

const MediaSection = () => {
  return <section id="midia" className="py-16 lg:py-20 section-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-4"><span className="neon-pink-text">CONHEÇA</span> NOSSO SOM
          </h2>
          <p className="subtitle text-lg text-muted-foreground max-w-2xl mx-auto">
            Assista aos nossos shows e sinta a energia
          </p>
        </div>

        {/* Main Video */}
        <div className="mb-8">
          <div className="aspect-video rounded-2xl overflow-hidden video-glow">
            <YouTubeFacade id={videos[0].id} title={videos[0].title} />
          </div>
        </div>

        {/* Secondary Videos */}
        <div className="grid md:grid-cols-2 gap-8">
          {videos.slice(1).map(video => <div key={video.id} className="aspect-video rounded-2xl overflow-hidden video-glow hover:scale-[1.02] transition-transform duration-300">
              <YouTubeFacade id={video.id} title={video.title} />
            </div>)}
        </div>
      </div>
    </section>;
};
export default MediaSection;