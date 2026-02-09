import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import BlogCard from "./BlogCard";

interface RelatedPost {
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

interface BlogRelatedPostsProps {
  currentPostId: string;
  categoryId: string;
}

const BlogRelatedPosts = ({ currentPostId, categoryId }: BlogRelatedPostsProps) => {
  const [posts, setPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRelatedPosts();
  }, [currentPostId, categoryId]);

  const fetchRelatedPosts = async () => {
    try {
      const { data, error } = await supabase
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
        .eq("category_id", categoryId)
        .eq("is_published", true)
        .neq("id", currentPostId)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching related posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || posts.length === 0) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container-custom">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">
          Artigos Relacionados
        </h2>
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
      </div>
    </section>
  );
};

export default BlogRelatedPosts;
