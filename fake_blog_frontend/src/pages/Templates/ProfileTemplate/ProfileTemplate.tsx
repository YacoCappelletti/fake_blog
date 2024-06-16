import React, { ReactNode } from 'react';
import { ProfileNavigation } from '../../../components';
interface ProfileTemplateProps {
    children: ReactNode;
    username?: string;
    userImage?: string;
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({
    children,
    username,
    userImage,
}) => {
    return (
        <div className="flex flex-col lg:flex-row justify-between w-full lg:min-h-screen">
            <div className="flex sm:flex-col flex-col w-full lg:w-[20%]  ">
                <div className="flex flex-col justify-center items-center w-full mt-[2rem]  ">
                    <div className="w-[7rem] rounded-full overflow-hidden border border-black">
                        <img src={userImage} alt="user_profile_image" />
                    </div>
                    <p className="text-[1.2rem] font-bold mt-2">{username}</p>
                </div>

                <ProfileNavigation />
            </div>
            <div className=" w-full lg:w-[80%] sm:pt-8 overflow-y-scroll  flex flex-col items-center">
                {children}
            </div>
        </div>
    );
};

export default ProfileTemplate;
