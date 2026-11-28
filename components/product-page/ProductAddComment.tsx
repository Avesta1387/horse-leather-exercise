'use client'

import { Dispatch, SetStateAction, useRef, useState } from "react"
import SvgCloseSquare from "../icons/CloseSquare";
import SvgGallery from "../icons/Gallery";
import SvgOutlineStar from "../icons/OutlineStar";
import SvgStar from "../icons/Star";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import ErrorBox from "../error-box/ErrorBox";
import { useRouter } from "next/navigation";

type Props = {
    productId: string,
    setNewComment: Dispatch<SetStateAction<boolean>>
}

export default function ProductAddComment({ productId, setNewComment }: Props) {

    const inputRef = useRef<HTMLInputElement | null>(null)
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState('');

    const router = useRouter();
    const [image, setImage] = useState<File>();

    const MAX_SIZE = 600 * 1024;

    const handleSubmitComment = async () => {



        const supabase = createBrowserSupabaseClient();
        let imageUrl = null;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setError('not-auhenticated')
            setOpen(false)
            return;
        }

        if (rating < 1 || comment.length < 5) {
            setError('fill-inputs')
            return;
        }

        const { data, error } = await supabase
            .from('product_comments')
            .insert({
                user_id: user.id,
                product_id: productId,
                score: rating,
                comment: comment
            })
            .select('id')
            .single()

        if (error) {
            console.error(error)
            setError('unsaved')
            return;
        }


        if (image) {
            const filePath = `${data.id}/image.${image.name.split('.').pop()}`;

            const { data: uploadImage, error } = await supabase.storage
                .from('comment_images')
                .upload(filePath, image, {
                    contentType: image.type
                });

            if (error) {
                console.error(error);
                setError('image-upload-failed');
                return;
            }

            const { data: updatedComment, error: updateError } = await supabase
                .from('product_comments')
                .update({ images: [uploadImage.path] })
                .eq('id', data.id)
                .select('id, images')
                .maybeSingle();

            console.log('UPDATED COMMENT:', updatedComment);
            console.log('UPDATE ERROR:', updateError);

            if (updateError || !updatedComment) {
                console.error(updateError);
                setError('image-path-update-failed');
                return;
            }
        }

        router.refresh()

        setComment('');
        setRating(0);
        setImage(undefined);
        setOpen(false);
        setError('');
        setNewComment(true);
    }

    const errorMessage = (error: string) => {
        if (error === 'not-authenticated') return 'لطفا ابتدا وارد حساب کاربری شوید'
        if (error === 'fill-inputs') return 'لطفا فیلد هارا پر کنید'
        if (error === 'unsaved') return 'متاسفانه نظر ذخیره نشد'
        if (error === 'file-is-big') return 'حجم فایل بیشتر از حجم حداکثری است'
        if (error === 'image-upload-failed') return 'متاسفانه در آپلود تصویر مشکلی به وجود آمد'
        if (error === 'image-path-update-failed') return 'در ذخیره سازی عکس مشکل به وجود آمد'
        return ''
    }

    return (
        <div className="">
            <p onClick={() => setOpen(true)} className=" p-4 border-2 border-success-80 rounded-lg w-fit text-success-80 ">
                افزودن
            </p>

            {open && (
                <div className="fixed w-dvw h-dvh top-0 right-0 bg-primary-100/50 z-50 flex items-center justify-center ">
                    <div onClick={() => setOpen(false)} className="absolute top-10 left-10">
                        <SvgCloseSquare className="text-primary-10" />
                    </div>

                    <div className="w-80 min-h-80 bg-primary-10 rounded-xl pt-10 p-4 ">
                        <p className="text-xl leading-7.5 text-center ">افزودن نظر</p>
                        <div className="">
                            <div onClick={() => inputRef.current?.click()} className="w-fit">
                                <div className="">
                                    <SvgGallery className="text-primary-70 w-10 h-10" />
                                </div>
                                <p className="text-xs text-primary-50">حداکثر حجم 600KB</p>
                                <input
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];

                                        if (!file) return;

                                        if (file.size > MAX_SIZE) {
                                            setError('file-is-big');
                                            e.target.value = '';
                                            return;
                                        }
                                        setError('');
                                        setImage(file);
                                    }}
                                    ref={inputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star, index) => (
                                    <div onClick={() => setRating(star)} key={index} className="">
                                        {star <= rating ? <SvgStar className="text-yellow-400 w-6 h-6" /> : <SvgOutlineStar />}
                                    </div>
                                ))}
                            </div>
                            <label htmlFor="comment-area" className="mt-4 flex">متن نظر</label>
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} name="" id="comment-area" className="outline-0 border-2 border-primary-40 flex w-full h-30 rounded-lg mt-4 p-2 ">

                            </textarea>
                        </div>
                        {error.length > 0 && <ErrorBox message={errorMessage(error)} />}
                        <button onClick={handleSubmitComment} className=" flex w-full items-center p-4 bg-success-70 rounded-lg mt-4 justify-center text-white ">ذخیره</button>
                    </div>
                </div>
            )}
        </div>
    )
};
