import React from 'react';

async function getPosts() {
    const url = 'http://localhost:3000/api/private/posts/';

    const res = await fetch(url, {
        method: 'GET',
        next: { revalidate: 30 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const PostsTableView = async () => {
    const data = await getPosts();
    console.log(data);
    return (
        <>
            <table className="table-auto border  ">
                <thead>
                    <tr className="text-[1.2rem]">
                        <th className="px-4 py-2 ">Image</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Heading</th>
                        <th className="px-4 py-2">Content</th>
                        <th className="px-4 py-2">Likes</th>
                        <th className="px-4 py-2">Author</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.posts.map((post: any, index: any) => {
                        return (
                            <tr key={index}>
                                <td className="px-4 py-2">{post.image}</td>
                                <td className="px-4 py-2">{post.date}</td>
                                <td className="px-4 py-2">{post.heading}</td>
                                <td className="px-4 py-2">{post.content}</td>
                                <td className="px-4 py-2">{post.likes}</td>
                                <td className="px-4 py-2">
                                    {post.user_profile_id}
                                </td>
                                <td className="px-4 py-2">Holu </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default PostsTableView;
