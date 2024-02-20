import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';

interface Params {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: Number(params.id),
            },
            include: {
                user: { select: { username: true } },
                comments: {
                    where: {
                        postId: Number(params.id),
                    },
                    include: {
                        user: { select: { username: true } },
                    },
                },
            },
        });

        

        if (!post) {
            return NextResponse.json({
                message: 'Note not found',
                status: 404,
            });
        }

        return NextResponse.json(post);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
                status: 500,
            });
        }
    }
}
