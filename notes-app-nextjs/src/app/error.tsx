/* eslint-disable @next/next/no-img-element */
"use client";

import EditButton from "@/components/edit-button";
import NoteListSkeleton from "@/components/note-list-skeleton";
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
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
          <NoteListSkeleton />
        </nav>
      </section>

      <section className="col">
        <div className="note-viewer">
          <div className="note--empty-state">
            <span className="note-text--empty-state">{error.message}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
