'use client';

import { useState } from "react";
import AccountSection from "./account-section/AccountSection";
import ProfileSectionWrapper from "./profile-sections/ProfileSectionWrapper";

type ProfileContentProps = {
    userId: string;
    userFirstName: string | null;
    userLastName: string | null;
    imageUrl: string | null;
};

export default function ProfileContent({
    userId,
    userFirstName,
    userLastName,
    imageUrl
}: ProfileContentProps) {

    const [sectionSelected, setSectionSelected] = useState('counter');

    return (
        <div className="lg:flex justify-between items-start">
            <AccountSection
                userId={userId}
                userFirstName={userFirstName}
                userLastName={userLastName}
                imageUrl={imageUrl}
                onSectionChange={setSectionSelected}
            />

            <ProfileSectionWrapper
                userId={userId}
                selectedSection={sectionSelected}
                setSelectedSection={setSectionSelected}
            />
        </div>
    );
}
