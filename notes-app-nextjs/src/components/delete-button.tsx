"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type DeleteButtonProps = { id: string };

const deleteNote = async (id: string) =>
  await fetch(`http://localhost:8088/notes/${id}`, {
    method: "delete",
  });

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteNote(id);

      startTransition(() => {
        router.replace("/");
        router.refresh();
      });
    } catch (error) {
      console.warn("Something has error when delete note: ", error);
    }
  };

  return (
    <button
      className="delete-button delete-button--solid"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting note..." : "Delete Note"}
    </button>
  );
};

export default DeleteButton;
