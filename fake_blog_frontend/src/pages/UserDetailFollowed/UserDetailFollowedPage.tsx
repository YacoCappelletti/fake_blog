import React, { useState, useEffect } from 'react';
import { MainTemplate, UserTemplate } from '../index';
import { useParams } from 'react-router-dom';
import { User, UserProfile } from '../../interfaces';
import { FollowedUserCard } from '../../components';
import { useUser } from '../../context';

const UserDetailFollowedPage = () => {
    const { user, updateUser } = useUser();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { userId } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);

            try {
                if (userId) {
                    await updateUser(userId);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    return (
        <MainTemplate>
            <UserTemplate username={user?.username} userImage={user?.image}>
                {user &&
                    user.following &&
                    user?.following.map((user: UserProfile, index) => (
                        <FollowedUserCard user={user} key={index} />
                    ))}
            </UserTemplate>
        </MainTemplate>
    );
};

export default UserDetailFollowedPage;
