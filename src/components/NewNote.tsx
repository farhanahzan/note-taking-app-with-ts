import React from 'react'
import { NoteData, Tag } from '../App'
import { NoteForm } from './NoteForm'

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag:Tag) => void;
  availableTags:Tag[]
};

export const NewNote = ({onSubmit, onAddTag, availableTags }:NewNoteProps) => {
  return (
    <div className='w-full'>
        <h1 className='text-2xl font-bold'>New Note</h1>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </div>
  )
}
