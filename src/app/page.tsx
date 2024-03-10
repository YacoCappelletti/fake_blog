import React from 'react';
import Post from './components/Post';

import Browser from './components/Browser';
import Pagination from './components/Pagination';
async function getPosts() {
    const url = 'http://localhost:3000/api/public/posts';

    const res = await fetch(url, {
        method: 'GET',
        next: { revalidate: 30 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const Page = async () => {
    const data = await getPosts();
    console.log('data', data);

    return (
        <div>
            <h1 className="text-center text-[2.7rem] my-6">
                Welcome to Fake Blog
            </h1>
            <Browser />
            <div className="mt-4 w-full flex flex-col items-center space-y-[1rem]">
                {data.posts.map((post: any, index: any) => {
                    return (
                        <Post
                            key={index}
                            image={post.image}
                            id={post.id}
                            title={post.title}
                            content={post.body}
                            likes={post.likes}
                            userId={post.userId}
                            num_comments={post.comments?.length}
                            username={post.user.username}
                        />
                    );
                })}
            </div>
            <Pagination params={0} />
        </div>
    );
};

export default Page;
