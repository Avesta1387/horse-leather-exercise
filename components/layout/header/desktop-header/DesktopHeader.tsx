
import DesktopLogin from "@/components/auth/desktop-login/DesktopLogin";
import SvgCallCalling from "@/components/icons/CallCalling";
import SvgCartBag from "@/components/icons/CartBag";
import SvgLogin from "@/components/icons/Login";
import SvgProfile from "@/components/icons/Profile";
import SvgSearchNormal from "@/components/icons/SearchNormal";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import CartButton from "./CartButton";
import { CartProvider } from "@/components/user-cart/CartProvider";




export default async function DesktopHeader() {
    await connection();

    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return;

    // const { data, error } = await supabase
    //     .from('user_cart')
    //     .select(`*`)
    //     .eq('user_id', user.id);

    // if (error) {
    //     console.error(error);
    //     return
    // }

    // const productsWithImage = (data ?? []).map((product) => {
    //     const mainImage = product.products?.images?.find(
    //         (image: string) => !/-\d+\./.test(image)
    //     );

    //     const imageUrl = mainImage
    //         ? supabase.storage
    //             .from("products_images")
    //             .getPublicUrl(mainImage).data.publicUrl
    //         : null;

    //     return {
    //         ...product,
    //         image: imageUrl,
    //     };
    // });

    let productsWithImage = [];

    if (user) {
        const { data, error } = await supabase
            .from('user_cart')
            .select(`
            *,
            products(*),
            product_variants(
                *,
                sizes(*),
                colors(*)
            )
        `)
            .eq('user_id', user.id);

        if (error) {
            console.error(error);
        } else {
            productsWithImage = (data ?? []).map((product) => {
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
        }
    }

    return (
        <header className="hidden border-b border-black lg:block fixed z-40 bg-white w-full ">
            <div className="container mx-auto pt-5 pb-4">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-10">
                        <Link href={'/'} className="relative w-66.75 h-10 ">
                            <Image src={'/images/logo.png'} alt="لوگو وبسایت" fill className="object-cover" />
                        </Link>
                        <div className="w-89.5 py-3 px-3 flex items-center gap-3 border-2 border-black rounded-3xl ">
                            <SvgSearchNormal className="w-6 h-6 text-black" />
                            <input type="text" className="outline-0" />
                        </div>
                    </div>
                    <div className="flex gap-6 items-center">
                        {!user
                            ? <DesktopLogin />
                            : <Link href={'/profile'} className=" py-3 px-2 bg-primary-100 rounded-lg " >
                                <SvgProfile className="text-white w-6 h-6 " />
                            </Link>

                        }
                        <CartProvider initialCart={productsWithImage} >
                            <CartButton isUser={user ? true : false} />
                        </CartProvider>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-7.5 h-[2.5px] bg-primary-100 relative 
                            before:content-[''] before:w-7.5 before:h-[2.5px] before:absolute before:bg-primary-100 before:bottom-2.25
                            after:content-[''] after:w-7.5 after:h-[2.5px] after:absolute after:bg-primary-100 after:top-2.25
                            "></div>
                            <p className="font-semibold text-xl pl-4 border-l-2 border-black ">دسته بندی ها</p>
                        </div>
                        <div className="flex items-center gap-8">
                            <p className="">صفحه اصلی</p>
                            <p className="">تماس با ما</p>
                            <p className="">شعبه های حضوری</p>
                            <p className="">پیگیری سفارش</p>
                            <p className="">هورس مگ</p>
                        </div>
                    </div>
                    <p className="bg-primary-100 flex text-white items-center w-60 p-2 gap-4 rounded-lg">
                        <SvgCallCalling />
                        پیگیری سفارشات :
                        02191559091 داخلی (203)
                    </p>
                </div>
            </div>
        </header>
    )
};
