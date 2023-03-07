import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNote } from './NoteLayout';
import ReactMarkdown from 'react-markdown';
type NoteProps = {
  onDelete: (id: string) => void;
};
export const Note = ({ onDelete }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <div className="w-full ">
      <div className="flex flex-row justify-between items-start">
        <div>
          <h1 className="text-xl font-bold">{note.title}</h1>
          {note.tags.length > 0 ? (
            note.tags.map((t) => (
              <span
                key={t.id}
                className="bg-blue-700 group-hover:bg-blue-500 px-1.5 py-1 text-xs rounded-md font-medium text-white leading-4 tracking-wider shadow-lg mr-2 mb-2"
              >
                {t.label}
              </span>
            ))
          ) : (
            <p className="w-full text-xs text-center text-orange-700">
              No Tag to dispaly
            </p>
          )}
        </div>

        <div className=" flex items-start gap-2">
          <Link to={`/${note.id}/edit`}>
            <button
              type="submit"
              className="bg-orange-700 text-base font-medium text-white px-4 py-2 rounded-md hover:bg-orange-900 shadow-lg "
            >
              Edit
            </button>
          </Link>
          <button
            type="submit"
            onClick={() => {
              onDelete(note.id);
              navigate('/');
            }}
            className="bg-red-700 text-base font-medium text-white px-4 py-2 rounded-md hover:bg-red-900 shadow-lg  "
          >
            Delete
          </button>
          <Link to="/">
            <button
              type="button"
              className="bg-white text-base font-medium text-black border-2 px-4 py-2 rounded-md hover:bg-slate-200 shadow-lg "
            >
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-2 p-4  bg-slate-900 rounded-lg shadow-lg text-white tracking-wide">
        <ReactMarkdown>{note.body}</ReactMarkdown>
      </div>
    </div>
  );
};
