'use client'

import ProfileCounterSection from "./ProfileCounterSection"
import ProfileEditInformation from "./ProfileEditInformation"
import ProfileOrdersSection from "./ProfileOrdersSection"
import ProfileWishList from "./ProfileWishList"

type ProfileSectionWrapper = {
    selectedSection: string;
    userId: string
}

export default function ProfileSectionWrapper({ selectedSection, userId }: ProfileSectionWrapper) {

    return (
        <div className="">
            {selectedSection === 'counter' && <ProfileCounterSection userId={userId} />}
            {selectedSection === 'user-whish-list' && <ProfileWishList />}
            {selectedSection === 'user-orders' && <ProfileOrdersSection />}
            {selectedSection === 'edit-user-information' && <ProfileEditInformation />}
        </div>
    )
};
