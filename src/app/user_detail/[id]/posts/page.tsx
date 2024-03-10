import React from 'react';
import Post from '@/app/components/Post';
import { getUserData } from '@/app/libs/actions';

const Page = async ({ params }: { params: { id: string } }) => {
    const userData = await getUserData(params.id);

    return (
        <>
            <h1 className="text-center text-[2.7rem] mt-4 font-semibold ">
                {userData?.username} Posts
            </h1>
            <div className="mt-[2rem] w-full flex flex-col items-center space-y-[1rem] overflow-y-scroll max-h-screen p-4 ">
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
