'use client'

import { Dispatch, SetStateAction } from "react"
import ProfileCounterSection from "./profile-counter-section/ProfileCounterSection"
import ProfileEditInformation from "./profile-edit-information/ProfileEditInformation"
import ProfileOrdersSection from "./profile-orders-section/ProfileOrdersSection"
import ProfileWishList from "./profile-whishlist-section/ProfileWishList"

type ProfileSectionWrapper = {
    selectedSection: string;
    userId: string,
    setSelectedSection: Dispatch<SetStateAction<string>>
}

export default function ProfileSectionWrapper({ selectedSection, userId, setSelectedSection }: ProfileSectionWrapper) {

    return (
        <div className="w-full lg:w-2/3 xl:w-3/4">
            {selectedSection === 'counter' && <ProfileCounterSection onSectionChange={setSelectedSection} userId={userId} />}
            {selectedSection === 'user-whish-list' && <ProfileWishList userId={userId} />}
            {selectedSection === 'user-orders' && <ProfileOrdersSection userId={userId} />}
            {selectedSection === 'edit-user-information' && <ProfileEditInformation userId={userId} />}
        </div>
    )
};
