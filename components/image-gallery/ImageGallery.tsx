'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import SvgShare from "../icons/Share";
import SvgHeartOutline from "../icons/HeartOutline";
import SvgFilledHeart from "../icons/FilledHeart";
import SvgAngleLeft from "../icons/AngleLeft";
import SvgAngleRight from "../icons/AngleRight";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import ErrorBox from "../error-box/ErrorBox";

type Props = {
    images: string[];
    productId: string
}

export default function ImageGallery({ images, productId }: Props) {

    const [isFavorite, setIsFavorite] = useState(false);
    const [notLoginError, setNotLoginError] = useState(false)
    const [activeImage, setActiveImage] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const checkFavorite = async () => {
            const supabase = createBrowserSupabaseClient();

            const { data: { user }, error: userError } =
                await supabase.auth.getUser();

            if (userError) {
                console.log(userError);
                return;
            }

            if (!user) {
                setIsFavorite(false);
                return;
            }

            

            const { data, error } = await supabase
                .from('user_favorites')
                .select('id')
                .eq('user_id', user.id)
                .eq('product_id', productId)
                .maybeSingle();

            if (error) {
                console.log(error);
                return;
            }

            setIsFavorite(!!data);
        };



        checkFavorite();
    }, [productId]);

    if (!images.length) return null;

    const handleNextImage = () => {
        setActiveImage((prev) => (prev + 1) % images.length);
    };

    const handlePrevImage = () => {
        setActiveImage((prev) =>
            (prev - 1 + images.length) % images.length
        )
    }

    const handleToggleFavorite = async () => {
        const supabase = createBrowserSupabaseClient();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            setNotLoginError(true);
            return
        };

        if (isFavorite) {
            const { data: removeFavorite, error } = await supabase
                .from('user_favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId)
                .single()

            if (error) {
                console.log(error);
                return;
            }
            setIsFavorite(false)
            router.refresh()
        } else {
            const { data: addFavorite, error } = await supabase
                .from('user_favorites')
                .insert({
                    user_id: user.id,
                    product_id: productId
                })
            if (error) {
                console.log(error);
                return;
            }

            setIsFavorite(true)

        }
    }

    return (
        <div className="">
            {notLoginError&&<ErrorBox message="لطفا ابتدا وارد حساب کاربری خود شوید" />}
            <div className="flex gap-2 mb-5">
                <div className="">
                    <div className=" relative w-media-280 h-92.75 rounded-lg overflow-auto ">
                        <Image src={images[activeImage]} fill unoptimized alt="تصویر محصول" className="object-fill" />
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex gap-5 flex-col">
                        <div className="p-3 bg-primary-20 w-fit rounded-lg ">
                            <SvgShare />
                        </div>
                        <div onClick={handleToggleFavorite} className="p-3 bg-primary-20 w-fit rounded-lg">
                            {isFavorite
                                ? <SvgFilledHeart className="text-alert-60" />
                                : <SvgHeartOutline />
                            }
                        </div>
                    </div>
                    <div className="flex gap-5 flex-col">
                        <div onClick={handleNextImage} className="py-3 px-4.5 bg-primary-20 w-fit rounded-lg ">
                            <SvgAngleLeft />
                        </div>
                        <div onClick={handlePrevImage} className="py-3 px-4.5 bg-primary-20 w-fit rounded-lg ">
                            <SvgAngleRight />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-around">
                {images.map((image, index) => (
                    <div onClick={() => setActiveImage(index)} key={index} className="relative w-13.75 h-18.25 rounded-sm overflow-auto ">
                        <Image src={image} alt="تصویر محصول" fill unoptimized className="object-fill" />
                    </div>
                ))}
            </div>
        </div>
    )
};
