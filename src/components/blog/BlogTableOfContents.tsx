import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  content: string;
}

// Utility function to generate slug from text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const BlogTableOfContents = ({ content }: BlogTableOfContentsProps) => {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const headings = doc.querySelectorAll("h2, h3");

    const tocItems: TOCItem[] = [];
    headings.forEach((heading) => {
      const text = heading.textContent || "";
      const id = generateSlug(text);

      tocItems.push({
        id,
        text,
        level: parseInt(heading.tagName.charAt(1)),
      });
    });

    setItems(tocItems);
  }, [content]);

  useEffect(() => {
    if (items.length === 0) return;

    // Wait for DOM to render, then add IDs and observe
    const timeout = setTimeout(() => {
      const articleElement = document.querySelector("article");
      if (!articleElement) return;

      const headings = articleElement.querySelectorAll("h2, h3");
      
      // Add IDs to headings in the actual DOM
      headings.forEach((heading) => {
        const text = heading.textContent || "";
        const id = generateSlug(text);
        heading.id = id;
      });

      // Set up intersection observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { rootMargin: "-100px 0px -66%" }
      );

      headings.forEach((heading) => {
        observer.observe(heading);
      });

      return () => observer.disconnect();
    }, 200);

    return () => clearTimeout(timeout);
  }, [items]);

  const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      // Update URL without reload
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (items.length === 0) return null;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Índice</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="space-y-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToHeading(e, item.id)}
              className={`block text-sm transition-colors hover:text-primary ${
                item.level === 3 ? "pl-4" : ""
              } ${activeId === item.id ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default BlogTableOfContents;
