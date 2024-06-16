import { useState } from 'react';
import { Post } from '../../interfaces';

const apiPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseUrl = process.env.API_URL;

    const getAll = async (page: number, pageSize: number) => {
        const url = `${baseUrl}/posts?page=${page}&size=${pageSize}`;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Request error');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            setError(error.message);
            console.error('Error fetching posts:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const getById = async (postId: string | undefined) => {
        const url = `${baseUrl}/posts/${postId}`;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Request error');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            setError(error.message);
            console.error('Error fetching post by ID:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const create = async (
        token: string,
        postData: Post,
        imageFile: File | undefined
    ) => {
        const url = `${baseUrl}/posts`;

        const formData = new FormData();

        formData.append('title', postData.title);
        formData.append('body', postData.body);

        if (postData.user.id !== undefined && postData.user !== null) {
            formData.append('userId', postData.user.id.toString());
        }

        if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Request error');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            setError(error.message);
            console.error('Error creating post:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const search = async (query: string) => {
        const url = `${baseUrl}/posts/search?q=${query}&page=${0}&size=${5}`;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Request error');
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            setError(error.message);
            console.error('Error searching posts:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const deletePost = async (token: string, postId: string) => {
        const url = `${baseUrl}/posts/${postId}`;
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
            console.error('Error deleting post:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        getAll,
        getById,
        create,
        search,
        deletePost,
        isLoading,
        setIsLoading,
        error,
        setError,
    };
};

export default apiPosts;
