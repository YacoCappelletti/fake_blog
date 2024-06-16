import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiLikes } from '../../api';
import { Post as PostType } from '../../interfaces';
import { useAuth, useProfile } from '../../context';
import { LikeBtn } from '../index';
import comments_img from '../../assets/comment.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Post: React.FC<{
    post: PostType;
    deletePost?: (token: any, postId: string) => void;
}> = ({ post, deletePost }) => {
    const { user: session } = useAuth();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(
        post.likedBy?.length || 0
    );
    const { like, unlike } = apiLikes();
    const imagesUrl = process.env.API_IMAGES_URL;
    const navigate = useNavigate();
    const checkLiked = (likedBy: any[], userId: number): boolean => {
        return likedBy.some((user) => user.id === userId);
    };
    const { updateProfile } = useProfile();

    useEffect(() => {
        if (session) {
            setIsLiked(checkLiked(post.likedBy || [], session.id));
        }
    }, [session, post.likedBy]);

    const handleLike = async () => {
        if (session && session.token && session.id && session.id && post.id) {
            try {
                await like(session.token, post.id.toString(), session.id);
                setIsLiked(true);
                setLikesCount((prevCount) => prevCount + 1);
            } catch (error) {
                console.error('Error when liking the post:', error);
            }
        }
    };

    const handleUnlike = async () => {
        if (session && session.token && session.id && post.id) {
            try {
                await unlike(session.token, post.id.toString(), session.id);
                setIsLiked(false);
                setLikesCount((prevCount) => prevCount - 1);
            } catch (error) {
                console.error('Error when unliking the post:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (session && session.token && post.id && deletePost) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        if (post.id != null && post.id != undefined) {
                            await deletePost(session.token, post.id.toString());
                            updateProfile();
                            navigate('/profile/posts');
                        }
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your post has been deleted.',
                            icon: 'success',
                        });
                    } catch (error) {
                        Swal.fire({
                            title: 'Error!',
                            text: 'An error occurred while deleting the post.',
                            icon: 'error',
                        });
                    }
                }
            });
        }
    };

    return (
        <div className="border rounded p-[.5rem] shadow-md border-gray-200 w-[70%] sm:w-[35rem] my-4 flex justify-center">
            <div className="flex flex-col w-[90%]">
                <div className="flex space-x-2 justify-between">
                    <Link
                        className="text-[1rem] my-1 flex"
                        to={`/user_detail/${post.user.id}/posts`}
                    >
                        <b>Author:</b>{' '}
                        <p className="text-blue-600 ms-1">
                            {post.user.username}
                        </p>
                    </Link>
                </div>
                <div className="my-1">
                    <h3 className="text-[1.5rem]">{post.title}</h3>
                </div>
                <div className="flex justify-center">
                    <Link
                        className="text-[.9rem] font-semibold w-full flex justify-center max-h-[300px] max-w-[500px]"
                        to={`/post_detail/${post.id}`}
                    >
                        <img
                            src={
                                post.image?.startsWith('http')
                                    ? post.image
                                    : `${imagesUrl}/${post.image}`
                            }
                            alt="post_image"
                            className="rounded shadow-2xl object-cover w-full h-full"
                        />
                    </Link>
                </div>

                <div className="flex justify-center overflow-y-auto max-h-[10rem] mt-4 p-2">
                    <p className="text-left">{post.body}</p>
                </div>
                <div className="flex space-x-2 justify-between my-2">
                    <div className="">
                        {post.user.id === session?.id && (
                            <form
                                onSubmit={handleSubmit}
                                className=" text-white bg-red-500 hover:bg-red-600 border-red-700 rounded-[5px] w-[104px] text-center p-1 "
                            >
                                <input
                                    type="hidden"
                                    value={post.id ? post.id.toString() : ''}
                                    name="postId"
                                />
                                <button
                                    type="submit"
                                    className="text-[1rem] text-white  "
                                >
                                    Delete Post
                                </button>
                            </form>
                        )}
                    </div>
                    <div className="flex">
                        <div className="flex space-x-1 items-center">
                            <p className="text-black">
                                {post.comments?.length || 0}
                            </p>
                            <img
                                src={comments_img}
                                width={20}
                                height={20}
                                alt="Comments"
                            />
                        </div>
                        <div className="flex space-x-2 items-center">
                            <LikeBtn
                                postId={post.id ? post.id : 0}
                                isLiked={isLiked}
                                num_likes={likesCount}
                                onLike={handleLike}
                                onUnlike={handleUnlike}
                            ></LikeBtn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
