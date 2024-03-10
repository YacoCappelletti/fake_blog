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

const PostDetailComment = async ({
    userId,
    username,
    body,
    postId,
    commentId,
}: any) => {
    const session = await getSession();
    const isAuthor = checkIsAuthor(session?.user.id, userId);
    return (
        <div className=" w-[70%] sm:w-[35rem] border rounded p-[.5rem] shadow-md  border-gray-200   my-4 flex flex-col  justify-between  min-[700px]:flex-row">
            <div className="">
                <Link
                    className="text-[.9rem] font-semibold"
                    href={`/user_detail/${userId}/posts`}
                >
                    {username}
                </Link>

                <p>{body}</p>
            </div>
        </div>
    );
};

export default PostDetailComment;
