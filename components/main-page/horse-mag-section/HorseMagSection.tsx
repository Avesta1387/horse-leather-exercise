import PostCard from "@/components/cards/post-card/PostCard";
import { Vector } from "@/components/icons";
import SvgAngleLeft from "@/components/icons/AngleLeft";
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ArrowLeft } from "lucide-react";




export default async function HorseMagSection() {

    const supabase = await createServerSupabaseClient();

    const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .limit(3)

    if (postsError) {
        console.log(' GET POSTS FROM DATABASE ERROR: ', postsError);
        return;
    }

    if (!posts || posts.length === 0) return null;

    const postsWithImage = posts.map((post) => {
        let imageUrl = '';

        if (post.post_image) {
            const { data } = supabase
                .storage
                .from('posts-images')
                .getPublicUrl(post.post_image)

            imageUrl = data.publicUrl
        }

        return {
            ...post,
            imageUrl
        }
    })

    console.log("IMAGES URLS:", postsWithImage.map(post => post.imageUrl));

    const firstPost = postsWithImage[0];

    return (
        <div className=" px-4 mb-6 ">
            <div className="flex items-center justify-between mb-5 md:mb-10">
                <h6 className="text-h6 text-xl leading-7.5
                    md:text-3xl md:10.5
                ">هورس مگ</h6>
                <p className="flex items-center gap-3 py-1 px-2 border border-black rounded-lg w-fit ">
                    مشاهده بیشتر
                    <span className="">
                        <SvgAngleLeft />
                    </span>
                </p>
            </div>
            <div className="md:hidden">
                <PostCard
                    id={firstPost?.id}
                    imageUrl={firstPost?.imageUrl}
                    name={firstPost?.title}
                    excerpt={firstPost?.excerpt}
                />
            </div>
            <div className=" hidden md:flex justify-between">
                {postsWithImage.map((post) => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        name={post.title}
                        imageUrl={post.imageUrl}
                        excerpt={post.excerpt}
                    />
                ))}
            </div>
        </div>
    )
};
