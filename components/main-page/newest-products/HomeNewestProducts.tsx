import { createServerSupabaseClient } from "@/lib/supabase/server"
import Image from "next/image";

type ProductBoxProps = {
    name: string,
    price: number | string;
    imageUrl: string | null;
    index?: number
}

const ProductBox = ({ name, price, imageUrl, index }: ProductBoxProps) => {
    return (
        <div
            className={`border-2 border-primary-30 rounded-2xl overflow-auto p-4
  ${index !== undefined && index > 1
                    ? "md:hidden"
                    : "md:block"
                }
  ${index !== undefined && index > 2
                    ? "lg:hidden"
                    : "lg:block"
                }
  ${index !== undefined && index > 3
                    ? "2xl:hidden"
                    : "2xl:block"
                }
`}
        >
            <div className="relative w-full h-80 rounded-2xl overflow-auto mb-4 min-w-74.5 ">
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
            <h6 className=" text-h6 mb-6 text-xl leading-7.5 md:text-2xl md:leading-12 ">جدیدترین محصولات</h6>
            <div className="md:hidden">
                {firstProduct && (
                    <ProductBox
                        name={firstProduct.title}
                        price={firstProduct.product_variants?.[0]?.price ?? "ناموجود"}
                        imageUrl={firstProduct.image}
                    />
                )}
            </div>
            <div className="hidden md:flex md:justify-between">
                {productsWithImage.map((product, index) => (
                    <ProductBox
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
