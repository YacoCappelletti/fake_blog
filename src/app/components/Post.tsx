import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LikeBtn from './LikeBtn';
import { getSession } from '../libs/lib';
import { checkLiked, deletePost } from '../libs/actions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Post as IPost } from '../types/types';

const Post = async ({
    id,
    image,
    title,
    content,
    userId,
    num_comments,
    username,
    likes,
}: IPost) => {
    const session = await getSession();
    const isLiked = await checkLiked(session?.user.id, id);
    return (
        <div className="border rounded p-[.5rem] shadow-md  border-gray-200  w-[70%] sm:w-[35rem] my-4 flex justify-center">
            <div className="flex flex-col w-[90%] ">
                <div className="flex space-x-2 justify-between ">
                    <Link
                        className="text-[1rem] my-1 flex"
                        href={`/user_detail/${userId}/posts`}
                    >
                        <b>Author:</b>{' '}
                        <p className="text-blue-600 ms-1">{username}</p>
                    </Link>
                    {session?.user.id == userId ? (
                        <form
                            action={async (formdata) => {
                                'use server';
                                await deletePost(formdata);
                                revalidatePath('/user/posts');
                                redirect('/user/posts');
                            }}
                        >
                            <input type="hidden" value={id} name="postId" />
                            <input
                                type="submit"
                                className=" text-[1.5rem] me-4"
                                value="X"
                            />
                        </form>
                    ) : (
                        ''
                    )}
                </div>
                <div className=" my-1">
                    <h3 className="text-[1.5rem]">{title}</h3>
                </div>
                <div className="flex justify-center">
                    <Link
                        className="text-[.9rem] font-semibold w-full flex justify-center max-h-[300px] max-w-[500px]"
                        href={`/post_detail/${id}`}
                    >
                        {/* <div className="max-w-[500px] max-h-[300px]"> */}
                        <img
                            src={image}
                            alt="post_image"
                            className="rounded shadow-2xl  object-cover w-full h-full  "
                        />
                        {/* </div> */}
                    </Link>
                </div>

                <div className=" flex justify-center overflow-y-auto max-h-[10rem] mt-4 p-2">
                    <p className="text-left">{content}</p>
                </div>
                <div className="flex space-x-2 justify-end my-2 ">
                    <div className=" flex space-x-1 items-center">
                        <p className="text-black">
                            {num_comments > 0 ? num_comments : 0}
                        </p>
                        <Image
                            src="/aplication_img/comment.png"
                            width={20}
                            height={20}
                            alt="Commnets"
                        />
                    </div>
                    <div className="flex space-x-2 items-center">
                        <LikeBtn
                            userId={session?.user.id}
                            postId={id}
                            isLiked={!!isLiked}
                            num_likes={likes}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
