import React, { useState, useEffect } from 'react';
import { MainTemplate, ProfileTemplate } from '../index';
import { User, Post as PostType } from '../../interfaces';
import { useAuth, useProfile } from '../../context';
import { Post } from '../../components';

const ProfileLikedPostsPage = () => {
    const { user, isAuthenticated } = useAuth();
    const { profile, updateProfile } = useProfile();
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
                    profile.likedPosts &&
                    profile.likedPosts.map((post: PostType, index) => (
                        <Post post={post} key={index} />
                    ))}
            </ProfileTemplate>
        </MainTemplate>
    );
};

export default ProfileLikedPostsPage;
