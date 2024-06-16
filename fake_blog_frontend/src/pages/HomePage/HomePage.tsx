import React, { useState, useEffect } from 'react';
import { Post } from '../../components';
import { Post as PostType } from '../../interfaces';
import { apiPosts } from '../../api';
import { Pagination, Browser } from '../../components';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainTemplate } from '../index';

const HomePage = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const { deletePost, getAll, search } = apiPosts();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page') || '0', 10);
    const pageSize = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAll(page, pageSize);
                setPosts(response.content);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page, pageSize]);

    useEffect(() => {
        if (!posts) {
            const fetchData = async () => {
                try {
                    const response = await getAll(0, 10);
                    setPosts(response.content);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [posts]);

    const handlePageChange = (pageNumber: number) => {
        navigate(`/?page=${pageNumber}`);
    };

    const handleSearch = async (query: string) => {
        try {
            const response = await search(query);
            setPosts(response.content);
        } catch (error) {
            console.error('Error searching posts:', error);
        }
    };

    return (
        <MainTemplate>
            <Browser handleSearch={handleSearch} />
            <div className="mt-4 w-full flex flex-col items-center space-y-[1rem] min-h-screen">
                {posts.map((post: PostType, index: number) => (
                    <Post key={index} post={post} deletePost={deletePost} />
                ))}
            </div>
            <Pagination
                page={page}
                onPageChange={handlePageChange}
                totalPages={10}
            />
        </MainTemplate>
    );
};

export default HomePage;
