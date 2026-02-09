import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/PageTransition";
import BlogCard from "@/components/blog/BlogCard";
import BlogSEOHead from "@/components/blog/BlogSEOHead";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  meta_description: string | null;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  reading_time: number;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  published_at: string;
  blog_categories: {
    name: string;
    slug: string;
  };
}

const BlogCategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchCategoryAndPosts(slug);
    }
  }, [slug]);

  const fetchCategoryAndPosts = async (categorySlug: string) => {
    try {
      // Fetch category
      const { data: categoryData, error: categoryError } = await supabase
        .from("blog_categories")
        .select("*")
        .eq("slug", categorySlug)
        .single();

      if (categoryError) throw categoryError;
      setCategory(categoryData);

      // Fetch posts in this category
      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts")
        .select(
          `
          id,
          slug,
          title,
          excerpt,
          reading_time,
          featured_image_url,
          featured_image_alt,
          published_at,
          blog_categories (name, slug)
        `
        )
        .eq("category_id", categoryData.id)
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (postsError) throw postsError;
      setPosts(postsData || []);
    } catch (error) {
      console.error("Error fetching category and posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen">
          <Header />
          <main className="container-custom py-24">
            <p className="text-center text-muted-foreground">Carregando...</p>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  if (!category) {
    return (
      <PageTransition>
        <div className="min-h-screen">
          <Header />
          <main className="container-custom py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-display font-bold mb-4">
                Categoria não encontrada
              </h1>
              <p className="text-muted-foreground mb-8">
                A categoria que você está procurando não existe.
              </p>
              <Button asChild>
                <Link to="/blog">Voltar ao Blog</Link>
              </Button>
            </div>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  const canonicalUrl = `${window.location.origin}/blog/categoria/${category.slug}`;

  return (
    <PageTransition>
      <div className="min-h-screen">
        <BlogSEOHead
          title={`${category.name} - Artigos sobre Enfermagem`}
          description={
            category.meta_description ||
            `Leia artigos sobre ${category.name} para profissionais da enfermagem`
          }
          canonicalUrl={canonicalUrl}
        />

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
                <span className="text-foreground">{category.name}</span>
              </nav>
            </div>
          </div>

          {/* Category Header */}
          <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="container-custom">
              <Button variant="ghost" asChild className="mb-6">
                <Link to="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao Blog
                </Link>
              </Button>

              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-primary">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-lg text-muted-foreground max-w-3xl">
                  {category.description}
                </p>
              )}
            </div>
          </section>

          {/* Posts Grid */}
          <section className="py-16">
            <div className="container-custom">
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Ainda não há artigos publicados nesta categoria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <BlogCard
                      key={post.id}
                      slug={post.slug}
                      title={post.title}
                      excerpt={post.excerpt}
                      categoryName={post.blog_categories.name}
                      categorySlug={post.blog_categories.slug}
                      readingTime={post.reading_time}
                      featuredImageUrl={post.featured_image_url || undefined}
                      featuredImageAlt={post.featured_image_alt || undefined}
                      publishedAt={post.published_at}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default BlogCategoryPage;
