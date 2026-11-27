'use client'

import ProductCard from "@/components/cards/product-card/ProductCard"
import { Spinner } from "@/components/ui/spinner"
import { createBrowserSupabaseClient } from "@/lib/supabase/client"
import { getProductsWithImage } from "@/lib/utils/product"
import { useEffect, useState } from "react"

type Props = {
    userId: string
}

type Variant = {
    id: string,
    price: number
}

type Product = {
    id: string,
    title: string,
    images: string[]
    products_variants: Variant,

}

type WhishList = {
    id: number,
    product_id: string,
    products: Product
}

export default function ProfileWishList({ userId }: Props) {

    const [whishList, setWhishList] = useState<WhishList[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const supabase = createBrowserSupabaseClient();

        setLoading(true)

        const getWhishList = async () => {
            const { data, error } = await supabase
                .from('user_favorites')
                .select(`*,
                        products(
                            id,
                            images,
                            title,
                            product_variants(
                                id,
                                price
                            )
                        )
                    `)
                .eq('user_id', userId);
            if (error) {
                console.error(error);
                setLoading(false)
                return;

            }

            if (!data) {
                alert('علاقمندی برای این کاربر نیست')
                setLoading(false)
                setWhishList([]);
                return;
            }

            setWhishList(data)
            setLoading(false)
        }

        getWhishList()

    }, [userId])

    const products = whishList.map(item => item.products)

    const supabase = createBrowserSupabaseClient();
    const productsWithImage = getProductsWithImage(
        products ?? [],
        supabase
    )

    return (
        <div className="">
            {loading
                ? <div className="">
                    <Spinner />
                </div>
                : <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
                    {productsWithImage.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.title}
                            imageUrl={product.image}
                            id={product.id}
                            price={product.products_variants?.price}
                        />
                    ))}
                </div>
            }
        </div>
    )
};
