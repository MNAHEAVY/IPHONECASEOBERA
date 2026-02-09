"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose} className='relative z-50'>
      {/* Backdrop */}
      <div className='fixed inset-0 bg-slate-900/25 backdrop-blur' />

      {/* Modal */}
      <div className='fixed inset-0 flex items-start justify-center pt-24 sm:pt-36'>
        <Dialog.Panel className='w-full max-w-lg px-4'>
          <div className='overflow-hidden rounded-lg bg-white shadow-md'>
            <form onSubmit={handleSubmit} className='relative'>
              <input
                className='block w-full bg-white py-4 pl-4 pr-12 text-base text-gray-900 placeholder-gray-600 focus:outline-none rounded-lg'
                placeholder='¿Qué estás buscando?'
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />

              <button type='submit' className='absolute right-4 top-4'>
                <svg
                  className='h-6 w-6 fill-gray-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <path d='M21.53 20.47a.75.75 0 0 1-1.06 1.06l-5.197-5.197a8.25 8.25 0 1 1 1.06-1.06l5.197 5.197ZM10.5 17.25a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5Z' />
                </svg>
              </button>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
