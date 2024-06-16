import React, { useState } from 'react';
import { useAuth } from '../../context';
import { useRegister } from '../../hooks';
import { MainTemplate } from '../index';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterPage: React.FC = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { register: doRegister, error } = useRegister();
    const apiUrl = process.env.API_URL + '/auth/register';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        const userData = await doRegister(username, email, password, apiUrl);
        if (userData) {
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Welcome ${username}`,
                showConfirmButton: false,
                timer: 1500,
            });
            login(userData);
            navigate('/profile/posts');
        }

        login(userData);
    };

    return (
        <>
            <MainTemplate>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-sm mx-auto  border border-gray-300 p-6 rounded-lg mt-[6rem] "
                >
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Sign Up
                    </h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                            {error}
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded py-2 px-3 mb-4"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded py-2 px-3 mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded py-2 px-3 mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </MainTemplate>
        </>
    );
};

export default RegisterPage;
