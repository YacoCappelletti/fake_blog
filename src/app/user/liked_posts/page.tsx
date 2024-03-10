import React from 'react';
import { getSession } from '@/app/libs/lib';
import { getUserData, getLikedPosts } from '@/app/libs/actions';
import Post from '@/app/components/Post';
const Page = async () => {
    const session = await getSession();
    const userData = await getUserData(session?.user.id);
    const likedPosts = await getLikedPosts(session?.user.id);

    return (
        <div>
            <h2 className="text-center text-[2rem] font-semibold">
                Liked posts
            </h2>
            <div className="mt-[2rem] w-full flex flex-col items-center space-y-[1rem] overflow-y-scroll max-h-screen p-4 ">
                {likedPosts?.map((post: any, index: any) => {
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
    );
};

export default Page;
