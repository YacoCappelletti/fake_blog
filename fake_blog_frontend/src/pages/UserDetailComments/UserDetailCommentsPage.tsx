import React, { useState, useEffect } from 'react';
import { MainTemplate, UserTemplate } from '../index';

import { useParams } from 'react-router-dom';
import { User, Comment as CommentType } from '../../interfaces';
import { Comment } from '../../components';
import { useUser } from '../../context';
const UserDetailCommentsPage = () => {
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
                    user.comments &&
                    user?.comments.map((comment: CommentType, index) => (
                        <Comment
                            key={index}
                            comment={comment}
                            enableDelete={false}
                            enableSeePost={true}
                        />
                    ))}
            </UserTemplate>
        </MainTemplate>
    );
};

export default UserDetailCommentsPage;
