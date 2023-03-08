import React,{useState, useMemo} from 'react';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Note, Tag } from '../App';
import { EditTagModal } from './EditTagModal';
import NoteCard from './NoteCard';

type NoteListProps = {
  availableTags:Tag[]
  notes:Note[]
  deleteTag:(id:string)=>void
  updateTag:(id:string, label:string)=>void
};

export const NoteList = ({availableTags, notes, deleteTag, updateTag}:NoteListProps) => {
  const [selectedTag, setSelectedTag] = useState<Tag[]>([]);
  const [title, setTitle] = useState("")
  const [editTagModalIsOpen, setEditTagModalIsOpen] = useState(false)

  const handleClose=()=>{
    setEditTagModalIsOpen(prev=>false)
  }
  const filteredNotes =useMemo(()=>{
    return notes.filter(note=>{
      return (
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTag.length === 0 ||
          selectedTag.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    })
  },[title, selectedTag, notes])
  return (
    <>
      <div className="w-full ">
        <div className="flex flex-row justify-between items-start">
          <h1 className="text-2xl font-bold">Notes</h1>
          <div className="flex gap-2 ">
            <Link to={`/new`}>
              <button
                type="button"
                className="bg-green-700 text-base font-medium text-white px-4 py-1 rounded-md hover:bg-green-900 shadow-lg "
              >
                Create
              </button>
            </Link>
            <button
              type="button"
              onClick={()=>setEditTagModalIsOpen(true)}
              className="bg-orange-700 text-base font-medium text-white px-4 py-1 rounded-md hover:bg-orange-900 shadow-lg "
            >
              Edit Tags
            </button>
          </div>
        </div>
        <div className="mt-2 p-4  bg-slate-900 rounded-lg shadow-lg">
          <form>
            <div className="flex flex-row gap-10 mb-4">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-48 p-2  "
                  required
                  placeholder="Search Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tags
                </label>
                <ReactSelect
                  id="tags"
                  className="min-w-[200px] w-full text-sm rounded-md"
                  isMulti
                  options={availableTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  value={selectedTag.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={(tags) => {
                    setSelectedTag(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                />
              </div>
            </div>
          </form>
          <div className="flex flex-wrap gap-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                tag={note.tags}
              />
            ))}
          </div>
        </div>
      </div>
      <EditTagModal show={editTagModalIsOpen} handleClose={handleClose} availableTags={availableTags} deleteTag={deleteTag} updateTag={updateTag} />
    </>
  );
};

