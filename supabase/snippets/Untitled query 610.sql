CREATE POLICY "Anyone can view categories"
ON public.categories
FOR SELECT
TO anon, authenticated
USING (true);