import { useState, useMemo } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import { NewNote } from './components/NewNote';
import { useLocalStorage } from './hooks/useLocalStorage';
import {v4 as uuidv4} from 'uuid'
import { NoteList } from './components/NoteList';
import { NoteLayout } from './components/NoteLayout';
import { Note } from './components/Note';
import { EditNote } from './components/EditNote';

export type Note ={
  id:string
} & NoteData

export type RawNote ={
  id:string
} & RawNoteData


export type RawNoteData= {
  title:string
  body:string
  tagsIds:String[]
}
export type NoteData= {
  title:string
  body:string
  tags:Tag[]
}
export type Tag={
  id:string
  label:string
}


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES",[])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS",[])

  const noteWithTags = useMemo(()=>{
    return notes.map((note=>{
      return {...note, tags: tags.filter(tag=>note.tagsIds.includes(tag.id))}
    }))
  },[notes, tags])

  function onCreateNote({tags, ...data}:NoteData){
    setNotes(prevNotes=>{
      return [...prevNotes, {...data, id:uuidv4(), tagsIds: tags.map(tag=>tag.id)}]
    })
  }
  function addTag(tag: Tag){
    setTags((prev) => [...prev, tag]);
  }

  function updateTag(id:string,label:string){
    setTags(prevTags=>{
      return prevTags.map(tag=>{
        if(id === tag.id){
          return {...tag, label}
        }else{
          return tag
        }
      })
    })
  }
  function deleteTag(id:string){
    setTags(prevTags=>{
      return prevTags.filter(tag=>tag.id !== id) 
      })
  }

  function onUpdateNote(id:string, {tags, ...data}:NoteData){
    setNotes(prevNotes=>{
      return prevNotes.map(note=>{
        if(note.id === id){
          return{...note, ...data, tagsIds:tags.map(tag=>tag.id)}
        }else{
          return note
        }
      })
    })
  }
  function onDeleteNote(id:string){
    setNotes(prevNotes=>{
      return prevNotes.filter(note=> note.id !== id)
    })
  }
  return (
    <div className=" p-4 h-screen m-auto  w-[600px] font-tilt">
      <Routes>
        <Route
          path="/"
          element={<NoteList availableTags={tags} notes={noteWithTags} deleteTag={deleteTag} updateTag={updateTag} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={noteWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
  }

export default App;
