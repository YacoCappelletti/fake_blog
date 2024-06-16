import React, { useState, useEffect } from 'react';
import { MainTemplate, ProfileTemplate } from '../index';
import { Post as PostType } from '../../interfaces';
import { useAuth, useProfile } from '../../context';
import { Post } from '../../components';
import { apiPosts } from '../../api';
import { useNavigate } from 'react-router-dom';

const ProfilePostsPage = () => {
    const { user, isAuthenticated } = useAuth();
    const { profile, updateProfile } = useProfile();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { deletePost } = apiPosts();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                if (isAuthenticated && user) {
                    await updateProfile();
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [isAuthenticated, user]);

    return (
        <MainTemplate>
            <ProfileTemplate
                username={profile?.username}
                userImage={profile?.image}
            >
                {profile &&
                    profile.posts &&
                    profile.posts.map((post: PostType, index) => (
                        <Post post={post} key={index} deletePost={deletePost} />
                    ))}
            </ProfileTemplate>
        </MainTemplate>
    );
};

export default ProfilePostsPage;
