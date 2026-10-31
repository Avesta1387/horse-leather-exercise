import Image from "next/image"
import Link from "next/link"


type PostCardProps = {
    id: string,
    name: string,
    imageUrl: string,
    excerpt: string
}

export default function PostCard({ id, name, imageUrl, excerpt }: PostCardProps) {
    return (
        <Link href={'/'} className="border-2 border-primary-30 rounded-2xl p-4" >
            <div className=" relative min-w-87 h-65 mb-4">
                <Image src={imageUrl} className="object-cover" fill alt="تصویر مگ" />
            </div>
            <h6 className="text-h6 text-xl leading-7.5 ">{name}</h6>
            <p className="text-sm w-87 leading-7">{excerpt}</p>
        </Link>
    )
};
