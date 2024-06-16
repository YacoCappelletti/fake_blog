import { Post, Comment, UserProfile } from '../index';

interface User {
    id: number;
    username: string;
    email: string | null;
    image: string;
    posts: Post[] | null;
    likedPosts?: Post[];
    following: UserProfile[] | null;
    followedBy: UserProfile[] | null;
    comments: Comment[] | null;
    role: string | null;
}

export default User;
