CREATE POLICY "Users can update their own comments"
ON public.product_comments
FOR UPDATE
TO authenticated
USING (
    user_id = auth.uid()
)
WITH CHECK (
    user_id = auth.uid()
);          