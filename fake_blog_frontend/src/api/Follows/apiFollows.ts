import { useState } from 'react';

const apiFollows = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = process.env.API_URL;

    const follow = async (
        token: string | undefined,
        followedId: string,
        id: number | undefined
    ) => {
        try {
            const response = await fetch(`${baseUrl}/follow/${followedId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Request error');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            setError(error.message);
            console.error('Error following user:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const unfollow = async (
        token: string | undefined,
        followedId: string,
        id: number | undefined
    ) => {
        try {
            const response = await fetch(`${baseUrl}/unfollow/${followedId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('Request error');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            setError(error.message);
            console.error('Error unfollowing user:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    return { follow, unfollow };
};

export default apiFollows;
