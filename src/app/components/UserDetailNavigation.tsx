'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const UserDetailNavigation = ({ id }: any) => {
    const pathname = usePathname();
    return (
        <div className="flex justify-center lg:flex-col items-center w-full  space-x-6 lg:space-y-4 lg:pt-8 p-4">
            <Link
                className={` ${
                    pathname == '/user_detail/' + id + '/posts'
                        ? 'text-yellow-500'
                        : 'text-black'
                }`}
                href={`/user_detail/${id}/posts`}
            >
                Posts
            </Link>
            <Link
                className={` ${
                    pathname == '/user_detail/' + id + '/comments'
                        ? 'text-yellow-500'
                        : 'text-black'
                }`}
                href={`/user_detail/${id}/comments`}
            >
                Comments
            </Link>
        </div>
    );
};

export default UserDetailNavigation;
