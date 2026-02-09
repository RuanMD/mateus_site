import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  categoryName: string;
  categorySlug: string;
  readingTime: number;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  publishedAt: string;
}

const BlogCard = ({
  slug,
  title,
  excerpt,
  categoryName,
  categorySlug,
  readingTime,
  featuredImageUrl,
  featuredImageAlt,
  publishedAt,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        {featuredImageUrl && (
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={featuredImageUrl}
              alt={featuredImageAlt || title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">
              <Link
                to={`/blog/categoria/${categorySlug}`}
                onClick={(e) => e.stopPropagation()}
              >
                {categoryName}
              </Link>
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readingTime} min
            </span>
          </div>
          <h3 className="font-display text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
          <p className="text-sm text-muted-foreground mt-4">
            {new Date(publishedAt).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
