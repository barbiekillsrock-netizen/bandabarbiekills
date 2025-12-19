import { Quote } from 'lucide-react';

const testimonials = [
  {
    image: '/depoimento-marcos-mion-banda.jpg',
    name: 'Marcos Mion',
    role: 'Apresentador de TV',
    quote: 'Uma energia inexplicável! A Barbie Kills transformou meu evento em uma experiência inesquecível. Profissionalismo do início ao fim.',
  },
  {
    image: '/depoimento-tiago-kiss-produtor.jpg',
    name: 'Tiago Kiss',
    role: 'Produtor de Eventos',
    quote: 'Trabalhar com a Barbie Kills é garantia de sucesso. A leitura de pista é impecável e a interação com o público é sensacional.',
  },
  {
    image: '/depoimento-tatiane-franco-evento.jpg',
    name: 'Tatiane Franco',
    role: 'Cerimonialista',
    quote: 'Meus noivos sempre ficam impressionados. A banda entrega muito mais do que prometem. Show de verdade!',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-24 lg:py-32 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
            O QUE <span className="neon-pink-text">DIZEM</span> SOBRE NÓS
          </h2>
          <p className="subtitle text-lg text-muted-foreground max-w-2xl mx-auto">
            Depoimentos de quem viveu a experiência Barbie Kills
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass-card p-8 lg:p-10 rounded-2xl text-center hover-lift"
            >
              {/* Avatar */}
              <div className="mb-6 flex justify-center">
                <img
                  src={testimonial.image}
                  alt={`Depoimento de ${testimonial.name}`}
                  className="testimonial-circle"
                />
              </div>

              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-neon-pink/40 mx-auto mb-4" />

              {/* Quote Text */}
              <p className="text-body text-lg leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Name & Role */}
              <div>
                <h4 className="heading-display text-xl text-foreground">
                  {testimonial.name}
                </h4>
                <p className="subtitle text-xs text-muted-foreground mt-1">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
