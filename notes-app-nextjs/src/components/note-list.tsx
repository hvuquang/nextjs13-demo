import { Note } from "@/types/note";
import SidebarNote from "./sidebar-note";

type NoteListProps = {
  notes: Note[];
};

const NoteList = ({ notes }: NoteListProps) => {
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
      ) : null}
    </>
  );
};

export default NoteList;
