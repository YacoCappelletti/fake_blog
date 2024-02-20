import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-400 flex flex-col space-y-[0rem] sm:space-y-[0rem] sm:flex-row sm:justify-between text-[color]">
            <div className="p-[1rem] ">
                <h3 className="text-[1.5rem] mb-[.5rem]  ">Contact Us</h3>
                <p>
                    <span className="font-semibold">Email:</span>{' '}
                    yacocappelletti@gmail.com
                </p>
                <p>
                    <span className="font-semibold">Phone:</span> +1
                    (123)456-7890
                </p>
            </div>

            <div className="p-[1rem] ">
                <h3 className="text-[1.5rem] mb-[.5rem]  ">Social media</h3>
                <ul>
                    <li>
                        <a href="#">Linkedin</a>
                    </li>
                    <li>
                        <a href="#">Github</a>
                    </li>
                </ul>
            </div>

            <div className="p-[1rem] ">
                <h3 className="text-[1.5rem] mb-[.5rem]  ">Address</h3>
                <p>123 Main Street, Cityville, Country</p>
            </div>
        </footer>
    );
};

export default Footer;
