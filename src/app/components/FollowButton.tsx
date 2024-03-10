'use client';
import React, { useState, useEffect } from 'react';
import { unFollowUser, followUser } from '../libs/actions';
import { FormEvent } from 'react';
import { FollowButton as IFollowButton } from '../types/types';
const FollowButton = ({ followedFlag, session, followedId }: IFollowButton) => {
    const [isFollowed, setIsFollowed] = useState(followedFlag);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const followerdId = session.user.id;

        isFollowed
            ? await unFollowUser(followerdId, followedId)
            : await followUser(followerdId, followedId);

        setIsFollowed(!isFollowed);
        console.log(isFollowed);
        console.log(followerdId);
        console.log(followedId);
    };

    useEffect(() => {}, [isFollowed]);
    return (
        <div className="w-full flex justify-center mb-6 mt-1">
            {followedFlag ? (
                <form
                    onSubmit={handleSubmit}
                    className={`text-center bg-slate-300 hover:bg-slate-400 px-1 py-1 border border-gray-500 rounded-[10px] w-[80%] max-w-[350px]`}
                >
                    <input
                        type="hidden"
                        name="followerId"
                        value={session?.user.id}
                    />
                    <input type="hidden" name="followedId" value={followedId} />
                    <input className="" type="submit" value={'Unfollow'} />
                </form>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className={`text-center bg-slate-300 hover:bg-slate-400 px-1 py-1 border border-gray-500 rounded-[10px] w-[80%] max-w-[350px]`}
                >
                    <input type="submit" value={'Follow'} />
                </form>
            )}
        </div>
    );
};

export default FollowButton;
