import React from 'react';
import { NoteData, Tag } from '../App';
import { NoteForm } from './NoteForm';
import { useNote } from './NoteLayout';

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export const EditNote = ({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps) => {
  const note = useNote();
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Edit Note</h1>
      <NoteForm
      title={note.title}
      body={note.body}
      tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};
