import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ProfileNavigation = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col justify-center  items-center w-full  space-x-4 p-4 sm:space-y-4 sm:pt-8 sm:flex-col ">
            <div className="space-x-3 flex lg:flex-col lg:items-center lg:space-y-2 ">
                <Link
                    className={` ${
                        location.pathname == '/profile/posts'
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    to={`/profile/posts`}
                >
                    Posts
                </Link>
                <Link
                    className={` ${
                        location.pathname == '/profile/comments'
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    to={`/profile/comments`}
                >
                    Comments
                </Link>
                <Link
                    className={` ${
                        location.pathname == '/profile/liked_posts'
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    to={`/profile/liked_posts`}
                >
                    Liked Posts
                </Link>
                <Link
                    className={` ${
                        location.pathname == '/profile/followed'
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    to={`/profile/followed`}
                >
                    Followed
                </Link>
            </div>
            <div className="w-full mt-4 flex justify-center">
                <Link
                    className={`text-center bg-slate-300 hover:bg-slate-400 px-1 py-1 border border-gray-500 rounded-[10px] w-[80%] max-w-[350px] ${
                        location.pathname == '/profile/add_post'
                            ? 'text-yellow-500'
                            : 'text-white'
                    }`}
                    to={`/profile/add_post`}
                >
                    Add Post
                </Link>
            </div>
        </div>
    );
};

export default ProfileNavigation;
