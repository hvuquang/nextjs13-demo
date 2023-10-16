/* eslint-disable @next/next/no-img-element */
import EditButton from '@/components/edit-button';
import NoteList from "@/components/note-list";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Note } from "@/types/note";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes App",
  description: "A notes app using Next.js 13",
  icons: "/favicon.ico",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

const fetchAllNotes = async () => {
  const res = await fetch("http://localhost:8088/notes?_sort=updatedAt&_order=desc", {
    cache: "no-cache",
    // next: {
    //   revalidate: 20,
    // },
  });

  const notes = (await res.json()) as Note[];

  return notes;
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const notes = await fetchAllNotes();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main">
          <section className="col sidebar">
            <section className="sidebar-header">
              {/* <Image
                className="logo"
                src="https://plus.unsplash.com/premium_photo-1669689971484-171a3db9844b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                width={22}
                height={22}
                alt=""
                role="presentation"
              /> */}
              <Image
                className="logo"
                src="/icons/svg/logo.svg"
                width={22}
                height={20}
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
              <NoteList notes={notes} />
            </nav>
          </section>

          <section className="col">{children}</section>
        </div>
      </body>
    </html>
  );
}
