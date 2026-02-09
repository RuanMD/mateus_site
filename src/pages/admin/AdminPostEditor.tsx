import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ArrowLeft, Save, Plus, X, Loader2 } from "lucide-react";
import RichTextEditor from "@/components/blog/RichTextEditor";
import { getErrorMessage } from "@/lib/error-mapper";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const AdminPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Form fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);

  useEffect(() => {
    const init = async () => {
      const authorized = await checkAuth();
      if (authorized) {
        fetchCategories();
        if (!isNew && id) {
          fetchPost(id);
        }
      }
    };
    init();
  }, [id]);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/admin/login");
        return false;
      }

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (!roleData) {
        toast.error("Acesso negado");
        navigate("/admin/login");
        return false;
      }

      setIsAuthorized(true);
      return true;
    } finally {
      setIsAuthChecking(false);
    }
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name");
    
    if (data) setCategories(data);
  };

  const fetchPost = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) throw error;

      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt);
      setContent(data.content);
      setMetaDescription(data.meta_description);
      setFeaturedImageUrl(data.featured_image_url || "");
      setFeaturedImageAlt(data.featured_image_alt || "");
      setCategoryId(data.category_id);
      setTags(data.tags || []);
      setIsPublished(data.is_published);
      setFaqItems((data.faq_items as unknown as FAQItem[]) || []);
    } catch (error: unknown) {
      toast.error("Erro ao carregar post", {
        description: getErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (isNew) {
      setSlug(generateSlug(value));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const addFaqItem = () => {
    setFaqItems([...faqItems, { question: "", answer: "" }]);
  };

  const updateFaqItem = (index: number, field: "question" | "answer", value: string) => {
    const newFaqItems = [...faqItems];
    newFaqItems[index][field] = value;
    setFaqItems(newFaqItems);
  };

  const removeFaqItem = (index: number) => {
    setFaqItems(faqItems.filter((_, i) => i !== index));
  };

  const handleSave = async (publishNow: boolean) => {
    if (!title || !slug || !excerpt || !content || !metaDescription || !categoryId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setIsSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      const readingTime = Math.ceil(content.split(/\s+/).length / 200);

      const postData = {
        title,
        slug,
        excerpt,
        content,
        meta_description: metaDescription,
        featured_image_url: featuredImageUrl || null,
        featured_image_alt: featuredImageAlt || null,
        category_id: categoryId,
        tags,
        reading_time: readingTime,
        is_published: publishNow,
        published_at: publishNow ? new Date().toISOString() : null,
        author_id: user.id,
        author_name: user.email?.split("@")[0] || "Admin",
        author_bio: "Advogado especializado em Direitos da Enfermagem",
        faq_items: faqItems.filter((item) => item.question && item.answer) as any,
      };

      if (isNew) {
        const { error } = await supabase
          .from("blog_posts")
          .insert(postData);

        if (error) throw error;
        toast.success("Post criado com sucesso!");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", id);

        if (error) throw error;
        toast.success("Post atualizado com sucesso!");
      }

      navigate("/admin/dashboard");
    } catch (error: unknown) {
      toast.error("Erro ao salvar post", {
        description: getErrorMessage(error),
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Show loading while checking authentication
  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Don't render content if not authorized
  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-display font-bold">
              {isNew ? "Novo Post" : "Editar Post"}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSave(false)} disabled={isSaving}>
              Salvar Rascunho
            </Button>
            <Button onClick={() => handleSave(true)} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              Publicar
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8 max-w-5xl">
        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Digite o título do post"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="slug-do-post"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Resumo (TL;DR) *</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Resumo curto do post para listagem"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria *</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Digite uma tag e pressione Enter"
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <div key={tag} className="bg-secondary px-3 py-1 rounded-full flex items-center gap-2">
                      <span className="text-sm">{tag}</span>
                      <button onClick={() => removeTag(tag)}>
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conteúdo *</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor content={content} onChange={setContent} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaDescription">Meta Description *</Label>
                <Textarea
                  id="metaDescription"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Descrição para buscadores (150-160 caracteres)"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {metaDescription.length}/160 caracteres
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Imagem Destaque</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="featuredImage">URL da Imagem</Label>
                <Input
                  id="featuredImage"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              <div>
                <Label htmlFor="imageAlt">Texto Alternativo (Alt)</Label>
                <Input
                  id="imageAlt"
                  value={featuredImageAlt}
                  onChange={(e) => setFeaturedImageAlt(e.target.value)}
                  placeholder="Descrição da imagem para SEO"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>FAQ (Perguntas Frequentes)</CardTitle>
                <Button type="button" onClick={addFaqItem} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {faqItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Nenhuma pergunta adicionada
                </p>
              ) : (
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <Label>Pergunta {index + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFaqItem(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        value={item.question}
                        onChange={(e) => updateFaqItem(index, "question", e.target.value)}
                        placeholder="Digite a pergunta"
                      />
                      <Textarea
                        value={item.answer}
                        onChange={(e) => updateFaqItem(index, "answer", e.target.value)}
                        placeholder="Digite a resposta"
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminPostEditor;
