import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userId, postId } = await req.json();

        const likedPost = await prisma.likedPost.findFirst({
            where: {
                userId: parseInt(userId),
                postId: parseInt(postId),
            },
        });
        const unLikedPost = await prisma?.post.findFirst({
            where: {
                id: postId,
            },
        });

        if (!likedPost) {
            return NextResponse.json({
                status: 404,
                message:
                    'No existe un "me gusta" para este usuario y esta publicación',
            });
        }
        if (!unLikedPost) {
            return NextResponse.json({
                status: 400,
                message: 'The post not exist',
            });
        }

        const deletedPost = await prisma.likedPost.delete({
            where: {
                id: likedPost?.id,
            },
        });
        const updatePost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likes: unLikedPost?.likes - 1 > 0 ? unLikedPost?.likes - 1 : 0,
            },
        });

        return NextResponse.json({ status: 201, unLikedPost });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                status: 500,
                message: error.message,
            });
        } else {
            return NextResponse.json({
                status: 500,
                message: 'Unknown error',
            });
        }
    }
}
