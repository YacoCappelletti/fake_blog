import React from 'react';
import Post from '@/app/components/Post';
import Image from 'next/image';
import Browser from '@/app/components/Browser';

async function getPosts(q: string) {
    //const url = 'http://localhost:3000/api/public/posts/';
    const url = 'https://dummyjson.com/posts/search?q=' + q;

    const res = await fetch(url, {
        method: 'GET',
        next: { revalidate: 30 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const Page = async ({ params }: { params: { q: string } }) => {
    const data = await getPosts(params.q);
    //console.log(data);
    return (
        <div className="">
            <h1 className="text-center text-[2rem] my-4">
                Welcome to Fake Blog
            </h1>
            <Browser />
            <div className="mt-[2rem] w-full flex flex-col items-center space-y-[1rem]">
                {data.posts && data.posts.length > 0 ? (
                    data.posts.map((post: any, index: any) => (
                        <Post
                            key={index}
                            image={post.image}
                            heading={post.title}
                            content={post.body}
                            likes={post.reactions}
                            user_profile_id={post.userId}
                        />
                    ))
                ) : (
                    <div className="w-full flex flex-col items-center space-y-8">
                        <p className="text-[2rem] font-bold text-center">
                            Not post found
                        </p>
                        <Image
                            src="/aplication_img/sad_emoji.png"
                            width={150}
                            height={150}
                            alt="Picture of the author"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
