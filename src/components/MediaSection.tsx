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
            <iframe src={`https://www.youtube.com/embed/${videos[0].id}`} title={videos[0].title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>

        {/* Secondary Videos */}
        <div className="grid md:grid-cols-2 gap-8">
          {videos.slice(1).map(video => <div key={video.id} className="aspect-video rounded-2xl overflow-hidden video-glow hover:scale-[1.02] transition-transform duration-300">
              <iframe src={`https://www.youtube.com/embed/${video.id}`} title={video.title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>)}
        </div>
      </div>
    </section>;
};
export default MediaSection;