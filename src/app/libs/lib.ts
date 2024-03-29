'use server';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('14 days from now')
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });

    return payload;
}

export async function login(formData: FormData) {
    // Verify credentials && get the user

    const url = 'http://localhost:3000/api/auth/login';
    const rawFormData = Object.fromEntries(formData.entries());
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(rawFormData),
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const { user } = await res.json();

    // Create the session
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set('session', session, { expires, httpOnly: true });
    revalidatePath('/');
    redirect(`/`);
}

export async function logout() {
    // Destroy the session
    cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    if (!session) {
        return null;
    }
    if (!getSession()) {
        return null;
    }

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 60 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}
