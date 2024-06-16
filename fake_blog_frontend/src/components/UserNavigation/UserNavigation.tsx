import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

const UserNavigation = () => {
    const location = useLocation();
    const { userId } = useParams();

    return (
        <div className="flex flex-col justify-center  items-center w-full  space-x-4 p-4 sm:space-y-4 sm:pt-8 sm:flex-col ">
            <div className="space-x-3 flex lg:flex-col lg:items-center lg:space-y-2 ">
                <Link
                    className={` ${
                        location.pathname == `/user_detail/${userId}/posts`
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    to={`/user_detail/${userId}/posts`}
                >
                    Posts
                </Link>
                <Link
                    className={` ${
                        location.pathname == `/user_detail/${userId}/comments`
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    to={`/user_detail/${userId}/comments`}
                >
                    Comments
                </Link>
                <Link
                    className={` ${
                        location.pathname ==
                        `/user_detail/${userId}/liked_posts`
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    to={`/user_detail/${userId}/liked_posts`}
                >
                    Liked Posts
                </Link>
                <Link
                    className={` ${
                        location.pathname == `/user_detail/${userId}/followed`
                            ? 'text-yellow-500'
                            : 'text-black'
                    }`}
                    to={`/user_detail/${userId}/followed`}
                >
                    Followed
                </Link>
            </div>
        </div>
    );
};

export default UserNavigation;
