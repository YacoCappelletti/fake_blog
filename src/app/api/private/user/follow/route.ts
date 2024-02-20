import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { followerId, followedId } = await req.json();

        console.log('From follow user route', followerId, followerId);

        const follow = await prisma?.follow.create({
            data: {
                followerId: Number(followerId),
                followedId: Number(followedId),
            },
        });
        return NextResponse.json({ status: 201, follow });
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
