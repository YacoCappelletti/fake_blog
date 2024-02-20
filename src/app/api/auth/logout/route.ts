import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        return NextResponse.json({
            status: 201,
            message: 'You Log Out Correctly',
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
