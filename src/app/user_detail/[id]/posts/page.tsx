import React from 'react';
import Link from 'next/link';
import Post from '@/app/components/Post';
import { prisma } from '@/app/libs/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/app/libs/lib';
async function getUserData(id: string) {
    const url = 'http://localhost:3000/api/public/users/' + id;

    const res = await fetch(url, {
        method: 'GET',
        next: { revalidate: 30 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

async function followUser(formData: FormData) {
    'use server';
    const rawFormData = Object.fromEntries(formData.entries());
    const url = 'http://localhost:3000/api/private/user/follow';
    const res = await fetch(url, {
        method: 'POST',
        next: { revalidate: 30 },
        body: JSON.stringify(rawFormData),
    });
    console.log('rawformdata:', rawFormData);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    revalidatePath(`/user_detail/${formData.get('followedId')}/posts`);
    redirect(`/user_detail/${formData.get('followedId')}/posts`);
}

async function followed(followerId: string, followedId: string) {
    'use server';
    try {
        let followed = false;

        const existingFollow = await prisma.follow.findFirst({
            where: {
                followerId: parseInt(followerId),
                followedId: parseInt(followedId),
            },
        });

        if (existingFollow) {
            followed = true;
        }

        return followed;
    } catch (error) {
        throw new Error('Failed to follow user');
    }
}

async function UnFollowUser(followerId: string, followedId: string) {
    try {
        const existingFollow = await prisma.follow.findFirst({
            where: {
                followerId: parseInt(followerId),
                followedId: parseInt(followedId),
            },
        });
        console.log('existingFollow', existingFollow);

        const UnFollowedUser = await prisma.follow.delete({
            where: {
                id: existingFollow?.id,
            },
        });

        console.log('UnFollowedUser', UnFollowedUser);
        revalidatePath(`/user_detail/${followedId}/posts`);
        redirect(`/user_detail/${followedId}/posts`);
    } catch (error) {
        console.error('Error unfollowing user:', error);
        throw error;
    }
}

const Page = async ({ params }: { params: { id: string } }) => {
    const userData = await getUserData(params.id);

    const session = await getSession();
    const followedFlag = await followed(
        session?.user.id as string,
        params.id as string
    );

    return (
        <div className="flex flex-col sm:flex-row justify-between w-full sm:min-h-screen">
            <div className="flex sm:flex-col flex-row w-full sm:w-[20%] bg-red-400">
                <div className="flex flex-col justify-center items-center w-full mt-[2rem] ">
                    <div className="w-[4rem] rounded-full overflow-hidden">
                        <img src={userData.image} alt="user_profile_image" />
                    </div>
                    <p className="text-[1.2rem] font-bold mt-2">
                        {userData.username}
                    </p>

                    {followedFlag ? (
                        <form
                            action={async () => {
                                'use server';
                                await UnFollowUser(
                                    session?.user.id as string,
                                    params.id as string
                                );
                            }}
                        >
                            <input
                                type="hidden"
                                name="followerId"
                                value={session?.user.id}
                            />
                            <input
                                type="hidden"
                                name="followedId"
                                value={params.id}
                            />
                            <input
                                className="bg-gray-400 hover:bg-gray-500 rounded px-3 py-1"
                                type="submit"
                                value={'Unfollow'}
                            />
                        </form>
                    ) : (
                        <form action={followUser}>
                            <input
                                type="hidden"
                                name="followerId"
                                value={session?.user.id}
                            />
                            <input
                                type="hidden"
                                name="followedId"
                                value={params.id}
                            />
                            <input
                                className="bg-gray-400 hover:bg-gray-500 rounded px-3 py-1"
                                type="submit"
                                value={'Follow'}
                            />
                        </form>
                    )}
                </div>
                <div className="flex sm:flex-col items-center w-full  space-x-6 sm:space-y-4 sm:pt-8 p-4">
                    <Link
                        className="text-black"
                        href={`/user_detail/${params.id}/posts`}
                    >
                        Posts
                    </Link>
                    <Link
                        className="text-black"
                        href={`/user_detail/${params.id}/comments`}
                    >
                        Comments
                    </Link>
                </div>
            </div>
            <div className="bg-blue-600 w-full sm:w-[80%] sm:pt-8">
                <h2 className="text-center text-[1.5rem] font-semibold ">
                    User Posts
                </h2>
                <div className="mt-[2rem] w-full flex flex-col items-center space-y-[1rem] overflow-y-scroll max-h-screen p-4 ">
                    {userData.posts?.map((post: any, index: any) => {
                        return (
                            <Post
                                key={index}
                                id={post.id}
                                image={post.image}
                                heading={post.title}
                                content={post.body}
                                likes={post.likes}
                                userId={post.userId}
                                username={post.user.username}
                                num_comments={post.comments?.length}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Page;
