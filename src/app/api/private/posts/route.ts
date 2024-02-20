import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const posts = await prisma?.post.findMany();
        return NextResponse.json({ status: 200, posts });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message });
        } else {
            return NextResponse.json({ message: 'Unknown Error' });
        }
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { image, date, heading, content, likes, user_profile_id } =
            await req.json();
        const newElement = await prisma.post.create({
            data: { image, date, heading, content, likes, user_profile_id },
        });
        return NextResponse.json({ status: 201, newElement });
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
