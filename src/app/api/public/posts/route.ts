import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const posts = await prisma?.post.findMany({
            //skip: ,
            take: 4,
            include: {
                comments: true,
                user: true,
            },
        });

        return NextResponse.json({ status: 200, posts });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message });
        } else {
            return NextResponse.json({ message: 'Unknown Error' });
        }
    }
}
