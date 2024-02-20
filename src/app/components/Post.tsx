import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LikeBtn from './LikeBtn';
const Post = async ({
    id,
    image,
    heading,
    content,
    likes,
    userId,
    num_comments,
    username,
}: any) => {
    console.log(num_comments);
    return (
        <div className="border rounded p-[.5rem] shadow-md  border-gray-200  w-[70%] sm:w-[35rem] my-4">
            <div className="flex space-x-2">
                <Link
                    className="text-[.9rem] font-semibold"
                    href={`/user_detail/${userId}/posts`}
                >
                    Author: {username}
                </Link>

                {/* <p className="text-[.9rem] text-gray-400">{date}</p> */}
            </div>
            <div className="">
                <h3 className="text-[1.5rem]">{heading}</h3>
            </div>
            <div className="flex justify-center">
                <Link
                    className="text-[.9rem] font-semibold"
                    href={`/post_detail/${id}`}
                >
                    <img
                        src={image}
                        alt="post_image"
                        className="rounded shadow-2xl"
                    />
                </Link>
            </div>

            <div className=" flex justify-center overflow-y-auto max-h-[10rem] mt-4 p-2">
                <p className="text-left">{content}</p>
            </div>
            <div className="flex space-x-2 justify-end pe-5">
                <div className=" flex space-x-1 items-center">
                    <p className="text-black">{num_comments}</p>
                    <Image
                        src="/aplication_img/comment.png"
                        width={20}
                        height={20}
                        alt="Picture of the author"
                    />
                </div>
                <div className="flex space-x-2 items-center">
                    {/* <p className="text-black">{likes}</p>
                    <Image
                        src="/aplication_img/like.png"
                        width={20}
                        height={20}
                        alt="like icon"
                    /> */}
                    <LikeBtn/>
                </div>
            </div>
        </div>
    );
};

export default Post;
