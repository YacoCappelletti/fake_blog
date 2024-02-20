import React from 'react';
import { getSession, logout } from '../libs/lib';
const Page = async () => {
    const session = await getSession();
    console.log('From sesion status: ', session);
    return (
        <div>
            <h1 className="text-[2rem] text-center font-bold">
                Sesion status page
            </h1>
        </div>
    );
};

export default Page;
