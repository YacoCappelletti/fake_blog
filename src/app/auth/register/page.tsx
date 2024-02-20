import React from 'react';

const Page = () => {
    return (
        <div>
            <div>
                <form action="" className="border py-4 px-8 rounded space-y-4">
                    <h1 className="text-center text-[2rem]">Registration</h1>
                    <div className="flex flex-col text-[1.2rem]">
                        <label htmlFor="username" className="font-semibold ">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="border rounded"
                        />
                    </div>
                    <div className="flex flex-col text-[1.2rem]">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            className="border rounded"
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
