import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { userId, postId } = await req.json();
        const like = await prisma.likedPost.create({
            data: { userId, postId },
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


