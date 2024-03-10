'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
const UserNavigation = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col justify-center  items-center w-full  space-x-4 p-4 sm:space-y-4 sm:pt-8 sm:flex-col ">
            <div className="space-x-3 flex lg:flex-col lg:items-center lg:space-y-2 ">
                <Link
                    className={` ${
                        pathname == '/user/posts'
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    href={`/user/posts`}
                >
                    Posts
                </Link>
                <Link
                    className={` ${
                        pathname == '/user/comments'
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    href={`/user/comments`}
                >
                    Comments
                </Link>
                <Link
                    className={` ${
                        pathname == '/user/liked_posts'
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    href={`/user/liked_posts`}
                >
                    Liked Posts
                </Link>
                <Link
                    className={` ${
                        pathname == '/user/followed'
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    href={`/user/followed`}
                >
                    Followed
                </Link>
            </div>
            <div className="w-full mt-4 flex justify-center">
                <Link
                    className={`text-center bg-slate-300 hover:bg-slate-400 px-1 py-1 border border-gray-500 rounded-[10px] w-[80%] max-w-[350px] ${
                        pathname == '/user/add_post'
                            ? 'text-yellow-500'
                            : 'text-white'
                    }`}
                    href={`/user/add_post`}
                >
                    Add Post
                </Link>
            </div>
        </div>
    );
};

export default UserNavigation;
