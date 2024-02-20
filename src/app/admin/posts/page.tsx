import React from 'react';
import Link from 'next/link';
import PostsTableView from './components/PostsTableView';

const Page = () => {
    return (
        <>
            <div className="p-[1rem] w-[80%] flex flex-col justify-center  mt-[2rem] ">
                <PostsTableView />
                <Link
                    className="text-white text-[1.3rem] text-center bg-green-500 hover:bg-green-600 mt-[2rem] rounded"
                    href="/admin/posts"
                >
                    Posts
                </Link>
            </div>
        </>
    );
};

export default Page;
