import { format } from "date-fns";
import { Note } from "@/types/note";
import NotePreview from "@/components/note-preview";
import DeleteButton from "@/components/delete-button";
import EditButton from "@/components/edit-button";

const fetchSingleNote = async (id: string) => {
  const res = await fetch(`http://localhost:8088/notes/${id}`, {
    cache: "no-store",
  });
  // throw new Error(`note with id ${id} is not found`);

  const note = (await res.json()) as Note;
  return note;
};

const NotePage = async ({ params: { id } }: any) => {
  const { id: noteId, title, body, updatedAt } = await fetchSingleNote(id);

  const updatedAtDate = new Date(updatedAt);

  return (
    <div className="note-viewer">
      <div className="note">
        <div className="note-header">
          <div className="note-menu" role="menubar">
            <small className="note-updated-at" role="status">
              Last updated on {format(updatedAtDate, "M/d/yy 'at' h:mm bb")}
            </small>
            <div>
              <EditButton noteId={id}>Edit</EditButton>
              <DeleteButton id={noteId} />
            </div>
          </div>
          <h1 className="note-title">{title}</h1>
        </div>
        <NotePreview body={body} />
      </div>
    </div>
  );
};

export default NotePage;
