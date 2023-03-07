import React, { FormEvent, useRef, useState } from 'react';
import CreatableReactSelect from 'react-select/creatable';
import { Link, useNavigate } from 'react-router-dom';
import { NoteData, Tag } from '../App';
import { v4 as uuidv4 } from 'uuid';
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
 
}& Partial<NoteData>

export const NoteForm = ({ onSubmit, onAddTag, availableTags ,title, body, tags}: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTag, setSelectedTag] = useState<Tag[]>([]);

  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      body: bodyRef.current!.value, // ! mean it can't be null some how it has a value
      tags: selectedTag,
    });
    navigate("..")
  };
  return (
    <div className="mt-2 p-4  bg-slate-900 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
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
              placeholder="Enter Title"
              ref={titleRef}
              defaultValue={title}
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tags
            </label>
            <CreatableReactSelect
              id="tags"
              className="min-w-[200px]  text-sm rounded-md"
              isMulti
              onCreateOption={(label) => {
                const newTag = { id: uuidv4(), label };
                onAddTag(newTag);
                setSelectedTag((prev) => [...prev, newTag]);
              }}
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
        <div>
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Body
          </label>
          <textarea
            ref={bodyRef}
            defaultValue={body}
            rows={10}
            required
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm font-medium rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2  "
          />
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-700 text-base font-semibold text-white px-4 py-1 rounded-md hover:bg-blue-800 shadow-lg "
          >
            Save
          </button>
          <Link to="..">
            <button
              type="button"
              className="bg-red-700 text-base font-semibold text-white px-4 py-1 rounded-md hover:bg-red-800 shadow-lg"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
