import { useState } from 'react';

const apiUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = process.env.API_URL;

    const getUserById = async (id: string) => {
        const url = baseUrl + '/users/' + id;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Request error');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            setError(error.message);
            console.error('Error fetching data:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { getUserById, isLoading, setIsLoading, error, setError };
};

export default apiUsers;
