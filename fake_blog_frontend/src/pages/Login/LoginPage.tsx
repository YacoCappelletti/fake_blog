// Login.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context';
import { useLogin } from '../../hooks';
import { MainTemplate } from '../index';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { login, isAuthenticated } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login: doLogin, error } = useLogin();
    const authUrl = process.env.API_URL + '/auth/login';
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            return navigate('/profile/posts');
        }
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!username || !password) {
            alert('Please enter username and password.');
            return;
        }

        const userData = await doLogin(username, password, authUrl);
        if (userData) {
            await login(userData);
            navigate('/profile/posts');
        }
    };

    const loginDemoUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const userData = await doLogin('atuny0', '9uQFF1Lh', authUrl);
        if (userData) {
            await login(userData);
            navigate('/profile/posts');
        }
    };

    return (
        <>
            <MainTemplate>
                <form className="max-w-sm mx-auto mt-[6rem] border border-gray-300 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Sign In
                    </h2>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
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
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded py-2 px-3 mb-4"
                    />
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded my-4"
                        onClick={loginDemoUser}
                    >
                        Login with demo user
                    </button>
                    <p className="text-center text-sm mt-2">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-500">
                            Sign Up here
                        </Link>
                    </p>
                </form>
            </MainTemplate>
        </>
    );
};

export default LoginPage;
