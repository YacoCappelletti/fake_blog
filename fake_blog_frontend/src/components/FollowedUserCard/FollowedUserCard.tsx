import React from 'react';
import { useAuth } from '../../context';
import { UserProfile } from '../../interfaces';
import { Link } from 'react-router-dom';
import { apiFollows } from '../../api';

const FollowedUserCard: React.FC<{ user: UserProfile }> = ({ user }) => {
    const { user: session } = useAuth();
    const { unfollow } = apiFollows();

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (user?.id) {
                await unfollow(session?.token, user.id.toString(), session?.id);
            } else {
                console.error('User or user id is undefined.');
            }
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    return (
        <div className="flex max-[500px]:flex-col border rounded p-[.5rem] shadow-md  border-gray-200  w-[70%] sm:w-[35rem] my-4  justify-between">
            <div className="flex flex-col items-center jus">
                <p className="font-semibold ">{user.username}</p>

                <img
                    src={user.image || ''}
                    alt="User image"
                    className="w-[8rem]"
                />
            </div>
            <div className="mt-4 flex max-[640px]:flex-col   justify-center items-center max-[640px]:space-y-2  min-[640px]:space-x-4 min-[640px]:me-4 ">
                <Link
                    className="text-[1rem]  text-center text-white   bg-gray-300 hover:bg-slate-400  rounded-[5px]  px-4 py-2  w-[104px] flex items-center justify-center"
                    to={'/user_detail/' + user.id + '/posts'}
                >
                    Profile
                </Link>

                <form
                    onSubmit={handleOnSubmit}
                    className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 border-red-700 rounded-[5px] w-[104px] text-center "
                >
                    <input
                        type="hidden"
                        value={session?.id}
                        name="followerId"
                    />
                    <input type="hidden" value={user.id} name="followedId" />
                    <input type="submit" value="Unfollow" />
                </form>
            </div>
        </div>
    );
};

export default FollowedUserCard;
