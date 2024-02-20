import Link from 'next/link';
import { getSession, logout } from '../libs/lib';
import { redirect } from 'next/navigation';
import Image from 'next/image';

const Navbar = async () => {
    const session = await getSession();
    //console.log('From Navbar', session);
    return (
        <nav className="bg-black text-white p-4 relative">
            <div className="flex flex-col sm:flex-row justify-between">
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

                    <button className="w-[2rem] h-[2rem] sm:hidden">
                        <Image
                            src="/aplication_img/white_menu_icon.png"
                            alt="Menu btn"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>

                <ul
                    className={` text-center text-white space-y-6 bg-black w-full  left-0 top-[99%] sm:relative  sm:flex sm:space-y-0 sm:space-x-6 sm:justify-end absolute z-50   p-[1rem] sm:p-[0]`}
                >
                    <li>
                        <Link href="/">Home Page</Link>
                    </li>

                    <li>
                        {session?.role == 'admin' ? (
                            <Link href="/admin/">Admin Dashboard</Link>
                        ) : (
                            <Link href="/user/posts">My profile</Link>
                        )}
                    </li>
                    <li>
                        {session ? (
                            <form
                                action={async () => {
                                    'use server';
                                    await logout();
                                    redirect('/');
                                }}
                            >
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
