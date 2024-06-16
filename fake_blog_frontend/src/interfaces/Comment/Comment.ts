import { Post, User } from '../index';

interface Comment {
    id: number;
    body: string;
    post: Post;
    user: User;
}
export default Comment;
