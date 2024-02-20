// 'use client';
// import React, { useEffect } from 'react';
// import Link from 'next/link';
// import { getSession } from '../libs/lib';
// import Image from 'next/image';

// const Navbar: React.FC = () => {
//     const [isOpen, setIsOpen] = React.useState(false);

//     const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         setIsOpen(!isOpen);
//     };

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth > 639) {
//                 setIsOpen(true);
//             } else {
//                 setIsOpen(false);
//             }
//         };
//         handleResize();
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//     const session = getSession();
//     console.log(session);
//     return (
//         <nav className="bg-black text-white p-4 relative">
//             <div className="flex flex-col sm:flex-row justify-between">
//                 <div className="flex justify-between w-[100%]">
//                     <div className="">
//                         <Link className="text-white" href="/">
//                             <Image
//                                 src="/aplication_img/brand_icon.png"
//                                 alt="Menu btn"
//                                 width={30}
//                                 height={30}
//                             />
//                         </Link>
//                     </div>

//                     <button
//                         className="w-[2rem] h-[2rem] sm:hidden"
//                         onClick={handleClick}
//                     >
//                         <Image
//                             src="/aplication_img/white_menu_icon.png"
//                             alt="Menu btn"
//                             width={30}
//                             height={30}
//                         />
//                     </button>
//                 </div>

//                 <ul
//                     className={`${
//                         isOpen ? '' : 'hidden'
//                     } text-center text-white space-y-6 bg-black w-full  left-0 top-[99%] sm:relative  sm:flex sm:space-y-0 sm:space-x-6 sm:justify-end absolute z-50   p-[1rem] sm:p-[0]`}
//                 >
//                     <li>
//                         <Link href="/">Home Page</Link>
//                     </li>

//                     {/* {session?.user?.email === 'admin@test.com' ? (
//                         <li>
//                             <Link href="/admin/posts">Dashboard</Link>
//                         </li>
//                     ) : null}

//                     {session && session?.user?.email != 'admin@test.com' ? (
//                         <li>
//                             <Link href="/user">Profile</Link>
//                         </li>
//                     ) : null} */}

//                     <li>
//                         {/* {status === 'unauthenticated' ? (
//                             <button
//                                 className={
//                                     'bg-orange-500 hover:bg-orange-600 w-[100%]  sm:w-[5rem] sm:rounded'
//                                 }
//                                 onClick={() => signIn()}
//                             >
//                                 Sign In
//                             </button>
//                         ) : (
//                             <button
//                                 className={
//                                     ' bg-orange-500 hover:bg-orange-600  w-[100%] sm:w-[5rem] sm:rounded'
//                                 }
//                                 onClick={() => signOut()}
//                             >
//                                 Sign Out
//                             </button>
//                         )} */}

//                         {/* <button
//                             className={
//                                 'bg-orange-500 hover:bg-orange-600 w-[100%]  sm:w-[5rem] sm:rounded'
//                             }
//                         >
//                             Sign In
//                         </button> */}

//                         <Link
//                             href="/auth/login"
//                             className={
//                                 'bg-orange-500 hover:bg-orange-600 w-[100%]  sm:w-[5rem] sm:rounded px-4 py-2'
//                             }
//                         >
//                             Sign In
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
