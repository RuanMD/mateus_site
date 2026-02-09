-- Fix newsletter_rate_limits RLS policy to restrict access to service role only
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.newsletter_rate_limits;

-- Create a policy that only allows the edge function (using service role) to manage rate limits
-- For anon/authenticated users, no access should be granted
-- The edge function uses service_role key which bypasses RLS, so we deny all access for regular users
CREATE POLICY "No public access to rate limits"
ON public.newsletter_rate_limits
FOR ALL
USING (false)
WITH CHECK (false);