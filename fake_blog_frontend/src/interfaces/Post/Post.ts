import { Comment } from '../index';

export interface PostUser {
    id: number | undefined;
    username: string | undefined;
    email?: string;
    image: string | undefined;
}

export interface Post {
    id?: number | null;
    title: string;
    body: string;
    image?: string | null;
    user: PostUser;
    likedBy?: PostUser[] | null;
    comments?: Comment[] | null;
}
