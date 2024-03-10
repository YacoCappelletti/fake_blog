import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userId, postId } = await req.json();

        const existingLike = await prisma?.likedPost.findFirst({
            where: {
                userId: Number(userId),
                postId: Number(postId),
            },
        });

        const likedPost = await prisma?.post.findFirst({
            where: {
                id: postId,
            },
        });

        if (existingLike) {
            return NextResponse.json({
                status: 400,
                message: 'El usuario ya ha dado "me gusta" a esta publicación',
            });
        }
        if (!likedPost) {
            return NextResponse.json({
                status: 400,
                message: 'The post not exist',
            });
        }

        const like = await prisma?.likedPost.create({
            data: {
                userId: Number(userId),
                postId: Number(postId),
            },
        });
        const updatePost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likes: likedPost?.likes + 1,
            },
        });

        return NextResponse.json({ status: 201, like });
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
