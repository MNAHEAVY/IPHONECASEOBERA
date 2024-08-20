"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
    onClose();
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className='relative z-10'>
      <div
        className='fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100'
        onClick={() => setOpen(false)}
      ></div>

      <div
        className='fixed inset-0 z-50 flex items-start justify-center pt-36 sm:pt-24'
        id='headlessui-dialog-:r2q:'
        role='dialog'
        tabIndex='-1'
        aria-modal='true'
        data-headlessui-state='open'
        data-open=''
      >
        <div
          className='relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100'
          ref={searchRef}
          onClick={(e) => e.stopPropagation()} // Evita cerrar el form al hacer clic dentro de él
        >
          <div
            className='overflow-hidden rounded-lg bg-white shadow-md'
            id='headlessui-dialog-panel-:r2r:'
            data-headlessui-state='open'
            data-open=''
          >
            <form onSubmit={handleSubmit} className='relative w-full max-w-lg'>
              <input
                className='block w-full appearance-none bg-white py-4 pl-4 pr-12 text-base text-gray-900 placeholder-gray-600 focus:outline-none sm:text-sm sm:leading-6 rounded-lg shadow-md'
                placeholder='¿Qué estás buscando?'
                aria-label='Search components'
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* Botón de envío usando el SVG */}
              <button type='submit' className='absolute right-4 top-4'>
                <svg
                  className='h-6 w-6 fill-gray-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <path d='M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z'></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
