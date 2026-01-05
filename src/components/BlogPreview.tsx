import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';

const BlogPreview = () => {
  // Show latest 3 posts
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-16 lg:py-20 bg-[#050505]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
            NOSSO <span className="neon-pink-text">BLOG</span>
          </h2>
          <p className="text-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Dicas, tendências e tudo sobre música ao vivo para eventos inesquecíveis
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group relative block"
            >
              <article className="bg-background/30 border border-white/10 rounded-lg overflow-hidden transition-all duration-500 hover:border-neon-pink/40 hover:transform hover:scale-[1.02]">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    <span>•</span>
                    <span>{post.readTime} de leitura</span>
                  </div>
                  
                  <h3 className="font-oswald text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-neon-pink transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-body text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-neon-pink group-hover:gap-3 transition-all duration-300">
                    Ler mais
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-oswald text-sm uppercase tracking-widest text-foreground/80 hover:text-neon-pink transition-colors duration-300"
          >
            Ver todos os artigos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
