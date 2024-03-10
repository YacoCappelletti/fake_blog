import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userId, postId } = await req.json();
        if (!userId || !postId) return false;
        let checkLiked = false;

        const liked = await prisma.likedPost.findFirst({
            where: {
                userId: parseInt(userId),
                postId: parseInt(postId),
            },
        });

        if (liked) {
            checkLiked = true;
        }

        return NextResponse.json({ status: 201, checkLiked });
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
