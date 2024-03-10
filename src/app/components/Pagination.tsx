'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
const Pagination = ({ params }: any) => {
    const [page, setPage] = useState(Number(params.page) || 0);

    const router = useRouter();

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
        router.push('/page/' + (page - 1));
    };

    const nextPage = () => {
        setPage(page + 1);
        router.push('/page/' + (page + 1));
    };
    useEffect(() => {}, [page]);

    const handleClick = () => {};
    return (
        <div className="flex justify-center mt-5 space-x-2">
            <button
                onClick={prevPage}
                className="p-2 border rounded shadow-sm border-gray-300 "
            >
                {'<<'}
            </button>
            <button
                className={`p-2 border rounded shadow-sm border-gray-300 ${
                    page == 2 ? 'text-yellow-400' : ''
                }`}
                onClick={() => {
                    router.push('/page/' + 2);
                }}
            >
                2
            </button>
            <button
                className={`p-2 border rounded shadow-sm border-gray-300 ${
                    page == 3 ? 'text-yellow-400' : ''
                } `}
                onClick={() => {
                    router.push('/page/' + 3);
                }}
            >
                3
            </button>
            <button
                className={`p-2 border rounded shadow-sm border-gray-300 ${
                    page == 4 ? 'text-yellow-400' : ''
                } `}
                onClick={() => {
                    router.push('/page/' + 4);
                }}
            >
                4
            </button>
            <button
                className={`p-2 border rounded shadow-sm border-gray-300 ${
                    page == 5 ? 'text-yellow-400' : ''
                } `}
                onClick={() => {
                    router.push('/page/' + 5);
                }}
            >
                5
            </button>
            <button
                className={`p-2 border rounded shadow-sm border-gray-300 ${
                    page == 6 ? 'text-yellow-400' : ''
                } `}
                onClick={() => {
                    router.push('/page/' + 6);
                }}
            >
                6
            </button>
            <button
                onClick={nextPage}
                className="p-2 border rounded shadow-sm border-gray-300 "
            >
                {'>>'}
            </button>
        </div>
    );
};

export default Pagination;
