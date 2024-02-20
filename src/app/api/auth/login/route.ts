import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma';
import { compare } from 'bcrypt';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, password } = await req.json();
        //console.log('From Login:', email, ' ', password);

        if (!email || !password) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
                username: true,
                password: true,
            },
        });

        if (!user) {
            return null;
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        return NextResponse.json({
            status: 201,
            user: { id: user.id, username: user.username },
        });
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
