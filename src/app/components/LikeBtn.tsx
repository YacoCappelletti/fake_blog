'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const LikeBtn = ({ userId, postId, isLiked, num_likes }: any) => {
    const router = useRouter();
    const [liked, setLiked] = useState(isLiked);
    const [likes, setLikes] = useState(num_likes);

    const handleClick = () => {
        if (!userId) {
            router.push('/auth/login');
            return;
        }

        setLiked(!liked);
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
    };

    useEffect(() => {
        async function sendLike() {
            const url = `http://localhost:3000/api/private/posts/${postId}/${
                liked ? 'like' : 'unlike'
            }`;
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ userId, postId }),
            });
        }

        sendLike();
    }, [liked]);

    return (
        <button onClick={handleClick} className="flex space-x-1">
            <p>{likes}</p>
            <img
                src={`/aplication_img/${liked ? 'like.png' : 'unlike.png'}`}
                width={20}
                height={20}
                alt="Like btn"
            />
        </button>
    );
};

export default LikeBtn;
