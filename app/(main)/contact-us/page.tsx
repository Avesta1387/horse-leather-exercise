import SvgCallCalling from "@/components/icons/CallCalling";
import SvgCallCalling2 from "@/components/icons/CallCalling2";
import SvgEmail from "@/components/icons/Email";
import SvgLocation from "@/components/icons/Location";
import Map from "@/components/map/MapWrapper";
import Image from "next/image";




export default function ContactUs() {
    return (
        <div className="pt-31.25 ">
            <div className="relative w-full h-28 ">
                <Image src={'/images/banners-and-backgrounds/contact-us-banner.png'} fill className="object-fill" alt="تصویر بنر هیرو تماس با ما" />
            </div>
            <div className="container mx-auto gap-6 mb-8 ">
                <div className=" lg:flex ">
                    <div className="m-4 p-4 bg-primary-20 rounded-2xl lg:w-269 ">
                        <h6 className="text-h6 text-xl leading-7.5 font-bold ">ارتباط با ما</h6>
                        <p className="text-lg leading-8">برای پیگیری سفارش، مشاوره خرید یا هر سؤال دیگه، از اینجا با ما در تماس باشید.</p>
                        <form action="" className="text-xl leading-7.5 font-medium flex flex-col" >
                            <label htmlFor="name" className="mb-2">نام</label>
                            <input id="name" type="text" className="mb-4 bg-primary-30 text-xl leading-7.5 rounded-lg outline-0 py-2 px-4 w-full placeholder:text-primary-70 placeholder:text-xl placeholder:leading-7.5" placeholder="نام شما..." />
                            <label htmlFor="last-name" className="mb-2">نام خانوادگی</label>
                            <input id="last-name" type="text" className="mb-4 bg-primary-30 text-xl leading-7.5 rounded-lg outline-0 py-2 px-4 w-full placeholder:text-primary-70 placeholder:text-xl placeholder:leading-7.5" placeholder="نام خانوادگی ..." />
                            <label htmlFor="email" className="mb-2">ایمیل</label>
                            <input id="email" type="email" className="mb-4 bg-primary-30 text-xl leading-7.5 rounded-lg outline-0 py-2 px-4 w-full placeholder:text-primary-70 placeholder:text-xl placeholder:leading-7.5" placeholder="Example@gmail.com" />
                            <label htmlFor="category" className="mb-2">عنوان</label>
                            <input id="category" type="text" className="mb-4 bg-primary-30 text-xl leading-7.5 rounded-lg outline-0 py-2 px-4 w-full placeholder:text-primary-70 placeholder:text-xl placeholder:leading-7.5" placeholder="موضوع ..." />
                            <label htmlFor="message" className="mb-2">پیام</label>
                            <textarea id="message" className="mb-6 bg-primary-30 text-xl leading-7.5 rounded-lg outline-0 py-2 px-4 w-full placeholder:text-primary-70 placeholder:text-xl placeholder:leading-7.5" placeholder="پیام خود را اینجا بنویسید ..." />
                            <button className="w-full bg-primary-30 text-xl leading-7.5 py-2 rounded-3xl ">ارسال پیام</button>
                        </form>
                    </div>
                    <div className="">
                        <p className=" px-4 text-lg leading-8 mb-7.5 ">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز است</p>
                        <div className="grid grid-cols-2 gap-4 items-center ">
                            <div className="flex flex-col gap-2 items-center text-primary-70 text-lg leading-8 ">
                                <SvgEmail />
                                <p className="">ایمیل چرم هورس</p>
                                <p className=""> info@horseleather.co</p>
                            </div>
                            <div className="flex flex-col gap-2 items-center text-primary-70 text-lg leading-8 ">
                                <SvgCallCalling2 />
                                <p className="">شماره تلفن پشتیبانی</p>
                                <p className=""> 09204001450</p>
                            </div>
                            <div className="flex flex-col gap-2 items-center text-primary-70 text-lg leading-8 ">
                                <SvgLocation />
                                <p className="">آدرس مجموعه</p>
                                <p className="text-sm leading-6 text-center">تهران ، شهرک اکباتان مگامال
                                    طبقه F1 پ 135</p>
                            </div>
                            <div className="flex flex-col gap-2 items-center text-primary-70 text-lg leading-8 ">
                                <SvgCallCalling2 />
                                <p className="">شماره تلفن پشتیبانی</p>
                                <p className=""> 021 - 44640901</p>
                            </div>

                        </div>
                    </div>
                </div>
                <Map />
            </div>
        </div>
    )
};
