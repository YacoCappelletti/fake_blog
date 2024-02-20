import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';
import { hash } from 'bcrypt';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { username, email, password } = await req.json();

        const newUser = await prisma.user.create({
            data: { username, email, password: await hash(password, 12) },
        });
        return NextResponse.json({ status: 201, newUser });
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
