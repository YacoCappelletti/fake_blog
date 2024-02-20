import React from 'react';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSession, login, logout } from '@/app/libs/lib';
const testUser = { email: 'atuny0@sohu.com', password: '9uQFF1Lh' };

const Page = () => {
    return (
        <div>
            <div>
                <form
                    action={login}
                    className="border py-4 px-8 rounded space-y-4"
                >
                    <h1 className="text-center text-[2rem]">Login</h1>
                    <div className="flex flex-col text-[1.2rem]">
                        <label htmlFor="email" className="font-semibold ">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            className="border rounded"
                            value={testUser.email}
                        />
                    </div>

                    <div className="flex flex-col text-[1.2rem]">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="border rounded"
                            value={testUser.password}
                        />
                    </div>

                    <div className="flex justify-end text-[1.2rem]">
                        <input
                            type="submit"
                            value="Submit"
                            className="border rounded p-1 mt-2"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
