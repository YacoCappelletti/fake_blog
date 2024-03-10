'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { getSession, logout } from '../libs/lib';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SessionContext } from './SessionContext';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { session, setSession } = useContext(SessionContext);
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const checkSession = async () => {
            try {
                const sessionData = await getSession();
                setSession(sessionData);
            } catch (error) {
                console.error('Error fetching session data:', error);
            }
        };
        checkSession();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 639) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleLogout = async (e: any) => {
        e.preventDefault();
        await logout();
        setSession(null);
        router.push('/');
    };

    return (
        <nav className="bg-black p-4 relative w-full flex flex-col justify-center items-center">
            <div className="flex flex-col sm:flex-row justify-between w-[80%] items-center ">
                <div className="flex justify-between w-[100%]">
                    <div className="">
                        <Link className="text-white" href="/">
                            <Image
                                src="/aplication_img/brand_icon.png"
                                alt="Menu btn"
                                width={30}
                                height={30}
                            />
                        </Link>
                    </div>

                    <button
                        className="w-[2rem] h-[2rem] sm:hidden"
                        onClick={handleClick}
                    >
                        <Image
                            src="/aplication_img/white_menu_icon.png"
                            alt="Menu btn"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>

                <ul
                    className={`${
                        isOpen ? '' : 'hidden'
                    } text-center text-white space-y-6 bg-black w-full  left-0 top-[99%] sm:relative  sm:flex sm:space-y-0 sm:space-x-6 sm:justify-center absolute z-50   p-[1rem] sm:p-[0]`}
                >
                    <li>
                        <Link href="/">Home Page</Link>
                    </li>

                    <li>
                        {session ? (
                            <Link href="/user/posts">My profile</Link>
                        ) : (
                            ''
                        )}
                    </li>
                    <li>
                        {session ? (
                            <form onSubmit={handleLogout}>
                                <button
                                    type="submit"
                                    className="bg-gray-400 hover:bg-gray-500 w-[100%] sm:w-[5rem] sm:rounded "
                                >
                                    Logout
                                </button>
                            </form>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="bg-orange-500 hover:bg-orange-600 w-[100%] sm:w-[5rem] sm:rounded px-4 py-2"
                            >
                                Sign In
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
