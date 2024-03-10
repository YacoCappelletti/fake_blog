import React from 'react';
import Link from 'next/link';
import Post from '@/app/components/Post';
import { prisma } from '@/app/libs/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/app/libs/lib';
import Comment from '@/app/components/Comment';
import { getUserData } from '@/app/libs/actions';

const Page = async ({ params }: { params: { id: string } }) => {
    const userData = await getUserData(params.id);

    return (
        <>
            <h1 className="text-center  font-semibold text-[2.7rem] mt-4 ">
                {userData?.username} Comments
            </h1>
            <div className="mt-[2rem] w-full flex flex-col items-center space-y-[1rem] overflow-y-scroll max-h-screen p-4 ">
                {userData?.comments?.map((comment: any, index: any) => {
                    return (
                        <Comment
                            key={index}
                            userId={comment.userId}
                            username={comment.user.username}
                            postId={comment.postId}
                            body={comment.body}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default Page;
