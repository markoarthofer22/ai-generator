import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
interface IRootLayoutProps {
    children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Genius',
    description: 'AI Platform created using nextJS',
};

const RootLayout = ({ children }: IRootLayoutProps) => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
};

export default RootLayout;
