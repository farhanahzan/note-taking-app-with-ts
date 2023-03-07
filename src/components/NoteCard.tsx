import React from 'react'
import { Link } from 'react-router-dom'
import { Tag } from '../App'

type NoteCardProps ={
    id:string
    title:string
    tag:Tag[]
}

const NoteCard = ({id, title, tag}:NoteCardProps) => {
  return (
    <Link to={`/${id}`}>
      <div className="group transition-all ease-in-out delay-75 duration-700 bg-gradient-to-br from-slate-500 to-slate-600 text-white  hover:-translate-y-1 px-2 py-2 rounded-md w-[170px] text-center min-h-[70px] shadow-lg hover:shadow-2xl">
        <h2 className="text-sm font-light tracking-wide capitalize leading-3 pb-1.5 truncate group-hover:text-clip">
          {title}
        </h2>

        <div className="flex justify-center gap-1 py-2 border-t-[1px] border-gray-700">
          {tag.length > 0 ? (
            tag.map((t) => (
              <span key={t.id} className="bg-blue-700 group-hover:bg-blue-500 px-1.5 py-1 text-xs rounded-md font-medium text-white leading-4 tracking-wider shadow-lg">
                {t.label}
              </span>
            ))
          ) : (
            <p className="w-full text-xs text-center text-orange-700">
              No Tag to dispaly
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default NoteCard