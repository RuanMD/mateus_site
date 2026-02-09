import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import SocialFeed from "@/components/SocialFeed";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/PageTransition";
import BlogCard from "@/components/blog/BlogCard";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Badge } from "@/components/ui/badge";

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

interface Category {
  id: string;
  name: string;
  slug: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name");
    
    if (data) setCategories(data);
  };

  const fetchPosts = async () => {
    try {
      let query = supabase
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
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (selectedCategory) {
        query = query.eq("category_id", selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <SEO
        title="Blog | Artigos sobre Direitos da Enfermagem"
        description="Artigos especializados sobre aposentadoria especial, PPP, LTCAT, piso salarial, burnout e direitos trabalhistas para enfermeiros, técnicos e auxiliares de enfermagem."
        keywords="blog enfermagem, artigos aposentadoria enfermagem, PPP enfermagem artigos, piso salarial enfermagem blog, burnout enfermagem conteúdo, direitos trabalhistas enfermagem"
        canonical="/blog"
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Blog", url: "/blog" }
        ]}
      />

      <div className="min-h-screen">
        <Header />
        <main>
          <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5">
            <div className="container-custom">
              <div className="text-center mb-10 sm:mb-16 px-2">
                <h1 className="heading-1 text-primary mb-4 sm:mb-6">
                  Blog: direitos da Enfermagem em linguagem clara
                </h1>
                <p className="text-lg sm:text-xl font-medium text-foreground/90 mb-4">
                  Artigos, análises e conteúdos jurídicos para proteger sua carreira
                </p>
                <div className="max-w-3xl mx-auto space-y-4">
                  <p className="body-default text-muted-foreground">
                    Aqui você encontrará conteúdos sobre aposentadoria especial, piso salarial, burnout, doenças ocupacionais, FGTS, insalubridade, múltiplos vínculos e outros temas que fazem parte da realidade da Enfermagem.
                  </p>
                  <p className="body-default text-muted-foreground">
                    O objetivo deste blog é oferecer informação jurídica acessível, atualizada e aplicada ao dia a dia de enfermeiras, técnicos e auxiliares em todo o Brasil.
                  </p>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-2">
                <Badge
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer text-xs sm:text-sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Todos
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="cursor-pointer text-xs sm:text-sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>

              {/* Blog Posts Grid */}
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Carregando artigos...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 sm:p-12 text-center">
                  <p className="text-muted-foreground">
                    Em breve, novos artigos sobre aposentadoria especial, piso salarial, PPP, doenças ocupacionais e decisões recentes que afetam diretamente a Enfermagem.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
          
          <SocialFeed />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default BlogPage;
