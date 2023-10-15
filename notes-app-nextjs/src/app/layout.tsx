/* eslint-disable @next/next/no-img-element */
import EditButton from '@/components/edit-button';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Suspense } from 'react';
import NoteListSkeleton from '@/components/note-list-skeleton';
import NoteList from '@/components/note-list';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notes App',
  description: 'A notes app using Next.js 13',
  icons: '/favicon.ico',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main">
          <section className="col sidebar">
            <section className="sidebar-header">
              <img
                className="logo"
                src="/icons/svg/logo.svg"
                width="22px"
                height="20px"
                alt=""
                role="presentation"
              />
              <Link href="/" className="link">
                <strong>Notes App</strong>
              </Link>
            </section>
            <section className="sidebar-menu" role="menubar">
              <EditButton>Create Note</EditButton>
            </section>
            <nav>
              <Suspense fallback={<NoteListSkeleton />}>
                <NoteList />
              </Suspense>
            </nav>
          </section>

          <section className="col">{children}</section>
        </div>
      </body>
    </html>
  );
}
