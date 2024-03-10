import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';

interface Params {
    params: { page: string };
}

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const posts = await prisma?.post.findMany({
            skip: params.page ? Number(params.page) * 4 : 0,
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
