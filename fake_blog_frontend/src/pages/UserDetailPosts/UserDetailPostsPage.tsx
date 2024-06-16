import React, { useState, useEffect } from 'react';
import { MainTemplate, UserTemplate } from '../index';
import { useParams } from 'react-router-dom';
import { User, Post as PostType } from '../../interfaces';
import { Post } from '../../components';
import { useUser } from '../../context';
const UserDetailPostsPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { userId } = useParams();
    const { user, updateUser } = useUser();

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
                    user.posts &&
                    user?.posts.map((post: PostType, index) => (
                        <Post post={post} key={index} />
                    ))}
            </UserTemplate>
        </MainTemplate>
    );
};

export default UserDetailPostsPage;
