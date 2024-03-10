import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/app/libs/lib';
import { getUserData, checkFollowed } from '@/app/libs/actions';
import UserDetailNavigation from '@/app/components/UserDetailNavigation';
import FollowButton from '@/app/components/FollowButton';

interface UserDetailLayoutProps {
    children: React.ReactNode;
    params: { id: string };
}
export default async function UserDetailLayout({
    children,
    params,
}: UserDetailLayoutProps) {
    const userData = await getUserData(params.id);

    const session = await getSession();
    const followedFlag = await checkFollowed(
        session?.user.id as string,
        params.id as string
    );

    return (
        <div className="flex flex-col lg:flex-row    w-full">
            <div className=" w-full lg:w-[20%]  justify-start">
                <div className="flex flex-col justify-center items-center w-full mt-[2rem] ">
                    <div className="w-[7rem] rounded-full overflow-hidden border border-black ">
                        <img
                            src={userData?.image || ''}
                            alt="user_profile_image"
                        />
                    </div>
                    <p className="text-[1.2rem] font-bold mt-2">
                        {userData?.username}
                    </p>
                </div>
                <UserDetailNavigation id={params.id} />
                <FollowButton
                    followedFlag={followedFlag}
                    session={session}
                    followedId={params.id}
                />
            </div>
            <div className=" w-full lg:w-[80%] lg:pt-8 flex flex-col items-center">
                {children}
            </div>
        </div>
    );
}
