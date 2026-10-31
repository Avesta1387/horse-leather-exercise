import ProductCard from "@/components/cards/product-card/ProductCard";
import { createServerSupabaseClient } from "@/lib/supabase/server"
import Image from "next/image";



export default async function HomeNewestProducts() {

    const supabase = await createServerSupabaseClient();

    const { data: products, error: productsError } = await supabase
        .from('products')
        .select(`*,
                product_variants(
                    price
                )
            `)
        .order('created_at', { ascending: false });
    console.log("Products:", products);
    console.log("Products Error:", productsError);

    const productsWithImage = (products ?? []).map((product) => {
        const mainImage = product.images?.find(
            (image: string) => !/-\d+\./.test(image)
        );

        const imageUrl = mainImage
            ? supabase.storage
                .from("products_images")
                .getPublicUrl(mainImage).data.publicUrl
            : null;

        return {
            ...product,
            image: imageUrl,
        };
    });

    const firstProduct = productsWithImage[0];

    return (
        <div className="py-6 px-4">
            <h6 className=" text-h6 mb-6 text-xl leading-7.5 md:text-2xl md:leading-12 ">جدیدترین محصولات</h6>
            <div className="md:hidden">
                {firstProduct && (
                    <ProductCard
                        name={firstProduct.title}
                        price={firstProduct.product_variants?.[0]?.price ?? "ناموجود"}
                        imageUrl={firstProduct.image}
                    />
                )}
            </div>
            <div className="hidden md:flex md:justify-between">
                {productsWithImage.map((product, index) => (
                    <ProductCard
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
