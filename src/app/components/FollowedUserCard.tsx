import React from 'react';
import { unFollowUser } from '../libs/actions';
import { getSession } from '../libs/lib';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
const FollowedUserCard = async ({
    userId,
    username,
    userImage,
    sessionId,
}: any) => {
    const session = await getSession();
    return (
        <div className="flex max-[500px]:flex-col border rounded p-[.5rem] shadow-md  border-gray-200  w-[70%] sm:w-[35rem] my-4  justify-between">
            <div className="flex flex-col items-center jus">
                <p className="font-semibold ">{username}</p>

                <img
                    src={userImage || ''}
                    alt="User image"
                    className="w-[8rem]"
                />
            </div>
            <div className="mt-4 flex max-[640px]:flex-col   justify-center items-center max-[640px]:space-y-2  min-[640px]:space-x-4 min-[640px]:me-4 ">
                <Link
                    className="text-[1rem]  text-center text-white   bg-gray-300 hover:bg-slate-400  rounded-[5px]  px-4 py-2  w-[104px] flex items-center justify-center"
                    href={'/user_detail/' + userId + '/posts'}
                >
                    Profile
                </Link>

                <form
                    action={async (formdata) => {
                        'use server';
                        await unFollowUser(formdata);
                        revalidatePath('/user/followed');
                        redirect('/user/followed');
                    }}
                    className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 border-red-700 rounded-[5px] w-[104px] text-center "
                >
                    <input
                        type="hidden"
                        value={session.user.id}
                        name="followerId"
                    />
                    <input type="hidden" value={userId} name="followedId" />
                    <input
                        type="submit"
                        value="Unfollow"
                        className="bg-red-500 hover:bg-red-700"
                    />
                </form>
            </div>
        </div>
    );
};

export default FollowedUserCard;
