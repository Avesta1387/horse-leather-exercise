import NewsletterSection from "@/components/footer-sections/NewsletterSection";
import FooterLists from "./FooterLists";



export default function Footer() {
    return (
        <footer className="">
            <NewsletterSection />
            <FooterLists />
            <p className="font-bold text-lg leading-8 text-center lg:font-normal ">تمامی حقوق برای چرم هورس محفوظ است.</p>
        </footer>
    )
};
