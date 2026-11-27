ALTER TABLE public.user_favorites
ADD CONSTRAINT unique_user_product
UNIQUE (user_id, product_id);