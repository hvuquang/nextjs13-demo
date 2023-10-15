import { Note } from "@/types/note";
import NoteEditor from "@/components/note-editor";

const fetchSingleNote = async (id: string) => {
  const res = await fetch(`http://localhost:8088/notes/${id}`, {
    cache: "no-store",
  });

  const note = (await res.json()) as Note;

  return note;
};

const EditNotePage = async ({ params: { id } }: any) => {
  const { id: noteId, title, body, createdAt } = await fetchSingleNote(id);

  return (
    <NoteEditor noteId={noteId} initialBody={body} initialTitle={title} createdAt={createdAt} />
  );
};

export default EditNotePage;
