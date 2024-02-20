import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';

interface Params {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const element = await prisma.user.findFirst({
            where: {
                id: Number(params.id),
            },
            include: {
                posts: {
                    include: {
                        user: {
                            select: {
                                username: true,
                                comments: true,
                            },
                        },
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

        if (!element) {
            return NextResponse.json({
                message: 'Note not found',
                status: 404,
            });
        }

        return NextResponse.json(element);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
                status: 500,
            });
        }
    }
}
