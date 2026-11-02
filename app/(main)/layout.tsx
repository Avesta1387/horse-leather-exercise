import Footer from "@/components/layout/footer/Footer";
import HeaderWrapper from "@/components/layout/header/HeaderWrapper";



export default function MainLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <HeaderWrapper />
            {children}
            <Footer />
        </>
    )
};
