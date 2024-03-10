'use client';
import React, { useContext, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSession, login, logout } from '@/app/libs/lib';
import { SessionContext } from '@/app/components/SessionContext';
import Link from 'next/link';
const testUser = { email: 'atuny0@sohu.com', password: '9uQFF1Lh' };

const Page = () => {
    const { session, setSession } = useContext(SessionContext);
    const handleSubmit = async (formData: FormData) => {
        await login(formData);
        const newSession = await getSession();
        setSession(newSession);
    };

    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <form
                action={handleSubmit}
                className="border py-4 px-8 rounded space-y-4 shadow-sm mt-[4rem] w-[20rem] border-black "
            >
                <h1 className="text-center text-[2rem]">Login</h1>
                <div className="flex flex-col text-[1.2rem]">
                    <label htmlFor="email" className="font-semibold ">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        className="border rounded border-black"
                        defaultValue={testUser.email}
                    />
                </div>

                <div className="flex flex-col text-[1.2rem]">
                    <label htmlFor="password" className="font-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="border rounded border-black"
                        defaultValue={testUser.password}
                    />
                </div>

                <div className="flex justify-between text-[1.2rem]">
                    <Link
                        className="bg-yellow-300 hover:bg-yellow-400 px-2 py-1 border border-gray-500 rounded-[10px] mt-2"
                        href={`/auth/register`}
                    >
                        Register
                    </Link>
                    <input
                        type="submit"
                        value="Login"
                        className=" bg-slate-300 hover:bg-slate-400 px-2 py-1 border border-gray-500 rounded-[10px] mt-2 "
                    />
                </div>
            </form>
            {/* <div className="w-[20rem] mt-4 "> */}
            <p className="w-[20rem] mt-4 ">
                <b> Note:</b> If you want, you can try the application with a
                test user. To do this, simply click on the Login button.
            </p>
            {/* </div> */}
        </div>
    );
};

export default Page;
