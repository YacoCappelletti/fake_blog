import React from 'react';
import Link from 'next/link';
import Post from '@/app/components/Post';

import { getSession } from '@/app/libs/lib';
import { getUserData } from '@/app/libs/actions';

const Page = async () => {
    const session = await getSession();
    const userData = await getUserData(session?.user.id);
    console.log('userData', userData)

    return (
        <>
            <h2 className="text-center text-[1.5rem] font-semibold ">
                User Posts
            </h2>
            <div className="mt-[2rem] w-full flex flex-col  items-center space-y-[1rem] overflow-y-scroll max-h-screen p-4 ">
                {userData?.posts?.map((post: any, index: any) => {
                    return (
                        <Post
                            key={index}
                            id={post.id}
                            image={post.image}
                            title={post.title}
                            content={post.body}
                            likes={post.likes}
                            userId={post.userId}
                            username={post.user.username}
                            num_comments={post.comments?.length}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Page;
