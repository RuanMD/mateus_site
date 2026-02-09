-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table (security pattern for admin access)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create blog_categories table (5 content pillars)
CREATE TABLE public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Everyone can read categories
CREATE POLICY "Categories are publicly readable"
  ON public.blog_categories FOR SELECT
  TO authenticated, anon
  USING (true);

-- Only admins can manage categories
CREATE POLICY "Admins can manage categories"
  ON public.blog_categories FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Insert the 5 content pillars
INSERT INTO public.blog_categories (name, slug, description, meta_description) VALUES
  ('Aposentadoria Especial', 'aposentadoria-especial', 'Tudo sobre aposentadoria especial para profissionais da enfermagem', 'Guia completo sobre aposentadoria especial da enfermagem: requisitos, documentação e como garantir seus direitos.'),
  ('PPP e LTCAT', 'ppp-ltcat', 'Análise, correção e orientações sobre PPP e LTCAT', 'Como obter, analisar e corrigir PPP e LTCAT para aposentadoria especial da enfermagem.'),
  ('Piso Salarial da Enfermagem', 'piso-salarial', 'Orientações sobre o piso salarial da enfermagem', 'Tudo sobre o piso salarial da enfermagem: valores, direitos e como garantir o pagamento correto.'),
  ('Burnout e Doenças Ocupacionais', 'burnout-doencas', 'Direitos relacionados a burnout e doenças ocupacionais', 'Burnout, ansiedade e doenças ocupacionais na enfermagem: direitos, afastamento e indenização.'),
  ('Direitos Trabalhistas', 'direitos-trabalhistas', 'Direitos trabalhistas dos profissionais da enfermagem', 'Guia completo dos direitos trabalhistas da enfermagem: FGTS, rescisão, insalubridade e mais.');

-- Create blog_posts table with SEO-optimized fields
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Basic content
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  
  -- SEO fields
  meta_description TEXT NOT NULL,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  
  -- Organization
  category_id UUID REFERENCES public.blog_categories(id) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  
  -- Metadata
  reading_time INTEGER, -- in minutes
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  
  -- Author
  author_id UUID REFERENCES auth.users(id) NOT NULL,
  author_name TEXT NOT NULL,
  author_bio TEXT,
  
  -- FAQ for schema markup
  faq_items JSONB DEFAULT '[]'
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Published posts are publicly readable
CREATE POLICY "Published posts are publicly readable"
  ON public.blog_posts FOR SELECT
  TO authenticated, anon
  USING (is_published = true);

-- Admins can view all posts (including drafts)
CREATE POLICY "Admins can view all posts"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can manage all posts
CREATE POLICY "Admins can insert posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to calculate reading time (avg 200 words per minute)
CREATE OR REPLACE FUNCTION public.calculate_reading_time(content_text TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  word_count INTEGER;
BEGIN
  word_count := array_length(regexp_split_to_array(content_text, '\s+'), 1);
  RETURN GREATEST(1, ROUND(word_count::NUMERIC / 200));
END;
$$;