import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import like_img from '../../assets/like.png';
import notLiked_img from '../../assets/unlike.png';

interface LikeBtnProps {
    postId: number;
    isLiked: boolean;
    num_likes: number;
    onLike: () => void;
    onUnlike: () => void;
}

const LikeBtn: React.FC<LikeBtnProps> = ({

    isLiked,
    num_likes,
    onLike,
    onUnlike,
}) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleClick = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (isLiked) {
            onUnlike();
        } else {
            onLike();
        }
    };

    return (
        <button onClick={handleClick} className="flex space-x-1 items-center">
            <p>{num_likes}</p>
            <img
                src={isLiked ? like_img : notLiked_img}
                width={20}
                height={20}
                alt="Like btn"
            />
        </button>
    );
};

export default LikeBtn;
