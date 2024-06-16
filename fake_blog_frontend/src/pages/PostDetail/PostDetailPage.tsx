import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { apiPosts, apiComments } from '../../api';
import { Post, Comment } from '../../components';
import { Post as PostType } from '../../interfaces';
import { MainTemplate } from '../index';

const PostDetailPage = () => {
    const [post, setPost] = useState<PostType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [commentContent, setCommentContent] = useState<string>('');
    const { postId } = useParams<{ postId: string }>();
    const { isAuthenticated, user: session } = useAuth();
    const { getById } = apiPosts();
    const { create } = apiComments();
    const [error, setError] = useState<string>('');
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedPost = await getById(postId);
                setPost(fetchedPost);
            } catch (error) {
                setError('Error fetching post details');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [postId, loading]);

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!commentContent.trim()) {
            setError('Comment cannot be empty');
            return;
        }

        try {
            await create(
                session?.token,
                postId,
                session?.id.toString(),
                commentContent
            );
            setCommentContent('');
            setLoading(true);
            navigate(pathname);
        } catch (error) {
            setError('Error submitting comment');
        }
    };

    if (loading) {
        return <MainTemplate>Loading...</MainTemplate>;
    }

    return (
        <MainTemplate>
            {post && (
                <div className="flex flex-col items-center">
                    <Post post={post} deletePost={undefined} />
                    <div className="w-full flex flex-col items-center">
                        {post.comments?.map((comment, index) => (
                            <Comment
                                key={index}
                                comment={comment}
                                enableDelete={false}
                                enableSeePost={false}
                            />
                        ))}
                    </div>
                    {isAuthenticated ? (
                        <form
                            onSubmit={handleCommentSubmit}
                            className="border rounded p-[.5rem] shadow-md  border-gray-200   my-4 flex flex-col  justify-between   w-[70%] sm:w-[35rem]"
                        >
                            <Link
                                to="/user/posts"
                                className="text-[.9rem] font-semibold text-left mb-1 "
                            >
                                {session?.username}
                            </Link>

                            <div className=" space-x-2">
                                {error && (
                                    <p className="p-1 border-red-600 bg-red-300 rounded my-1">
                                        Error: {error}
                                    </p>
                                )}
                                <input
                                    type="text"
                                    name="body"
                                    value={commentContent}
                                    onChange={(e) =>
                                        setCommentContent(e.target.value)
                                    }
                                    className="border h-[2rem] sm:w-[80%]"
                                    placeholder="Make your comment"
                                />
                                <input
                                    type="hidden"
                                    value={postId}
                                    name="postId"
                                />
                                <input
                                    type="hidden"
                                    value={session?.id}
                                    name="userId"
                                />
                                <input
                                    type="submit"
                                    value="Comment"
                                    className="border rounded px-2 py-1 border-gray-400"
                                />
                            </div>
                        </form>
                    ) : (
                        <>
                            <div className="my-4 text-center border rounded p-[.5rem] shadow-md  border-gray-200   flex flex-col  justify-between w-[70%] sm:w-[35rem] ">
                                <p>Would you like to comment?</p>
                                <Link
                                    to="/auth/login"
                                    className="text-[.9rem] font-semibold text-blue-500 hover:text-blue-600 "
                                >
                                    Log in
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            )}
        </MainTemplate>
    );
};

export default PostDetailPage;
