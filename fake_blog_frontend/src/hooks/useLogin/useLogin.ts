
import { useState } from 'react';

const useLogin = () => {
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string, url: string) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Incorrect user or password');
            }

            return await response.json();
        } catch (error: any) {
            setError(error.message);
            return null;
        }
    };

    return { login, error };
};

export default useLogin;
