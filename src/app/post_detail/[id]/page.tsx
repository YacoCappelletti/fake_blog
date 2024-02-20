import React from 'react';
import Post from '@/app/components/Post';
import Comment from '@/app/components/Comment';
import Link from 'next/link';

async function getPost(id: string) {
    const url = 'http://localhost:3000/api/public/posts/' + id;

    const res = await fetch(url, {
        method: 'GET',
        next: { revalidate: 30 },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    

    return res.json();
}

const Page = async ({ params }: { params: { id: string } }) => {
    const post = await getPost(params.id);

    return (
        <div>
            <h1>Post detail page</h1>

            <Post
                image={post.image}
                id={post.id}
                heading={post.title}
                username={post.user.username}
                content={post.body}
                likes={post.reactions}
                userId={post.userId}
                num_comments={post.comments?.length}
            />
            <div className="">
                {post.comments?.map((comment: any, index: any) => {
                    return (
                        <Comment
                            key={index}
                            userId={comment.userId}
                            username={comment.user.username}
                            body={comment.body}
                        />
                    );
                })}
            </div>
            <div className="border rounded p-[.5rem] shadow-md  border-gray-200  w-[70%] sm:w-[35rem] my-4 ">
                <form action="w-full">
                    <Link
                        className="text-[.9rem] font-semibold"
                        //href={`/user_detail/${userId}/posts`}
                        href="/"
                    >
                        {/* {username} */}
                        user loget name
                    </Link>
                    <div className="flex w-full">
                        <input
                            type="text"
                            name="user-comment"
                            className=" border w-full"
                            placeholder=" Make your comment"
                        />
                        <button className="border rounded px-2 py-1">
                            Comment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
