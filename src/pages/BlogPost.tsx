import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getPostBySlug, blogPosts } from '@/data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (exclude current)
  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug).slice(0, 2);

  // Structured data for Article
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "image": `https://www.bandabarbiekills.com.br${post.image}`,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "Barbie Kills"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Barbie Kills",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bandabarbiekills.com.br/logo-barbie-kills.png"
      }
    }
  };

  // Parse inline markdown (bold and links)
  const parseInlineMarkdown = (text: string) => {
    const elements: React.ReactNode[] = [];
    // Match bold (**text**) and links ([text](url))
    const regex = /(\*\*(.*?)\*\*|\[(.*?)\]\((.*?)\))/g;
    let lastIndex = 0;
    let match;
    let keyIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        elements.push(text.substring(lastIndex, match.index));
      }

      if (match[0].startsWith('**')) {
        // Bold text
        elements.push(
          <strong key={keyIndex++} className="text-foreground">{match[2]}</strong>
        );
      } else if (match[0].startsWith('[')) {
        // Link
        const linkText = match[3];
        const linkUrl = match[4];
        const isExternal = linkUrl.startsWith('http');
        if (isExternal) {
          elements.push(
            <a key={keyIndex++} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-neon-pink hover:underline">
              {linkText}
            </a>
          );
        } else {
          elements.push(
            <Link key={keyIndex++} to={linkUrl} className="text-neon-pink hover:underline">
              {linkText}
            </Link>
          );
        }
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }

    return elements.length > 0 ? elements : text;
  };

  // Parse markdown-like content to HTML
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      // Headers
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="heading-display text-2xl md:text-3xl text-foreground mt-10 mb-4">
            {parseInlineMarkdown(paragraph.replace('## ', ''))}
          </h2>
        );
      }
      
      // Blockquotes
      if (paragraph.startsWith('> ')) {
        const lines = paragraph.split('\n').filter(line => line.startsWith('> '));
        return (
          <blockquote key={index} className="border-l-4 border-neon-pink pl-6 my-8 italic text-muted-foreground">
            {lines.map((line, i) => (
              <p key={i} className="mb-2">{parseInlineMarkdown(line.replace(/^> ?/, ''))}</p>
            ))}
          </blockquote>
        );
      }
      
      // Lists
      if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter(item => item.startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside space-y-3 my-6 text-body text-lg text-muted-foreground">
            {items.map((item, i) => {
              const text = item.replace('- ', '');
              return (
                <li key={i}>
                  {parseInlineMarkdown(text)}
                </li>
              );
            })}
          </ul>
        );
      }

      // Numbered lists
      if (/^\d+\.\s/.test(paragraph)) {
        const items = paragraph.split('\n').filter(item => /^\d+\.\s/.test(item));
        return (
          <ol key={index} className="list-decimal list-inside space-y-3 my-6 text-body text-lg text-muted-foreground">
            {items.map((item, i) => {
              const text = item.replace(/^\d+\.\s/, '');
              return (
                <li key={i}>
                  {parseInlineMarkdown(text)}
                </li>
              );
            })}
          </ol>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="text-body text-lg text-muted-foreground mb-6 leading-relaxed">
          {parseInlineMarkdown(paragraph)}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={`https://www.bandabarbiekills.com.br/blog/${post.slug}`} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={`https://www.bandabarbiekills.com.br/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`https://www.bandabarbiekills.com.br${post.image}`} />
        <meta property="article:published_time" content={post.date} />
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      </Helmet>

      <Navbar />
      
      {/* Hero Image */}
      <section className="pt-24">
        <div className="relative h-[50vh] min-h-[400px]">
          <img
            src={post.image}
            alt={post.imageAlt}
            width={1200}
            height={600}
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-pink transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Blog
            </Link>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
              <span>•</span>
              <span>{post.readTime} de leitura</span>
            </div>

            {/* Title */}
            <h1 className="heading-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Content */}
            <article className="prose prose-invert prose-lg max-w-none">
              {renderContent(post.content)}
            </article>

            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-r from-neon-pink/10 to-purple-900/10 border border-neon-pink/20 rounded-lg text-center">
              <h3 className="heading-display text-2xl text-foreground mb-4">
                Pronto para transformar seu evento?
              </h3>
              <p className="text-muted-foreground mb-6">
                Fale com a Barbie Kills e garanta sua data.
              </p>
              <Button variant="neonPink" size="lg" asChild>
                <a 
                  href="https://wa.me/5519981736659" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  SOLICITAR ORÇAMENTO
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#050505]">
          <div className="container mx-auto px-6">
            <h2 className="heading-display text-3xl text-foreground mb-8 text-center">
              Leia também
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="bg-background/30 border border-white/10 rounded-lg overflow-hidden transition-all duration-500 hover:border-neon-pink/40">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.imageAlt}
                        width={400}
                        height={192}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-oswald text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-neon-pink transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default BlogPost;
