import { createServerSupabaseClient } from "@/lib/supabase/server"
import Image from "next/image";

type ProductBoxProps = {
    name: string,
    price: number | string;
    imageUrl: string | null;
}

const ProductBox = ({ name, price, imageUrl }: ProductBoxProps) => {
    return (
        <div className=" border-2 border-primary-30 rounded-2xl overflow-auto p-4 ">
            <div className="relative w-full h-80 rounded-2xl overflow-auto mb-4 ">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={name}
                        className="object-cover"
                        fill
                    // unoptimized
                    />
                )}
            </div>
            <p className="text-3xl leading-12 mb-4 text-primary-100 ">{name}</p>
            <p className="text-2xl leading-9 text-primary-100">{price} تومان</p>
        </div>
    )
}

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
            <h6 className=" text-h6 mb-6 ">جدیدترین محصولات</h6>
            <div className="">
                {firstProduct ? (
                    <ProductBox
                        name={firstProduct.title}
                        price={firstProduct.product_variants?.[0]?.price ?? "ناموجود"}
                        imageUrl={firstProduct.image}
                    />
                ) : (
                    <div className="">
                        <p>محصولی وجود ندارد</p>
                    </div>
                )}
            </div>
        </div>
    )
};
