import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Script from 'next/script';
import { SessionProvider } from './components/SessionContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Fake Blog',
    description: 'Made by Yaco Cappelletti',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider>
                    <Navbar />
                    <main className=" flex min-h-screen flex-col items-center justify-between w-full overflow-auto my-4">
                        {children}
                    </main>
                    <Footer />
                </SessionProvider>
            </body>
        </html>
    );
}
