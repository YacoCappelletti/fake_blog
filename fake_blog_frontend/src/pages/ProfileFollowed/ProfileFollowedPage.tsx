import React, { useState, useEffect } from 'react';
import { MainTemplate, ProfileTemplate } from '../index';
import { User, UserProfile } from '../../interfaces';
import { useAuth, useProfile } from '../../context';
import { FollowedUserCard } from '../../components';

const ProfileFollowedPage = () => {
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
                    profile.following &&
                    profile.following.map((user: UserProfile, index) => (
                        <FollowedUserCard user={user} key={index} />
                    ))}
            </ProfileTemplate>
        </MainTemplate>
    );
};

export default ProfileFollowedPage;
