import SvgFacebook from "@/components/icons/Facebook";
import SvgInstagram from "@/components/icons/Instagram";
import SvgWhatsapp from "@/components/icons/Whatsapp";
import Image from "next/image";
import Link from "next/link";



type FooterListProps = {
    title: string;
    items: {
        id: number;
        label: string;
        href?: string;
    }[];
};

const FooterList = ({ title, items }: FooterListProps) => {
    return (
        <div className="w-full pb-6 md:w-75.5 ">
            <h5 className=" text-h5 text-2xl text-center  leading-9 text-primary-100 border-b border-primary-100 pb-4 mb-4 ">{title}</h5>
            <ul className="flex flex-col gap-4">
                {items.map((item) => (
                    <li key={item.id} className="">
                        {item.href ? (
                            <Link href={item.href} >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

const addressesList = [
    {
        id: 1,
        label: "تهران، شهرک اکباتان، مگامال، طبقه F1 پلاک 135",
    },
    {
        id: 2,
        label: "تهران، چهارراه جنت آباد، نیایش مال، طبقه F3 پلاک 48",
    },
    {
        id: 3,
        label: "تهران، پونک، همیلا سنتر، طبقه اول واحد 139",
    },
    {
        id: 4,
        label: "بوشهر، چهارراه دادگستری، مجتمع هلال احمر پلاک 8",
    },
];

const quickAccesses = [
    { id: 1, label: "فروشگاه", href: "/" },
    { id: 2, label: "محصولات مردانه", href: "/" },
    { id: 3, label: "محصولات زنانه", href: "/" },
    {id:4,label:'تماس با ما',href:'/contact-us'}
];

const customerServices = [
    { id: 1, label: "حساب کاربری", href: "/" },
    { id: 2, label: "روش‌های ارسال", href: "/" },
    { id: 3, label: "قوانین ارجاع و تعویض محصول", href: "/" },
];

const contactInformations = [
    { id: 1, label: "تلفن: 021-44640901" },
    { id: 2, label: "پشتیبانی: 09204001450" },
    { id: 3, label: "ایمیل: info@horseleather.co" },
];

export default function FooterLists() {


    return (
        <div className="py-6 mx-4  border-b border-primary-100 mb-4 lg:pt-10 lg:mx-0 ">
            <div className="container mx-auto ">
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                    <FooterList
                        title="آدرس شعب"
                        items={addressesList}
                    />
                    <FooterList
                        title="دسترسی سریع"
                        items={quickAccesses}
                    />
                    <div className="md:hidden">
                        <FooterList
                            title="خدمات مشتریان"
                            items={customerServices}
                        />
                    </div>
                    <FooterList
                        title="اطلاعات تماس"
                        items={contactInformations}
                    />

                    <div className="md:w-75.5">
                        <h5 className=" hidden text-h5 text-2xl text-center  leading-9 text-primary-100 border-b border-primary-100 pb-4 mb-4 md:block ">شبکه های اجتماعی</h5>
                        <div className="flex items-center justify-between lg:flex-col-reverse lg:gap-4 ">
                            <div className="flex gap-4 ">
                                <div className=" relative w-20.75 h-20.75 ">
                                    <Image src={'/images/e-namad.png'} fill className="object-cover" alt="لوگو اعتماد ای نماد" />
                                </div>
                                <div className=" relative w-20.75 h-20.75 ">
                                    <Image src={'/images/samandehi.png'} fill className="object-cover" alt="لوگو نشان ملی ثبت (رسانه های دیجیتال)" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4 ">
                                <SvgWhatsapp className="lg:w-12 lg:h-12" />
                                <SvgInstagram className="lg:w-12 lg:h-12" />
                                <SvgFacebook className="lg:w-12 lg:h-12" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
