-- Create newsletter rate limits table for IP-based rate limiting
CREATE TABLE public.newsletter_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policy for service role only (edge functions use service role)
CREATE POLICY "Service role can manage rate limits"
ON public.newsletter_rate_limits
FOR ALL
USING (true)
WITH CHECK (true);

-- Create index for faster IP lookups
CREATE INDEX idx_newsletter_rate_limits_ip_created 
ON public.newsletter_rate_limits (ip_address, created_at DESC);

-- Create cleanup function to remove old rate limit entries (older than 2 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.newsletter_rate_limits
  WHERE created_at < NOW() - INTERVAL '2 hours';
END;
$$;