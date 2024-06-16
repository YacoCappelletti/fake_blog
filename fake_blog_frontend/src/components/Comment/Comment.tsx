import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiComments } from '../../api';
import { useAuth } from '../../context';
import { Comment as CommentType } from '../../interfaces';

const checkIsAuthor = (
    sessionId: number | undefined,
    authorId: number | null
) => {
    if (!sessionId || !authorId) {
        return false;
    }
    if (sessionId == authorId) {
        return true;
    }
    return false;
};

const Comment: React.FC<{
    comment: CommentType;
    enableDelete: boolean;
    enableSeePost: boolean;
}> = ({ comment, enableDelete, enableSeePost }) => {
    const { user: session } = useAuth();
    const isCommentAuthor = checkIsAuthor(session?.id, comment.user.id);
    const { deleteComment } = apiComments();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await deleteComment(session?.token, comment.id.toString());
    };

    return (
        <div className="border rounded p-[.5rem] shadow-md  border-gray-200   my-4 flex flex-col  justify-between  min-[700px]:flex-row w-[70%] sm:w-[35rem]">
            <div className="">
                <Link
                    className="text-[.9rem] font-semibold text-blue-600"
                    to={`/user_detail/${comment.user.id}/posts`}
                >
                    {comment.user.username}
                </Link>

                <p>{comment.body}</p>
            </div>

            {comment.post.id ? (
                <div className=" flex flex-col justify-center  flex-wrap  items-center  lg:me-4  py-2  mt-4 min-[400px]:flex-row space-y-2 min-[400px]:space-y-0 min-[400px]:space-x-3 ">
                    {enableSeePost ? (
                        <Link
                            className="text-[1rem]  text-center text-white   bg-gray-300 hover:bg-slate-400  rounded-[5px]  px-4 py-2  w-[104px] flex items-center justify-center"
                            to={`/post_detail/${comment.post.id}`}
                        >
                            See Post
                        </Link>
                    ) : (
                        ''
                    )}

                    {isCommentAuthor && enableDelete && (
                        <form
                            onSubmit={handleSubmit}
                            className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 border-red-700 rounded-[5px] w-[104px] text-center "
                        >
                            <input
                                type="hidden"
                                name="commentId"
                                value={comment.id}
                            />
                            <input type="submit" value="Delete" />
                        </form>
                    )}
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Comment;
