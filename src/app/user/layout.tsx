import React from 'react';
import UserNavigation from '../components/UserNavigation';
import { getSession } from '@/app/libs/lib';
import {
    getUserData,
    checkFollowed,
    unFollowUser,
    followUser,
} from '@/app/libs/actions';

interface UserLayoutProps {
    children: React.ReactNode;
    params: { id: string };
}
export default async function UserLayout({
    children,
    params,
}: UserLayoutProps) {
    const session = await getSession();
    const userData = await getUserData(session?.user.id);
    const followedFlag = await checkFollowed(
        session?.user.id as string,
        params.id as string
    );

    return (
        <div className="flex flex-col lg:flex-row justify-between w-full lg:min-h-screen">
            <div className="flex sm:flex-col flex-col w-full lg:w-[20%]  ">
                <div className="flex flex-col justify-center items-center w-full mt-[2rem]  ">
                    <div className="w-[7rem] rounded-full overflow-hidden border border-black">
                        <img
                            src={userData?.image || ''}
                            alt="user_profile_image"
                        />
                    </div>
                    <p className="text-[1.2rem] font-bold mt-2">
                        {userData?.username}
                    </p>
                </div>

                <UserNavigation />
            </div>
            <div className=" w-full lg:w-[80%] sm:pt-8 overflow-y-scroll min-h-screen">
                {children}
            </div>
        </div>
    );
}
