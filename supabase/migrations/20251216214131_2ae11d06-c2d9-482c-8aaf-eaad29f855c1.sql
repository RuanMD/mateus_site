-- Enable pg_net extension for HTTP calls from database
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create function to call newsletter edge function when post is published
CREATE OR REPLACE FUNCTION public.notify_newsletter_on_publish()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  supabase_url TEXT;
  service_key TEXT;
BEGIN
  -- Only trigger when is_published changes from false to true
  IF (OLD.is_published = FALSE OR OLD.is_published IS NULL) AND NEW.is_published = TRUE THEN
    -- Get the Supabase URL from environment
    supabase_url := current_setting('app.settings.supabase_url', true);
    
    -- If not set via app settings, use hardcoded project URL
    IF supabase_url IS NULL OR supabase_url = '' THEN
      supabase_url := 'https://jfdxaofoegipppuclqit.supabase.co';
    END IF;
    
    -- Make HTTP request to edge function
    PERFORM net.http_post(
      url := supabase_url || '/functions/v1/send-newsletter',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZHhhb2ZvZWdpcHBwdWNscWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NDAxMTMsImV4cCI6MjA4MDIxNjExM30.xhiS23L-XXvyK3dyhGAo8wtfoQFqGzyTijhfbzrfTdg'
      ),
      body := jsonb_build_object(
        'post_id', NEW.id,
        'title', NEW.title,
        'slug', NEW.slug,
        'excerpt', NEW.excerpt,
        'featured_image_url', NEW.featured_image_url
      )
    );
    
    RAISE LOG 'Newsletter trigger fired for post: %', NEW.title;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger on blog_posts table
DROP TRIGGER IF EXISTS trigger_newsletter_on_publish ON public.blog_posts;

CREATE TRIGGER trigger_newsletter_on_publish
  AFTER UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_newsletter_on_publish();

-- Also trigger on INSERT if published directly
CREATE OR REPLACE FUNCTION public.notify_newsletter_on_insert_published()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only trigger when post is inserted as published
  IF NEW.is_published = TRUE THEN
    PERFORM net.http_post(
      url := 'https://jfdxaofoegipppuclqit.supabase.co/functions/v1/send-newsletter',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZHhhb2ZvZWdpcHBwdWNscWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NDAxMTMsImV4cCI6MjA4MDIxNjExM30.xhiS23L-XXvyK3dyhGAo8wtfoQFqGzyTijhfbzrfTdg'
      ),
      body := jsonb_build_object(
        'post_id', NEW.id,
        'title', NEW.title,
        'slug', NEW.slug,
        'excerpt', NEW.excerpt,
        'featured_image_url', NEW.featured_image_url
      )
    );
    
    RAISE LOG 'Newsletter trigger fired for new published post: %', NEW.title;
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_newsletter_on_insert ON public.blog_posts;

CREATE TRIGGER trigger_newsletter_on_insert
  AFTER INSERT ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_newsletter_on_insert_published();