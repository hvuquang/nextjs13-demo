/* eslint-disable @next/next/no-img-element */
"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Note } from "types/note";
import { useRouter } from "next/navigation";
import { tinykeys } from "tinykeys";

import NotePreview from "./note-preview";
import { revalidatePath } from "next/cache";

const BASE_API_URI = "http://localhost:8088";

type NoteEditorProps = {
  createdAt?: number;
  noteId?: string;
  initialTitle?: string;
  initialBody?: string;
};

export default function NoteEditor({
  createdAt,
  noteId,
  initialTitle = "",
  initialBody = "",
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [isSaving, saveNote] = useMutation({
    endpoint: noteId != null ? `${BASE_API_URI}/notes/${noteId}` : `${BASE_API_URI}/notes`,
    method: noteId != null ? "PUT" : "POST",
  });

  const router = useRouter();

  const isTitleOrBodyEmpty = !title || !body;

  const handleSave = useCallback(async () => {
    if (isTitleOrBodyEmpty || isSaving) return;

    const payload = {
      id: noteId ?? nanoid(),
      title,
      body,
      createdAt: createdAt ?? new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    const response = await saveNote(payload);

    if (response?.ok) {
      if (payload.id === noteId) {
        revalidatePath("/note/" + noteId);
      }

      startTransition(() => {
        router.replace("/note/" + payload.id);
        router.refresh();
      });
    }
  }, [body, createdAt, isSaving, isTitleOrBodyEmpty, noteId, router, saveNote, title]);

  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      "$mod+KeyS": (event) => {
        event.preventDefault();
        handleSave();
      },
    });

    return unsubscribe;
  }, [handleSave]);

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          id="note-body-input"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </form>
      <div className="note-editor-preview">
        <div className="note-editor-menu" role="menubar">
          <button
            className="note-editor-done"
            disabled={Boolean(isSaving) || isTitleOrBodyEmpty}
            onClick={handleSave}
            role="menuitem"
          >
            <img
              src="/icons/svg/checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview body={body} />
      </div>
    </div>
  );
}

function useMutation({
  endpoint,
  method,
}: {
  endpoint: string;
  method: string;
}): [boolean, (payload: Note) => Promise<Response | undefined>] {
  const [isSaving, setIsSaving] = useState(false);
  const [didError, setDidError] = useState(false);
  const [error, setError] = useState(null);
  if (didError) {
    throw error;
  }

  async function performMutation(payload: Note) {
    setIsSaving(true);
    try {
      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response;
    } catch (e: any) {
      setDidError(true);
      setError(e);
    } finally {
      setIsSaving(false);
    }
  }

  return [isSaving, performMutation];
}
