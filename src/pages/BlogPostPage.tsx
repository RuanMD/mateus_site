import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/PageTransition";
import BlogSEOHead from "@/components/blog/BlogSEOHead";
import BlogSchemaMarkup from "@/components/blog/BlogSchemaMarkup";
import BlogTableOfContents from "@/components/blog/BlogTableOfContents";
import BlogFAQ from "@/components/blog/BlogFAQ";
import BlogRelatedPosts from "@/components/blog/BlogRelatedPosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_description: string;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  category_id: string;
  tags: string[];
  reading_time: number;
  published_at: string;
  updated_at: string;
  author_name: string;
  author_bio: string | null;
  faq_items: any;
  blog_categories: {
    name: string;
    slug: string;
  };
}
const BlogPostPage = () => {
  const {
    slug
  } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);
  const fetchPost = async (postSlug: string) => {
    try {
      const {
        data,
        error
      } = await supabase.from("blog_posts").select(`
          *,
          blog_categories (name, slug)
        `).eq("slug", postSlug).eq("is_published", true).single();
      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          url: url
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado para a área de transferência!");
    }
  };
  if (isLoading) {
    return <PageTransition>
        <div className="min-h-screen">
          <Header />
          <main className="container-custom py-24">
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-muted-foreground">Carregando...</p>
            </div>
          </main>
          <Footer />
        </div>
      </PageTransition>;
  }
  if (!post) {
    return <PageTransition>
        <div className="min-h-screen">
          <Header />
          <main className="container-custom py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-display font-bold mb-4">Post não encontrado</h1>
              <p className="text-muted-foreground mb-8">
                O artigo que você está procurando não existe ou foi removido.
              </p>
              <Button asChild>
                <Link to="/blog">Voltar ao Blog</Link>
              </Button>
            </div>
          </main>
          <Footer />
        </div>
      </PageTransition>;
  }
  const canonicalUrl = `${window.location.origin}/blog/${post.slug}`;
  return <PageTransition>
      <div className="min-h-screen">
        <BlogSEOHead title={post.title} description={post.meta_description} canonicalUrl={canonicalUrl} imageUrl={post.featured_image_url || undefined} imageAlt={post.featured_image_alt || undefined} publishedTime={post.published_at} modifiedTime={post.updated_at} author={post.author_name} tags={post.tags} />
        <BlogSchemaMarkup title={post.title} description={post.meta_description} canonicalUrl={canonicalUrl} imageUrl={post.featured_image_url || undefined} publishedTime={post.published_at} modifiedTime={post.updated_at} authorName={post.author_name} authorBio={post.author_bio || undefined} faqItems={post.faq_items} />

        <Header />

        <main>
          {/* Breadcrumb */}
          <div className="bg-muted/30 border-b">
            <div className="container-custom py-4">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary">
                  Início
                </Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-primary">
                  Blog
                </Link>
                <span>/</span>
                <Link to={`/blog/categoria/${post.blog_categories.slug}`} className="hover:text-primary">
                  {post.blog_categories.name}
                </Link>
              </nav>
            </div>
          </div>

          {/* Hero Section */}
          <article className="py-12">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <Button variant="ghost" asChild className="mb-6">
                  <Link to="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Blog
                  </Link>
                </Button>

                <div className="flex items-center gap-2 mb-4">
                  <Badge>
                    <Link to={`/blog/categoria/${post.blog_categories.slug}`}>
                      {post.blog_categories.name}
                    </Link>
                  </Badge>
                  {post.tags.map(tag => <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>)}
                </div>

                <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                  {post.title}
                </h1>

                <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.published_at).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.reading_time} min de leitura
                  </span>
                  <span>Por {post.author_name}</span>
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>

                
              </div>
            </div>

            {/* Content Grid */}
            <div className="container-custom mt-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 max-w-[1400px] mx-auto">
                {/* Main Content */}
                <div className="min-w-0">
                  <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:my-6 prose-ol:my-6 prose-li:my-2" dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content)
                }} />

                  <Separator className="my-12" />

                  {/* Author Bio */}
                  {post.author_bio && <div className="bg-muted/30 rounded-lg p-6 mb-12">
                      <h3 className="font-display text-xl font-bold mb-2">
                        Sobre o autor
                      </h3>
                      <p className="text-muted-foreground">{post.author_bio}</p>
                    </div>}

                  {/* FAQ Section */}
                  {post.faq_items && post.faq_items.length > 0 && <div className="mb-12">
                      <BlogFAQ items={post.faq_items} />
                    </div>}

                  {/* CTA */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
                    <h3 className="font-display text-2xl font-bold mb-4">
                      Precisa de Orientação Jurídica?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Entre em contato e receba atendimento especializado em direitos
                      da enfermagem.
                    </p>
                    <Button asChild size="lg">
                      <Link to="/contato">Falar com Advogado</Link>
                    </Button>
                  </div>
                </div>

                {/* Sidebar - Table of Contents */}
                <aside className="hidden lg:block">
                  <BlogTableOfContents content={post.content} />
                </aside>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          <BlogRelatedPosts currentPostId={post.id} categoryId={post.category_id} />
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>;
};
export default BlogPostPage;