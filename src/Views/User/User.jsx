import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function User() {
  return (
    <div className='relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0'>
      {/* <ToastContainer /> */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <svg
          aria-hidden='true'
          className='absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]'
        >
          <defs>
            <pattern
              x='50%'
              y={-1}
              id='e813992c-7d03-4cc4-a2bd-151760b470a0'
              width={200}
              height={200}
              patternUnits='userSpaceOnUse'
            >
              <path d='M100 200V.5M.5 .5H200' fill='none' />
            </pattern>
          </defs>
          <svg x='50%' y={-1} className='overflow-visible fill-gray-50'>
            <path
              d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z'
              strokeWidth={0}
            />
          </svg>
          <rect
            fill='url(#e813992c-7d03-4cc4-a2bd-151760b470a0)'
            width='100%'
            height='100%'
            strokeWidth={0}
          />
        </svg>
      </div>
      <form className='px-24'>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Personal Information
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Use a permanent address where you can receive mail.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  First name
                </label>
                <div className='mt-2'>
                  <input
                    id='first-name'
                    name='first-name'
                    type='text'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Last name
                </label>
                <div className='mt-2'>
                  <input
                    id='last-name'
                    name='last-name'
                    type='text'
                    autoComplete='family-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Country
                </label>
                <div className='mt-2'>
                  <select
                    id='country'
                    name='country'
                    autoComplete='country-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='street-address'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Street address
                </label>
                <div className='mt-2'>
                  <input
                    id='street-address'
                    name='street-address'
                    type='text'
                    autoComplete='street-address'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2 sm:col-start-1'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  City
                </label>
                <div className='mt-2'>
                  <input
                    id='city'
                    name='city'
                    type='text'
                    autoComplete='address-level2'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='region'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  State / Province
                </label>
                <div className='mt-2'>
                  <input
                    id='region'
                    name='region'
                    type='text'
                    autoComplete='address-level1'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='postal-code'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  ZIP / Postal code
                </label>
                <div className='mt-2'>
                  <input
                    id='postal-code'
                    name='postal-code'
                    type='text'
                    autoComplete='postal-code'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Notifications
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              We'll always let you know about important changes, but you pick what else
              you want to hear about.
            </p>

            <div className='mt-10 space-y-10'>
              <fieldset>
                <legend className='text-sm font-semibold leading-6 text-gray-900'>
                  By Email
                </legend>
                <div className='mt-6 space-y-6'>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='comments'
                        name='comments'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                    </div>
                    <div className='text-sm leading-6'>
                      <label htmlFor='comments' className='font-medium text-gray-900'>
                        Comments
                      </label>
                      <p className='text-gray-500'>
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='candidates'
                        name='candidates'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                    </div>
                    <div className='text-sm leading-6'>
                      <label htmlFor='candidates' className='font-medium text-gray-900'>
                        Candidates
                      </label>
                      <p className='text-gray-500'>
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className='relative flex gap-x-3'>
                    <div className='flex h-6 items-center'>
                      <input
                        id='offers'
                        name='offers'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                      />
                    </div>
                    <div className='text-sm leading-6'>
                      <label htmlFor='offers' className='font-medium text-gray-900'>
                        Offers
                      </label>
                      <p className='text-gray-500'>
                        Get notified when a candidate accepts or rejects an offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className='text-sm font-semibold leading-6 text-gray-900'>
                  Push Notifications
                </legend>
                <p className='mt-1 text-sm leading-6 text-gray-600'>
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className='mt-6 space-y-6'>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='push-everything'
                      name='push-notifications'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                    <label
                      htmlFor='push-everything'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Everything
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='push-email'
                      name='push-notifications'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                    <label
                      htmlFor='push-email'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Same as email
                    </label>
                  </div>
                  <div className='flex items-center gap-x-3'>
                    <input
                      id='push-nothing'
                      name='push-notifications'
                      type='radio'
                      className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                    />
                    <label
                      htmlFor='push-nothing'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button type='button' className='text-sm font-semibold leading-6 text-gray-900'>
            Cancel
          </button>
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
