import { useState } from 'react';

const apiLikes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = process.env.API_URL;

    const like = async (
        token: string | undefined,
        postId: string,
        id: number | undefined
    ) => {
        try {
            const response = await fetch(`${baseUrl}/like/${postId}`, {
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
            console.error('Error liking post:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const unlike = async (
        token: string | undefined,
        postId: string,
        id: number | undefined
    ) => {
        try {
            const response = await fetch(`${baseUrl}/unlike/${postId}`, {
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
            console.error('Error unliking post:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { like, unlike, isLoading, setIsLoading, error, setError };
};

export default apiLikes;
