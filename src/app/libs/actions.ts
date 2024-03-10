'use server';
import { prisma } from '@/app/libs/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
// import { writeFile } from 'fs/promises';

export async function getUserData(id: string) {
    try {
        if (!id) {
            return null;
        }

        const user = await prisma.user.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                posts: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            },
                        },
                        comments: true,
                    },
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function followUser(followerId: string, followedId: string) {
    const follow = await prisma?.follow.create({
        data: {
            followerId: Number(followerId),
            followedId: Number(followedId),
        },
    });
    revalidatePath(`/user_detail/${followedId}/posts`);
    redirect(`/user_detail/${followedId}/posts`);
}

export async function checkFollowed(followerId: string, followedId: string) {
    try {
        let followed = false;

        if (followerId && followedId) {
            const existingFollow = await prisma.follow.findFirst({
                where: {
                    followerId: parseInt(followerId),
                    followedId: parseInt(followedId),
                },
            });

            if (existingFollow) {
                followed = true;
            }
        }
        return followed;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function unFollowUser(followerId: string, followedId: string) {
    // const followerId: any = formdata.get('followerId');
    // const followedId: any = formdata.get('followedId');
    try {
        const existingFollow = await prisma.follow.findFirst({
            where: {
                followerId: parseInt(followerId),
                followedId: parseInt(followedId),
            },
        });

        if (!existingFollow) return null;

        const UnFollowedUser = await prisma.follow.delete({
            where: {
                id: existingFollow?.id,
            },
        });
        revalidatePath(`/user_detail/${followedId}/posts`);
        redirect(`/user_detail/${followedId}/posts`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function checkLiked(userId: number, postId: number) {
    try {
        if (!userId || !postId) return false;
        let checkLiked = false;

        const liked = await prisma.likedPost.findFirst({
            where: {
                userId: userId,
                postId: postId,
            },
        });

        if (liked) {
            checkLiked = true;
        }
        return checkLiked;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function createPost(formData: FormData) {
    const title = formData.get('title');
    const body = formData.get('body');
    const userId = parseInt(
        formData.get('userId')?.toString().trim() ?? '0',
        10
    );
    const image = formData.get('image');

    if (!title || !body || isNaN(userId) || !image) {
        throw new Error('Title, body or user session are invalid.');
    }
    try {
        const imageExtension = (image as File).name.split('.').pop();
        const uniqueImageName = `${uuidv4()}.${imageExtension}`;

        const imagePath = path.join(
            __dirname,
            '../../../../../public/post_images/',
            uniqueImageName
        );
        await writeFile(
            imagePath,
            Buffer.from(await (image as File).arrayBuffer())
        );

        const newPost = await prisma.post.create({
            data: {
                title: title?.toString(),
                body: body?.toString(),
                userId: userId, // Asegúrate de convertir userId a número si es necesario
                likes: 0,
                image: `http://localhost:3000/post_images/${uniqueImageName}`, // Nombre de la imagen si existe
            },
        });

        console.log('Nuevo post creado:', newPost);
        return newPost;
    } catch (error) {
        console.error('Error al crear el post:', error);
        throw error;
    }
}

export async function getLikedPosts(userId: String) {
    try {
        const likedPostsIds = await prisma.likedPost.findMany({
            where: {
                userId: Number(userId),
            },
            select: {
                postId: true,
            },
        });

        if (!likedPostsIds) {
            return null;
        }

        const likedPosts: any = [];

        for (let i = 0; i < likedPostsIds.length; i++) {
            const element = await prisma.post.findUnique({
                where: {
                    id: likedPostsIds[i].postId,
                },
                include: {
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
            });

            likedPosts.push(element);
        }

        if (!likedPosts) {
            return null;
        }

        return likedPosts;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function makeComment(formData: FormData) {
    const body = formData.get('body');
    const postId = formData.get('postId');
    const userId = formData.get('userId');

    try {
        if (!body || !postId || !userId) return null;

        const newComment = await prisma.comment.create({
            data: {
                body: body.toString(),
                postId: Number(postId),
                userId: Number(userId),
            },
        });
        console.log(newComment);

        if (!newComment) return null;

        return newComment;
    } catch (error) {
        throw error;
    }
}

export async function deleteComment(formData: FormData) {
    const commentId = formData.get('commentId');
    try {
        if (!commentId) return null;

        const deletedComment = await prisma.comment.delete({
            where: {
                id: Number(commentId),
            },
        });

        return 'Comment deleted';
    } catch (error) {
        throw error;
    }
}
export async function deletePost(formData: FormData) {
    const postId = formData.get('postId');
    try {
        if (!postId) return null;

        const deletedPost = await prisma.post.delete({
            where: {
                id: Number(postId),
            },
        });

        return 'Post deleted';
    } catch (error) {
        throw error;
    }
}

export async function getFollowedUsers(userId: String) {
    try {
        const followedUsersIds = await prisma.follow.findMany({
            where: {
                followerId: Number(userId),
            },
        });

        if (!followedUsersIds) {
            return null;
        }

        const followedUsers: any = [];

        for (let i = 0; i < followedUsersIds.length; i++) {
            const element = await prisma.user.findUnique({
                where: {
                    id: followedUsersIds[i].followedId,
                },
                select: {
                    id: true,
                    username: true,
                    image: true,
                },
            });

            followedUsers.push(element);
        }

        if (!followedUsers) {
            return null;
        }

        return followedUsers;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
