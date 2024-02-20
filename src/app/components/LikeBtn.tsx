'use client';
import React from 'react';

const handleClick = () => {
    alert('Que lo que puto');
};

const LikeBtn = ({ userId, postId }: any) => {
    return <button onClick={handleClick}>Dale like</button>;
};

export default LikeBtn;
