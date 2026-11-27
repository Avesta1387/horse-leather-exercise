'use client'

import UserOrdersSection from "./UserOrdersSection"

type Props = {
    userId: string
}

export default function ProfileOrdersSection({ userId }: Props) {
    return (
        <div className="">
            <UserOrdersSection userId={userId} />
        </div>
    )
};
