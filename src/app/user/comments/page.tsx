import React from 'react';
import Link from 'next/link';
import Post from '@/app/components/Post';
import { prisma } from '@/app/libs/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/app/libs/lib';
import Comment from '@/app/components/Comment';
async function getUserData(id: string) {
    const url = 'http://localhost:3000/api/public/users/' + id;

    const res = await fetch(url, {
        method: 'GET',
        next: { revalidate: 30 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const Page = async () => {
    const session = await getSession();

    const userData = await getUserData(session?.user.id);
    return (
        <>
            <h2 className="text-center text-[1.5rem] font-semibold ">
                User Comments
            </h2>
            <div className="mt-[2rem] w-full  flex flex-col items-center space-y-[1rem] overflow-y-scroll max-h-screen p-4 ">
                {userData.comments?.map((comment: any, index: any) => {
                    return (
                        <Comment
                            key={index}
                            userId={comment.userId}
                            username={comment.user.username}
                            body={comment.body}
                            postId={comment.postId}
                            commentId={comment.id}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Page;
