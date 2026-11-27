import ProductCard from "@/components/cards/product-card/ProductCard";
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { getProductsWithImage } from "@/lib/utils/product";
import Image from "next/image";
import { connection } from "next/server";



export default async function HomeNewestProducts() {

    await connection();

    const supabase = await createServerSupabaseClient();

    const { data: products, error: productsError } = await supabase
        .from('products')
        .select(`*,
                product_variants(
                    price
                )
            `)
        .order('created_at', { ascending: false });

    const productsWithImage=getProductsWithImage(
        products??[],
        supabase
    )

    const firstProduct = productsWithImage[0];

    return (
        <div className="py-6 px-4">
            <h6 className=" text-h6 mb-6 text-xl leading-7.5 md:text-2xl md:leading-12 ">جدیدترین محصولات</h6>
            <div className="md:hidden">
                {firstProduct && (
                    <ProductCard
                        id={firstProduct.id}
                        name={firstProduct.title}
                        price={firstProduct.product_variants?.[0]?.price ?? "ناموجود"}
                        imageUrl={firstProduct.image}
                    />
                )}
            </div>
            <div className="hidden md:flex md:justify-between">
                {productsWithImage.map((product, index) => (
                    <ProductCard
                        id={product.id}
                        key={product.id}
                        name={product.title}
                        price={product.product_variants?.[0]?.price ?? "ناموجود"}
                        imageUrl={product.image}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
};