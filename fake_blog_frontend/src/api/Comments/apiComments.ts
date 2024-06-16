import { useState } from 'react';

const apiComments = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = process.env.API_URL;

    const create = async (
        token: string | undefined,
        postId: string | undefined,
        userId: string | undefined,
        body: string | undefined
    ) => {
        const url = `${baseUrl}/comments`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post: { id: postId },
                    user: { id: userId },
                    body,
                }),
            });

            if (!response.ok) {
                throw new Error('Request error');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            setError(error.message);
            console.error('Error creating comment:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteComment = async (
        token: string | undefined,
        commentId: string
    ) => {
        const url = `${baseUrl}/comments/${commentId}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Request error');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            setError(error.message);
            console.error('Error deleting comment:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { create, deleteComment, isLoading, setIsLoading, error, setError };
};

export default apiComments;
