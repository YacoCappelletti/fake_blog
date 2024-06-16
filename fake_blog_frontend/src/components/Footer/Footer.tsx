import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="bg-black flex flex-col space-y-[0rem] sm:space-y-[0rem] sm:justify-around text-white ">
            <p className="text-center p-1">- Made by Yaco Cappelletti -</p>

            <div className="p-2 flex justify-center space-x-2">
                <Link
                    to="https://www.linkedin.com/in/yaco-cappelletti-arias/"
                    target="_blank"
                >
                    Linkedin
                </Link>
                <p>|</p>
                <Link to="https://github.com/YacoCappelletti" target="_blank">
                    Github
                </Link>
                <p>|</p>
                <Link to="/">Portfolio</Link>
            </div>
        </footer>
    );
};

export default Footer;
