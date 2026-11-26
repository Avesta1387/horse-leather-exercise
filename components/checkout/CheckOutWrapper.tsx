import CheckoutContent from "./CheckoutContent";

type Props = {
    params: Promise<{ orderId: string }>
}

export default async function CheckOutWrapper({ params }: Props) {
    const { orderId } = await params;

    const id = Number(orderId);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return <p>شناسه سفارش معتبر نیست.</p>;
    }

    return (
        <div className="lg:mt-13     ">
            <h5 className="text-h5 text-lg">اطلاعات گیرنده</h5>
            <CheckoutContent id={id} />
        </div>
    )
}