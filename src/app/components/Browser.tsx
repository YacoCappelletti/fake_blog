'use client';
import React, { useState, useEffect, use } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Browser = () => {
    const [q, setQuery] = useState('');
    const pahtName = usePathname();
    const router = useRouter();

    const handleOnchange = (e: any) => {
        const query = e.target.value;
        setQuery(query);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (q.trim() !== '') {
            router.push('/searched_posts/' + q);
        }
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-[70%] sm:w-[35rem]  ">
                <form action="" onSubmit={handleSubmit} className="   ">
                    <div className="flex">
                        <input
                            type="text"
                            id="browser"
                            name="query_term"
                            className="border rounded w-full me-1"
                            placeholder=" Search a post"
                            onChange={handleOnchange}
                        />
                        <button className="border rounded px-2 py-1">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Browser;
