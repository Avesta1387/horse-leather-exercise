'use client'

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react"
import SvgStar from "../icons/Star";
import { format } from "date-fns-jalali";
import { Images } from "lucide-react";
import Image from "next/image";
import SvgProfile from "../icons/Profile";
import SvgMessageCircle from "../icons/MessageCircle";


type Props = {
    productId: string
}

type User = {
    id: string,
    first_name: string,
    last_name: string,
    avatar_url: string | null
}

type ProductComment = {
    id: number,
    user_id: string,
    users: User | null;
    product_id: string,
    comment: string,
    score: number,
    created_at: string,
    images?: string[]
}

type CommentBoxProps = {
    commentId: number,
    score: number,
    comment: string,
    createdAt: string,
    userFullName: string,
    imagesUrl?: string[],
    userAvatar: string | null;
    itExist?: boolean
}

const CommentBox = ({
    commentId,
    score,
    comment,
    createdAt,
    userFullName,
    imagesUrl,
    userAvatar,
    itExist
}: CommentBoxProps) => {

    const jalaliDate = format(new Date(createdAt), "yyyy/MM/dd - HH:mm")

    const supabase = createBrowserSupabaseClient();

    const images = imagesUrl?.map((imagePath) => {
        const { data } = supabase.storage
            .from('comment_images')
            .getPublicUrl(imagePath);

        return data.publicUrl;
    }) ?? [];

    const ScoreStars = ({ score }: { score: number }) => {
        return (
            <>
                {Array.from({ length: score }, (_, index) => (
                    <SvgStar key={index} className="text-yellow-400 w-5 h-5 " />
                ))}
            </>
        )
    }

    return (
        <div className={`${itExist ? 'border-b border-dashed border-primary-90   ' : ''} pb-4  `}>
            <div className="flex items-center justify-between mb-5 pt-4">
                <div className="flex items-start gap-1">
                    <ScoreStars score={score} />
                    <p className="">{score}</p>
                </div>
                {imagesUrl && (
                    <div className="flex items-center gap-2">
                        {images.map((image, index) => (
                            <div key={index} className="relative w-12 h-12 rounded-md overflow-auto">
                                <Image
                                    src={image}
                                    alt='تصویر محصول در کامنت'
                                    fill
                                    unoptimized
                                    className="object-fill"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="mb-4">
                <p className="text-lg leading-5 mb-3">{comment}</p>
                <p className="text-xs leading-4 text-primary-70">{jalaliDate}</p>
            </div>
            <div className="flex items-center gap-2">
                {userAvatar
                    ? <div className=" relative w-8 h-8 rounded-full overflow-auto ">
                        <Image src={userAvatar} alt="تصویر کاربر" fill unoptimized className="object-fill" />
                    </div>
                    : <div className="w-8 h-8 rounded-full border border-primary-90 ">
                        <SvgProfile className="w-8 h-8" />
                    </div>
                }
                <p className="">{userFullName}</p>
            </div>
        </div>
    )
}

const supabase = createBrowserSupabaseClient();


export default function ProductComments({ productId }: Props) {

    const [comments, setComments] = useState<ProductComment[]>([]);


    useEffect(() => {

        const checkExistComments = async () => {
            const { data, error } = await supabase
                .from('product_comments')
                .select(`*,
                        users(
                        id,
                        first_name,
                        last_name,
                        avatar_url
                        )
                    `)
                .eq('product_id', productId);

            if (error) {
                console.error(error)
                return;
            }
            setComments(data ?? []);
        }
        checkExistComments()


    }, [productId])


    return (
        <div className="pt-14">
            <h5 className=" text-h5 text-2xl leading-8 mb-8 ">نظرات:</h5>
            {comments.length
                ? <div className="lg:w-5/6 mx-auto">
                    {comments.map((comment, index) => (
                        <CommentBox
                            key={comment.id}
                            commentId={comment.id}
                            score={comment.score}
                            comment={comment.comment}
                            createdAt={comment.created_at}
                            userFullName={`${comment.users?.first_name ?? 'کاربر'} ${comment.users?.last_name ?? 'جدید'}`}
                            imagesUrl={comment.images}
                            userAvatar={comment.users?.avatar_url ?? null}
                            itExist={index !== comments.length - 1}
                        />
                    ))}
                </div>
                : <div className="flex gap-4 flex-col justify-center items-center">
                    <SvgMessageCircle className="w-27 h-27 text-primary-70" />
                    <p className="text-lg leading-6 text-center">اولین نفری باشید که درمورد این محصول نظر میدید</p>
                </div>
            }
        </div>
    )
};
