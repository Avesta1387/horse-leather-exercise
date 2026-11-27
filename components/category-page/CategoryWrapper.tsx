import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getProductsWithImage } from "@/lib/utils/product";
import { redirect } from "next/navigation";
import ProductCard from "../cards/product-card/ProductCard";
import { connection } from "next/server";


type Props = {
    searchParams: Promise<{
        q?: string
    }>
}

export default async function CategoryWrapper({ searchParams }: Props) {
    await connection();
    const { q } = await searchParams;

    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
        .from('products')
        .select(`*,
                product_variants(
                    price
                ),
                categories!inner(
                    slug
                )
            `)
        .eq('categories.slug', q)

    if (error) {
        console.error(error)
        return;
    }

    if (data.length === 0) {
        redirect('/')
    }

    const productsWithImage = getProductsWithImage(
        data ?? [],
        supabase
    )

    return (
        <div className="mt-31.25 px-4 grid grid-cols-1 gap-4 lg:mt-48.25 lg:py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productsWithImage.map((product, index) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.title}
                    imageUrl={product.image}
                    price={product.product_variants[0]?.price}
                />
            ))}
        </div>
    )
};
