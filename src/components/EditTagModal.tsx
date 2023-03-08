import React from 'react'
import { Tag } from '../App';

type EditTagModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  deleteTag: (id: string) => void;
  updateTag: (id: string, label: string) => void;
};

export const EditTagModal = ({ availableTags, show, handleClose,deleteTag, updateTag }:EditTagModalProps) => {
  return (
    <div >
   {show?
    <div
        id="popup-modal"
        className="fixed top-0 right-0 left-0  z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex flex-col  items-center"
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Edit Tags
              </h3>
              <form>
                {availableTags.map((tag) => (
                  <div className="p-1 flex-1 items-center">
                    <input
                      className="bg-transparent border-[1px] border-slate-400 text-sm px-2 py-1 text-slate-50 rounded-md"
                      type="text"
                      value={tag.label}
                      onChange={e=>updateTag(tag.id, e.target.value)}
                    />
                    <button 
                    type='button'
                    onClick={()=>deleteTag(tag.id)}
                    className="border-[1px] border-red-700 text-base ml-2 px-2 rounded-md text-red-700 hover:bg-slate-900 hover:text-white hover:border-none">
                      &times;
                    </button>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>:null
   }
     
    </div>
  );
};
