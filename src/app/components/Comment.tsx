import React from 'react';
import Link from 'next/link';

const Comment = ({ userId, username, body, postId }: any) => {
    return (
        <div className="border rounded p-[.5rem] shadow-md  border-gray-200  w-[70%] sm:w-[35rem] my-4 flex justify-between">
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
                <div className=" flex items-center  me-4   ">
                    <Link
                        className="text-[1rem] text-center font-semibold  bg-gray-400 hover:bg-slate-500  rounded-[10px]  h-8 w-[7rem] flex items-center justify-center"
                        href={`/post_detail/${postId}`}
                    >
                        See Post
                    </Link>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Comment;
