import React from 'react';
import Post from '@/app/components/Post';
import Comment from '@/app/components/Comment';
import Link from 'next/link';
import { getSession } from '@/app/libs/lib';
import { makeComment } from '@/app/libs/actions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import PostDetailComment from '@/app/components/PostDetailComment';
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
    const session = await getSession();

    return (
        <div className="flex flex-col items-center">
            <Post
                image={post.image}
                id={post.id}
                title={post.title}
                username={post.user.username}
                content={post.body}
                likes={post.likes}
                userId={post.userId}
                num_comments={post.comments?.length}
            />
            <div className="w-full flex flex-col items-center">
                {post.comments?.map((comment: any, index: any) => {
                    return (
                        <PostDetailComment
                            key={index}
                            userId={comment.userId}
                            username={comment.user.username}
                            body={comment.body}
                        />
                    );
                })}
            </div>
            <div className="border rounded p-[.5rem] shadow-md  border-gray-200   my-4 flex space-x-2 items-center w-[70%] sm:w-[35rem]">
                {session ? (
                    <form
                        action={async (formdata) => {
                            'use server';
                            await makeComment(formdata);
                            revalidatePath('/post_detail/' + params.id);
                            redirect('/post_detail/' + params.id);
                        }}
                        className="w-full "
                    >
                        <Link
                            className="text-[.9rem] font-semibold"
                            href="/user/posts"
                        >
                            {session?.user.username}
                        </Link>
                        <div className="flex flex-col sm:flex-row w-full sm:space-x-4 space-y-1 sm:space-y-0">
                            <input
                                type="text"
                                name="body"
                                className=" border h-[2rem] sm:w-[80%] "
                                placeholder=" Make your comment"
                            />
                            <input
                                type="hidden"
                                value={params.id}
                                name="postId"
                            />
                            <input
                                type="hidden"
                                value={session.user.id}
                                name="userId"
                            />

                            <input
                                type="submit"
                                value="Comment"
                                className="border rounded px-2 py-1 border-gray-400"
                            />
                        </div>
                    </form>
                ) : (
                    <>
                        <p>Would you like to comment?</p>

                        <Link
                            className="text-[.9rem] font-semibold text-blue-400 hover:text-blue-600"
                            href="/auth/login"
                        >
                            Log in
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Page;
