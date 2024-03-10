'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { FormEvent } from 'react';
const Page = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [email, setEmail] = useState('');

    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password != passwordRepeat) {
            Swal.fire({
                icon: 'error',
                title: 'Password fields do not match',
                text: 'Try writing again',
                position: 'center',
            });
            return;
        }

        try {
            const url = 'http://localhost:3000/api/auth/register';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (res.ok) {
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successful registration',
                    showConfirmButton: false,
                    timer: 1500,
                });
                router.push('/auth/login');
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error registering user:', error);

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Registration failed',
                position: 'center',
            });
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <form
                onSubmit={handleSubmit}
                className="border py-4 px-8 rounded space-y-4 shadow-sm mt-[4rem] w-[20rem] border-black "
            >
                <h1 className="text-center text-[2rem]">Register</h1>
                <div className="flex flex-col text-[1.2rem]">
                    <label htmlFor="username" className="font-semibold ">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        className="border rounded border-black"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                    />
                </div>
                <div className="flex flex-col text-[1.2rem]">
                    <label htmlFor="email" className="font-semibold ">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="border rounded border-black"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <div className="flex flex-col text-[1.2rem]">
                    <label htmlFor="password_repeat" className="font-semibold">
                        Repeat password
                    </label>
                    <input
                        type="password"
                        name="password_repeat"
                        className="border rounded border-black"
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                        value={passwordRepeat}
                        required
                    />
                </div>

                <div className="flex justify-between text-[1.2rem]">
                    <Link
                        className="bg-slate-300 hover:bg-slate-400 px-2 py-1 border border-gray-500 rounded-[10px] mt-2"
                        href={`/auth/register`}
                    >
                        Back
                    </Link>
                    <input
                        type="submit"
                        value="Register"
                        className="  bg-yellow-300 hover:bg-yellow-400 px-2 py-1 border border-gray-500 rounded-[10px] mt-2 "
                    />
                </div>
            </form>
        </div>
    );
};

export default Page;
