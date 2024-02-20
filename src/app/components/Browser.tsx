import React from 'react';
import { redirect } from 'next/navigation';
async function getSearchedPosts(formData: FormData) {
    'use server';
    const rawFormData = Object.fromEntries(formData.entries());
    redirect('/searched_posts/' + rawFormData.query_term);
}

const Browser = () => {
    return (
        <div className="w-full">
            <form action={getSearchedPosts}>
                <div className="flex">
                    <input
                        type="text"
                        id="browser"
                        name="query_term"
                        className="border rounded w-full"
                        placeholder=" Search a post"
                    />
                    <button className="border rounded px-2 py-1">Search</button>
                </div>
            </form>
        </div>
    );
};

export default Browser;
