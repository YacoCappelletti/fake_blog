import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';

interface Params {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
    try {
        const element = await prisma?.post.findFirst({
            where: {
                id: Number(params.id),
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

export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const { image, date, heading, content, likes, user_profile_id } =
            await req.json();

        const updatedElement = await prisma.post.update({
            where: {
                id: Number(params.id),
            },
            data: {
                image,
                date,
                heading,
                content,
                likes,
                user_profile_id,
            },
        });

        return NextResponse.json(updatedElement);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
                status: 500,
            });
        } else {
            return NextResponse.json({
                message: 'Unknown error',
                status: 500,
            });
        }
    }
}

export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        const elementToDelete = await prisma.post.delete({
            where: {
                id: Number(params.id),
            },
        });

        return NextResponse.json(elementToDelete);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
                status: 500,
            });
        } else {
            return NextResponse.json({
                message: 'Unknown error',
                status: 500,
            });
        }
    }
}
