import React, { useEffect } from 'react';
import { useAuth } from '../../context';
import { Link } from 'react-router-dom';
import menu_icon from '../../assets/white_menu_icon.png';
import brand_image from '../../assets/brand_icon.png';
import Swal from 'sweetalert2';
const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { isAuthenticated, logout } = useAuth();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    useEffect(() => {}, [isAuthenticated]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 639) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        await Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Thank you for your visit`,
            showConfirmButton: false,
            timer: 1500,
        });
        logout();
    };

    return (
        <nav className="bg-black p-4 relative w-full flex flex-col justify-center items-center">
            <div className="flex flex-col sm:flex-row justify-between w-[90%] items-center ">
                <div className="flex justify-between w-[100%]">
                    <div className="">
                        <Link className="text-white" to="/">
                            <img
                                src={brand_image}
                                alt="Menu btn"
                                width={30}
                                height={30}
                            />
                        </Link>
                    </div>

                    <button
                        className="w-[2rem] h-[2rem] sm:hidden"
                        onClick={handleClick}
                    >
                        <img
                            src={menu_icon}
                            alt="Menu btn"
                            width={30}
                            height={30}
                        />
                    </button>
                </div>

                <ul
                    className={`
                    ${isOpen ? '' : 'hidden'}
                       text-center
                     text-white 
                     space-y-6
                      bg-black 
                      w-full 
                      left-0 
                      top-[99%]
                      sm:relative 
                      sm:flex
                      sm:space-y-0 
                      sm:space-x-6 
                      sm:justify-end
                      absolute
                      z-50 
                      p-[1rem]
                      sm:p-[0]
                   
                      `}
                >
                    <li>
                        <Link to="/">Home Page</Link>
                    </li>

                    <li>
                        {isAuthenticated ? (
                            <Link to="/profile/posts">My profile</Link>
                        ) : (
                            ''
                        )}
                    </li>
                    <li className=" ">
                        {isAuthenticated ? (
                            <form onSubmit={handleLogout}>
                                <button
                                    type="submit"
                                    className="bg-gray-400 hover:bg-gray-500 w-[100%] sm:w-[5rem] sm:rounded "
                                >
                                    Logout
                                </button>
                            </form>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-orange-500 hover:bg-orange-600 w-full sm:rounded px-4 py-2 inline-block sm:inline"
                            >
                                Sign In
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
