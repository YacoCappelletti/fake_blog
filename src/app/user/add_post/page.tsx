import React from 'react';
import { createPost } from '@/app/libs/actions';
import { getSession } from '@/app/libs/lib';
import { redirect } from 'next/navigation';
const Page = async () => {
    const sesion = await getSession();
    return (
        <div className=" w-full flex justify-center overflow-x-scroll lg:overflow-auto mt-8">
            <form
                action={async (formdata) => {
                    'use server';
                    await createPost(formdata);
                    redirect('/user/posts');
                }}
                method="POST"
                className=" py-4 px-8 rounded space-y-4 w-[70%]  lg:w-[30rem]  border border-black "
            >
                <h1 className="text-center text-[2rem]">Make your post</h1>
                <input type="hidden" value={sesion?.user.id} name="userId" />
                <div className="flex flex-col text-[1.2rem]">
                    <label htmlFor="title" className="font-semibold ">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        className=" rounded border border-black "
                    />
                </div>
                <div className="flex flex-col text-[1.2rem]">
                    <label htmlFor="body" className="font-semibold ">
                        Body
                    </label>

                    <textarea
                        name="body"
                        className="border border-black rounded"
                        rows={4}
                        cols={50}
                    />
                </div>
                <div className="flex flex-col text-[1.2rem]">
                    <label htmlFor="image" className="font-semibold ">
                        Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="border border-black "
                    />
                </div>

                <div className="flex justify-center text-[1.2rem]">
                    <input
                        type="submit"
                        value="Post"
                        className="text-center text-white bg-yellow-300 hover:bg-yellow-400 px-1 py-1 border border-gray-500 rounded-[10px] w-[100%] mt-4"
                    />
                </div>
            </form>
        </div>
    );
};

export default Page;
