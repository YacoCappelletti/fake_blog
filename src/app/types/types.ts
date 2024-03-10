import FollowButton from '../components/FollowButton';

export interface Post {
    id: number;
    image: string;
    title: string;
    content: string;
    userId: number;
    num_comments: number;
    username: string;
    likes: number;
}

export interface FollowButton {
    followedFlag: boolean;
    session: { user: { id: string; username: string } };
    followedId: string;
}
