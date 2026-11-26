import Link from "next/link";
import SvgAngleLeft from "../icons/AngleLeft";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import CartBox from "./user-cart-box/UserCartBox";
import UserCartDiscount from "./UserCartDiscount";
import { CartProvider } from "./CartProvider";
import CartContent from "./CartContent";
import SvgCartBag from "../icons/CartBag";

type Size = {
    title: string;
}

type Color = {
    title: string;
    value: string;
};

type ProductVariant = {
    id: string;
    price: number;
    sizes: Size | null;
    colors: Color | null;
    discount?: number
}

type Product = {
    id: string;
    images: string[] | null;
    title: string;
    score: number | null;
}

type Cart = {
    id: string;
    quantity: number;
    products: Product | null;
    product_variants: ProductVariant | null;
}

type Props = {
    initialCart: Cart[]
}

export default async function CartWrapper({ initialCart }: Props) {

    const supabase = await createServerSupabaseClient();

    const productsWithImage = (initialCart ?? []).map((product) => {
        const mainImage = product.products?.images?.find(
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

    return (
        <div className="container mx-auto ">
            {productsWithImage.length < 1
                ? <div className="flex items-center flex-col gap-4 justify-center">
                    <SvgCartBag className="w-50 h-50 text-primary-60 " />
                    <p className="">محصولی در سبد خرید خود ندارید</p>

                </div>
                : <CartProvider initialCart={productsWithImage} >
                    <div className="flex items-center gap-2 mb-3 ">
                        <Link href={'/'} className="text-xs leading-4 text-primary-70 " >
                            خانه
                        </Link>
                        <SvgAngleLeft className="w-1 h-2 text-primary-70" />
                        <Link href={'/user-cart'} className="text-xs leading-4 text-primary-70 " >
                            سبد خرید
                        </Link>
                    </div>
                    <CartContent />
                </CartProvider>
            }
        </div>
    )
};
