import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { MainTemplate, ProfileTemplate } from '../index';
import { apiUsers, apiPosts } from '../../api';
import { PostUser, Post as PostType } from '../../interfaces';
import { useAuth, useProfile } from '../../context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddPostPage = () => {
    const { create } = apiPosts();
    const { user: session, isAuthenticated } = useAuth();
    const { profile, updateProfile } = useProfile();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const user: PostUser = {
        id: session?.id,
        username: session?.username,
        image: session?.image,
    };

    const [postData, setPostData] = useState<PostType>({
        title: '',
        user,
        body: '',
    });
    const { title, body } = postData;
    const [image, setImage] = useState<File>();
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                if (isAuthenticated && session) {
                    await updateProfile();
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [isAuthenticated, session]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim() || !body.trim() || !image) {
            const newErrors = [];
            if (!title.trim()) {
                newErrors.push('Title cannot be empty');
            }
            if (!body.trim()) {
                newErrors.push('Body cannot be empty');
            }
            if (!image) {
                newErrors.push('Image cannot be empty');
            }
            setErrors(newErrors);
            return;
        }
        if (session) {
            await create(session?.token, postData, image);

            await updateProfile();
            await Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Your post has been saved',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/profile/posts');
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <MainTemplate>
            <ProfileTemplate
                username={profile?.username}
                userImage={profile?.image}
            >
                <form
                    onSubmit={handleSubmit}
                    className="max-w-sm mx-auto my-[2rem] border border-gray-300 p-6 rounded-lg"
                >
                    <h2 className="text-[1.5rem] font-semibold mb-4 text-center">
                        Create Post
                    </h2>
                    {errors.length > 0 && (
                        <div className="text-red-500 mb-4">
                            {errors.map((error, index) => (
                                <p
                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4"
                                    key={index}
                                >
                                    {error}
                                </p>
                            ))}
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        className="w-full border rounded py-2 px-3 mb-4"
                    />

                    <textarea
                        placeholder="Body"
                        name="body"
                        value={body}
                        onChange={handleChange}
                        className="w-full border rounded py-2 px-3 mb-4 resize-none"
                        rows={6}
                    ></textarea>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full border rounded py-2 px-3 mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </ProfileTemplate>
        </MainTemplate>
    );
};

export default AddPostPage;
