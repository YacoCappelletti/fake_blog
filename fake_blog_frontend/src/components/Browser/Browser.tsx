import React, { useState } from 'react';

const Browser = ({
    handleSearch,
}: {
    handleSearch: (query: string) => void;
}) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSearch(query);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        handleSearch(query);
    };

    return (
        <div className="w-full flex justify-center mt-5">
            <div className="w-[70%] sm:w-[35rem]  ">
                <form action="" onSubmit={handleSubmit} className="   ">
                    <div className="flex">
                        <input
                            type="text"
                            id="browser"
                            name="query_term"
                            className="border rounded w-full me-1"
                            placeholder=" Search a post"
                            onChange={handleOnChange}
                        />
                        <button
                            type="submit"
                            className="border rounded px-2 py-1"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Browser;
