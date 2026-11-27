import { createServerSupabaseClient } from "@/lib/supabase/server";
import { connection } from "next/server";
import ImageGallery from "../image-gallery/ImageGallery";
import SvgStar from "../icons/Star";
import ProductSelectVariant from "./ProductSelectVariant";
import ProductComments from "./ProductComments";
import ProductCard from "../cards/product-card/ProductCard";
import ProductSpecifications from "./ProductSpecifications";
import { getProductsWithImage } from "@/lib/utils/product";



type Props = {
    params: Promise<{ id: string }>
}

export default async function ProductContent({ params }: Props) {

    await connection();

    const { id } = await params;

    const supabase = await createServerSupabaseClient();

    const { data: product, error } = await supabase
        .from('products')
        .select(`*,
            categories(*),
            product_variants(
            *,
            sizes(*),
            colors(*)
            )

            `)
        .eq('id', id)
        .single();

    if (error || !product) {
        console.log(error);
        return;
    }

    const imageUrl = product.images.map((image: string) => {
        const { data } = supabase.storage
            .from('products_images')
            .getPublicUrl(image);

        return data.publicUrl
    })

    const { data: getSimilars, error: similarsError } = await supabase
        .from('products')
        .select(`*,
            product_variants(
                id,
                price
            )
            `)
        .eq('category_id', product.category_id)
        .neq('id', product.id)
        .limit(4);
    if (similarsError) {
        console.error(similarsError)
    }

    const similarProductsWithImage=getProductsWithImage(
        getSimilars??[],
        supabase
    )



    return (
        <div className="">
            <div className="lg:flex items-start justify-around">
                <ImageGallery images={imageUrl} productId={product?.id} />
                <div className="">
                    <div className=" mt-14 pb-7 border-b border-black lg:mt-0 ">
                        <h5 className="text-h5 text-2xl leading-8 mb-4">{product.title}</h5>
                        <div className="flex items-center justify-between ">
                            <p className="flex items-center gap-1 text-xl leading-7.5 ">{product.comment_num || product.score ? `${product.comment_num} نظر (${product.score})` : 'تاکنون نظری ثبت نشده است'} <SvgStar className="text-yellow-400 w-5 h-5 " /> </p>
                            <p className="text-primary-70">{product.sales_count} فروش</p>
                        </div>
                    </div>
                    <div className="pt-6">
                        <p className="text-xl mb-3 ">معرفی : </p>
                        <p className="text-sm leading-6 text-primary-80 ">{product.introduction}</p>
                        <ProductSelectVariant variants={product.product_variants} />
                    </div>
                </div>
            </div>

            <ProductSpecifications useType={product.type_use} material={product.material}/>

            <ProductComments productId={id} />

            <div className="mt-14">
                <p className="text-xl leading-7.5 font-bold">محصولات مشابه:</p>
                <div className=""></div>
            </div>
            <div className="overflow-hidden w-fit mx-auto flex flex-col items-center gap-6 md:flex-row">
                {similarProductsWithImage?.map((similar, index) => (
                    <ProductCard
                        id={similar.id}
                        key={similar.id}
                        name={similar?.title}
                        price={similar.product_variants?.[0]?.price ?? "ناموجود"}
                        imageUrl={similar.image}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
};
