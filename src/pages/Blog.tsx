import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { blogPosts } from '@/data/blogPosts';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Blog | Barbie Kills - Dicas para Casamentos e Eventos</title>
        <meta 
          name="description" 
          content="Blog da Barbie Kills com dicas sobre música ao vivo para casamentos e eventos corporativos. Tendências, playlists e tudo para seu evento ser inesquecível." 
        />
        <link rel="canonical" href="https://www.bandabarbiekills.com.br/blog" />
        <meta property="og:title" content="Blog | Barbie Kills - Dicas para Casamentos e Eventos" />
        <meta property="og:description" content="Dicas sobre música ao vivo para casamentos e eventos corporativos." />
        <meta property="og:url" content="https://www.bandabarbiekills.com.br/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#050505]">
        <div className="container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-pink transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Home
          </Link>
          
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
            NOSSO <span className="neon-pink-text">BLOG</span>
          </h1>
          <p className="text-body text-xl text-muted-foreground max-w-2xl">
            Dicas, tendências e tudo sobre música ao vivo para casamentos e eventos corporativos inesquecíveis.
          </p>
        </div>
      </section>

      {/* Posts List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid gap-12">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group"
              >
                <article className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={post.image}
                        alt={post.imageAlt}
                        className="w-full h-[300px] lg:h-[400px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute -inset-4 border border-neon-pink/20 rounded-lg -z-10 group-hover:border-neon-pink/40 transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1 lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                      <span>•</span>
                      <span>{post.readTime} de leitura</span>
                    </div>
                    
                    <h2 className="heading-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 group-hover:text-neon-pink transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-body text-lg text-muted-foreground mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 font-semibold text-neon-pink group-hover:gap-3 transition-all duration-300">
                      Ler artigo completo
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Blog;
