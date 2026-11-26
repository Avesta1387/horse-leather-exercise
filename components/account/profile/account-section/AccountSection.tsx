'use client'

import SvgAngleBottom from "@/components/icons/AngleBottom"
import SvgAngleTop from "@/components/icons/AngleTop"
import SvgEdit from "@/components/icons/Edit"
import SvgHeartOutline from "@/components/icons/HeartOutline"
import SvgHome from "@/components/icons/Home"
import SvgProfile from "@/components/icons/Profile"
import SvgShoppingBag from "@/components/icons/ShoppingBag"
import { createBrowserSupabaseClient } from "@/lib/supabase/client"
import Image from "next/image"
import Link from "next/link"
import { use, useRef, useState } from "react"
import LogOutButton from "./LogOutButton"
import { useRouter } from "next/navigation"
import ErrorBox from "@/components/error-box/ErrorBox"

type AccountSection = {
    imageUrl: string | null;
    userFirstName: string | null;
    userLastName: string | null;
    userId: string;
    onSectionChange: (section: string) => void;
}

const accountSectionListItems = [
    {
        id: 1,
        icon: <SvgProfile />,
        title: 'پیشخوان',
        value: 'counter'
    },
    {
        id: 2,
        icon: <SvgEdit />,
        title: 'ویرایش حساب کاربری',
        value: 'edit-user-information'
    },
    {
        id: 3,
        icon: <SvgShoppingBag />,
        title: 'سفارشات من',
        value: 'user-orders'
    },
    {
        id: 4,
        icon: <SvgHeartOutline />,
        title: "علاقه مندی ها",
        value: 'user-whish-list'
    }
]

export default function AccountSection({ imageUrl, userFirstName, userLastName, userId, onSectionChange }: AccountSection) {
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null);


    const [open, setOpen] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [uploadImageMessageError, setUploadImageMessageError] = useState('');


    const supabase = createBrowserSupabaseClient();
    const uploadAvatar = async (file: File, userId: string) => {
        const filePath = `${userId}/avatar`;
        console.log("User ID:", userId);
        console.log("File Path:", filePath);
        const { data, error } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, {
                upsert: true,
                contentType: file.type,
                cacheControl: '0',
            });
        if (error) {
            console.log(error.message);
            return null;
        }

        const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);



        return urlData.publicUrl
    }

    const MAX_SIZE = 600 * 1024;

    const handleAvatarChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (file.size > MAX_SIZE) {
            setUploadError(true);
            setUploadImageMessageError('حجم فایل بیشتر از حد مجاز');
            e.target.value = '';
            return;
        } else {
            setUploadError(false)
        }

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error("Authentication error:", authError);
            return;
        }

        if (user.id !== userId) {
            console.error("User ID mismatch");
            return;
        }

        const avatarUrl = await uploadAvatar(file, user.id);

        if (!avatarUrl) return;

        const { data: updatedUser, error } = await supabase
            .from("users")
            .update({
                avatar_url: `${avatarUrl}?t=${Date.now()}`,
            })
            .eq("id", user.id)
            .select("id, avatar_url")
            .maybeSingle();

        if (error) {
            console.error("Database update error:", error);
            return;
        }

        if (!updatedUser) {
            console.error("User profile not found or update not permitted.");
            return;
        }

        console.log("Avatar updated successfully:", updatedUser);

        router.refresh();
    };


    return (
        <div className=" bg-primary-20 rounded-2xl w-full md:w-187 lg:w-75.5 ">
            <div onClick={() => setOpen(prev => !prev)} className="flex items-center justify-between py-2 px-4  lg:hidden ">
                <p className="text-lg leading-8 ">حساب کاربری</p>
                {open
                    ? <SvgAngleTop />
                    : <SvgAngleBottom />
                }
            </div>
            <div className={` ${open ? 'block' : 'hidden'} lg:block mt-4 px-4 `}>
                <div className="">
                    <div className="">
                        <div className=" flex flex-col gap-4 items-center justify-center pb-6  border-b border-black mb-6 ">
                            <div className="">
                                {imageUrl
                                    ? <div onClick={() => fileInputRef.current?.click()} className=" relative w-40.5 h-40.5 rounded-full overflow-auto ">
                                        <Image src={imageUrl} alt="تصویر آواتار کاربر" fill className="object-center" unoptimized />
                                        <input type="file" accept="image/" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" />
                                    </div>
                                    : <>
                                        <div onClick={() => fileInputRef.current?.click()} className=" rounded-full border border-primary-70 w-fit ">
                                            <SvgProfile className="w-40.5 h-40.5 text-primary-70 " />
                                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" />
                                        </div>
                                        <p className="text-center text-xs text-primary-60 ">حداکثر سایز 600kb</p>
                                    </>
                                }
                                {uploadError && <ErrorBox message={uploadImageMessageError} />}

                            </div>

                            <p className="text-xl leading-7.5 ">{userFirstName && userLastName ? `سلام ${userFirstName} ${userLastName}` : 'کاربر جدید'}</p>
                            <Link href={'/'} className="flex items-center text-xl leading-7.5 gap-1 py-1 px-2 bg-primary-30 rounded-lg" >
                                <SvgHome />
                                بازگشت به صفحه اصلی
                            </Link>
                        </div>
                        <div className="flex flex-col gap-5 text-xl leading-7.5 pb-42 ">
                            {accountSectionListItems.map((item) => (
                                <div onClick={() => onSectionChange(item.value)} key={item.id} className="flex items-center gap-1">
                                    <div className="">
                                        {item.icon}
                                    </div>
                                    {item.title}
                                </div>
                            ))}
                            <LogOutButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
