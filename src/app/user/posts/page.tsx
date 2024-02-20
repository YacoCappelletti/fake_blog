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

const Page = async () => {
    const session = await getSession();
    const userData = await getUserData(session?.user.id);

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
                </div>
                <div className="flex sm:flex-col items-center w-full  space-x-6 sm:space-y-4 sm:pt-8 p-4 ">
                    <Link className="text-black" href={`/user/posts`}>
                        Posts
                    </Link>
                    <Link className="text-black" href={`/user/comments`}>
                        Comments
                    </Link>
                    <Link className="text-black" href={`/user/comments`}>
                        Followed
                    </Link>
                    <Link className="text-black" href={`/user/comments`}>
                        Likes
                    </Link>
                    <Link
                        className="text-black bg-slate-400 hover:bg-slate-500 p-4 rounded-[50px]"
                        href={`/user/comments`}
                    >
                        Make Post
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
