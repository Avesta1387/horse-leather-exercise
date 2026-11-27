import { SupabaseClient } from "@supabase/supabase-js";



export function getProductsWithImage<T extends { images: string[] }>(
    products: T[],
    supabase: SupabaseClient

) {

    return products.map((product) => {
        const mainImage = product.images?.find(
            (image) => !/-\d+\./.test(image)
        );

        const imageUrl = mainImage
            ? supabase.storage
                .from('products_images')
                .getPublicUrl(mainImage).data.publicUrl
            : null;

        return {
            ...product,
            image: imageUrl
        }
    })

};
