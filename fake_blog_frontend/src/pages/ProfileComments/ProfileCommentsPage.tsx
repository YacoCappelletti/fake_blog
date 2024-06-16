import React, { useState, useEffect } from 'react';
import { MainTemplate, ProfileTemplate } from '../index';
import { Comment } from '../../components';
import { useAuth, useProfile } from '../../context';

const ProfileCommentsPage = () => {
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
                    profile.comments &&
                    profile.comments.map((comment: any, index) => (
                        <Comment
                            comment={comment}
                            key={index}
                            enableDelete={true}
                            enableSeePost={true}
                        />
                    ))}
            </ProfileTemplate>
        </MainTemplate>
    );
};

export default ProfileCommentsPage;
