import { NextRequest, NextResponse } from 'next/server';
import { updateSession, getSession } from '@/app/libs/lib';

export async function middleware(request: NextRequest) {
    const currentUser = await getSession();

    if (!currentUser && request.nextUrl.pathname.startsWith('/user')) {
        return Response.redirect(new URL('/auth/login', request.url));
    }

    return await updateSession(request);
}
export const config = {
    matcher: '/user/:path*',
};
