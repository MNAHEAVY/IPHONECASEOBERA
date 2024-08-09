"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop } from "@headlessui/react";
//import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Search() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onClose={setOpen} className='relative z-10'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      {/* <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'
          >
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <ExclamationTriangleIcon
                    aria-hidden='true'
                    className='h-6 w-6 text-red-600'
                  />
                </div>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <DialogTitle
                    as='h3'
                    className='text-base font-semibold leading-6 text-gray-900'
                  >
                    Deactivate account
                  </DialogTitle>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Are you sure you want to deactivate your account? All of your data
                      will be permanently removed. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
              >
                Deactivate
              </button>
              <button
                type='button'
                data-autofocus
                onClick={() => setOpen(false)}
                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div> */}
      <div
        className='fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24'
        id='headlessui-dialog-:r2q:'
        role='dialog'
        tabIndex='-1'
        aria-modal='true'
        data-headlessui-state='open'
        data-open=''
      >
        <div className='fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100'></div>
        <div className='relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100'>
          <div
            className='overflow-hidden rounded-lg bg-white shadow-md'
            id='headlessui-dialog-panel-:r2r:'
            data-headlessui-state='open'
            data-open=''
          >
            <div className='relative'>
              <input
                className='block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6'
                placeholder='Que estas Buscando...'
                aria-label='Search components'
                id='headlessui-combobox-input-:r2t:'
                role='combobox'
                type='text'
                aria-expanded='false'
                aria-autocomplete='list'
                data-headlessui-state='autofocus'
                data-autofocus=''
                value=''
                style={{ caretColor: "rgb(107, 114, 128)" }}
              />
              <svg
                className='pointer-events-none absolute right-4 top-4 h-6 w-6 fill-slate-400'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z'></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
