import { useState } from 'react';

const useRegister = () => {
    const [error, setError] = useState<string | null>(null);

    const register = async (
        username: string,
        email: string,
        password: string,
        url: string
    ) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
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

    return { register, error };
};

export default useRegister;
