import React from 'react';
import Link from 'next/link';
import { deleteComment } from '../libs/actions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSession } from '../libs/lib';

const checkIsAuthor = (sessionId: string | null, authorId: string | null) => {
    if (!sessionId || !authorId) {
        return false;
    }
    if (sessionId == authorId) {
        return true;
    }
    return false;
};

const Comment = async ({ userId, username, body, postId, commentId }: any) => {
    const session = await getSession();
    const isAuthor = checkIsAuthor(session?.user.id, userId);
    return (
        <div className="border rounded p-[.5rem] shadow-md  border-gray-200  lg:w-[60%] my-4 flex flex-col  justify-between w-[70%] min-[700px]:flex-row">
            <div className="">
                <Link
                    className="text-[.9rem] font-semibold"
                    href={`/user_detail/${userId}/posts`}
                >
                    {username}
                </Link>

                <p>{body}</p>
            </div>

            {postId ? (
                <div className=" flex flex-col justify-center  flex-wrap  items-center  lg:me-4  py-2  mt-4 min-[400px]:flex-row space-y-2 min-[400px]:space-y-0 min-[400px]:space-x-3 ">
                    <Link
                        className="text-[1rem]  text-center text-white   bg-gray-300 hover:bg-slate-400  rounded-[5px]  px-4 py-2  w-[104px] flex items-center justify-center"
                        href={`/post_detail/${postId}`}
                    >
                        See Post
                    </Link>
                    {isAuthor && (
                        <form
                            action={async (formdata) => {
                                'use server';
                                await deleteComment(formdata);
                                revalidatePath('/user/comments');
                                redirect('/user/comments');
                            }}
                            className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 border-red-700 rounded-[5px] w-[104px] text-center "
                        >
                            <input
                                type="hidden"
                                name="commentId"
                                value={commentId}
                            />
                            <input type="submit" value="Delete" />
                        </form>
                    )}
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Comment;
