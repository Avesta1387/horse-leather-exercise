



export default function NewsletterSection() {
    return (
        <div className=" py-4 bg-primary-30 ">
            <div className="container mx-auto ">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center ">
                    <p className=" text-lg leading-8 mb-6 lg:mb-0 ">از تخفیف ها و جدیدترین محصولات چرم هورس با خبر شوید :</p>
                    <form className="flex flex-col lg:hidden">
                        <input type="tel" className="bg-white text-right py-1 px-2 outline-0 rounded-sm border border-primary-70 mb-2.5 " placeholder="شماره تلفن خود را وارد کنید" />
                        <button className="bg-black rounded-sm text-white text-sm leading-6">ارسال</button>
                    </form>
                    <form action="" className="hidden lg:flex bg-white rounded-lg items-center p-4">
                        <input type="email" placeholder="ایمیل خود را وارد کنید" className="outline-0 text-xl leading-7.5 placeholder:text-black" />
                        <p className="bg-black px-2 text-white text-xl leading-7.5 rounded-lg">عضویت</p>
                    </form>
                </div>
            </div>
        </div>
    )
};
