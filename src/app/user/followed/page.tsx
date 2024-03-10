import React from 'react';
import { getSession } from '@/app/libs/lib';
import { getUserData, getFollowedUsers } from '@/app/libs/actions';
import FollowedUserCard from '@/app/components/FollowedUserCard';
const Page = async () => {
    const session = await getSession();
    const userData = await getUserData(session?.user.id);
    const followedUsers = await getFollowedUsers(session?.user.id);
    console.log(followedUsers);
    return (
        <>
            <div>
                <h1 className="text-center text-[2rem] font-semibold">
                    User Followed Page
                </h1>
            </div>
            <div className="mt-[2rem] w-full flex flex-col items-center space-y-[1rem] overflow-y-scroll max-h-screen p-4 ">
                {followedUsers?.map((user: any, index: any) => {
                    return (
                        <FollowedUserCard
                            key={index}
                            userId={user.id}
                            username={user.username}
                            userImage={user.image}
                        />
                    );
                })}
            </div>
        </>
    );
};

// <div className="mt-[2rem] w-full flex flex-col items-center space-y-[1rem] overflow-y-scroll max-h-screen p-4 ">
//     {userData.comments?.map((comment: any, index: any) => {
//         return (
//             <Comment
//                 key={index}
//                 userId={comment.userId}
//                 username={comment.user.username}
//                 body={comment.body}
//                 postId={comment.postId}
//                 commentId={comment.id}
//             />
//         );
//     })}
// </div>;

export default Page;
