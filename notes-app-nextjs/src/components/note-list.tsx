import { Note } from "types/note";
import SidebarNote from "./sidebar-note";

type NoteListProps = {
  searchText?: string;
};

const fetchAllNotes = async () => {
  const res = await fetch("http://localhost:8088/notes?_sort=updatedAt&_order=desc", {
    cache: "no-store",
    // next:{
    //   revalidate: 20
    // }
  });

  const notes = (await res.json()) as Note[];

  return notes;
};

const NoteList = async ({ searchText }: NoteListProps) => {
  const notes = await fetchAllNotes();

  return (
    <>
      {notes.length > 0 ? (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id}>
              <SidebarNote note={note} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="notes-empty">
          {searchText ? `Couldn't find any notes titled "${searchText}".` : "No notes created yet!"}{" "}
        </div>
      )}
    </>
  );
};

export default NoteList;
