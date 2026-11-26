import { createServerSupabaseClient } from "@/lib/supabase/server";
import PaymentContent from "./PaymentContent";
import { redirect } from "next/navigation";
import { connection } from "next/server";

type Props = {
    params: Promise<{ orderId: string }>;
};

export default async function PaymentWrapper({ params }: Props) {
    await connection();

    const { orderId } = await params;

    const parsedOrderId = Number(orderId);

    if (!Number.isSafeInteger(parsedOrderId) || parsedOrderId <= 0) {
        console.error("Invalid order ID:", orderId);
        // redirect("/");
    }

    const supabase = await createServerSupabaseClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.error(error)
        return;
        // redirect("/");
    }

    return (
        <PaymentContent
            userId={user.id}
            orderId={parsedOrderId}
        />
    );
}