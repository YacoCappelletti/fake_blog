import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';
import Post from '@/app/components/Post';

interface Params {
    params: { q: string };
}

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const results = await prisma.post.findMany({
            where: {
                OR: [
                    { title: { contains: params.q } },
                    { body: { contains: params.q } },
                ],
            },
        });

        if (!results) {
            return NextResponse.json({
                message: 'Note not found',
                status: 404,
            });
        }

        return NextResponse.json(results);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
                status: 500,
            });
        }
    }
}
