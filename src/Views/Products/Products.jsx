import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { setDrawer } from "../../redux/reducers/drawer";
import Loader from "../../Components/Loader/Loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      //       Negro
      // Blanco
      // Gris
      // Rojo
      // Azul
      // Verde
      // Amarillo
      // Naranja
      // Rosa
      // Morado
      // Marrón
      // Beige
      // Dorado
      // Plateado
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "almacenamiento",
    name: "Almacenamiento",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "modelo",
    name: "Modelo",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const prod = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const filteredProducts = prod.filter((product) =>
    product.subCategoria.toLowerCase().includes(query.toLowerCase())
  );

  // Extraer los colores de todos los productos en un solo array plano
  const colors = prod.flatMap((product) => product.color);

  // Extraer el nombre de cada color
  const allColors = colors.map((col) => col.nombre);
  console.log(allColors);

  return (
    <div>
      {/* Mobile filter dialog */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className='relative z-40 lg:hidden'
      >
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
        />

        <div className='fixed inset-0 z-40 flex'>
          <DialogPanel
            transition
            className='relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full'
          >
            <div className='flex items-center justify-between px-4'>
              <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
              <button
                type='button'
                onClick={() => {
                  setMobileFiltersOpen(false);
                  dispatch(setDrawer(true));
                }}
                className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon aria-hidden='true' className='h-6 w-6' />
              </button>
            </div>

            {/* Filters */}
            <form className='mt-4 border-t border-gray-200'>
              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as='div'
                  className='border-t border-gray-200 px-4 py-6'
                >
                  <h3 className='-mx-2 -my-3 flow-root'>
                    <DisclosureButton className='group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                      <span className='font-medium text-gray-900'>{section.name}</span>
                      <span className='ml-6 flex items-center'>
                        <PlusIcon
                          aria-hidden='true'
                          className='h-5 w-5 group-data-[open]:hidden'
                        />
                        <MinusIcon
                          aria-hidden='true'
                          className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className='pt-6'>
                    <div className='space-y-6'>
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className='flex items-center'>
                          <input
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            id={`filter-mobile-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type='checkbox'
                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                          />
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className='ml-3 min-w-0 flex-1 text-gray-500'
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <main className="bg-slate-50 bg-[url('/src/assets/beams-components.png')] mx-auto  px-4 sm:px-6 lg:px-8">
        <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
            {" "}
            Tus Productos: {query}
          </h1>

          <div className='flex items-center'>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <MenuButton className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                  Ordenar
                  <ChevronDownIcon
                    aria-hidden='true'
                    className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
              >
                <div className='py-1'>
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      <a
                        href={option.href}
                        className={classNames(
                          option.current ? "font-medium text-gray-900" : "text-gray-500",
                          "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                        )}
                      >
                        {option.name}
                      </a>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
            <button
              type='button'
              onClick={() => {
                setMobileFiltersOpen(true);
                dispatch(setDrawer(false));
              }}
              className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
            >
              <span className='sr-only'>Filtros</span>
              <FunnelIcon aria-hidden='true' className='h-5 w-5' />
            </button>
          </div>
        </div>

        <section aria-labelledby='products-heading' className='pb-24 pt-6'>
          <h2 id='products-heading' className='sr-only'>
            Productos
          </h2>

          <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
            {/* Filters */}
            <form className='hidden lg:block'>
              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as='div'
                  className='border-b border-gray-200 py-6'
                >
                  <h3 className='-my-3 flow-root'>
                    <DisclosureButton className='group flex w-full items-center justify-between bg-slate-50/[.06] py-3 text-sm text-gray-400 hover:text-gray-500'>
                      <span className='font-medium text-gray-900'>{section.name}</span>
                      <span className='ml-6 flex items-center'>
                        <PlusIcon
                          aria-hidden='true'
                          className='h-5 w-5 group-data-[open]:hidden'
                        />
                        <MinusIcon
                          aria-hidden='true'
                          className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className='pt-6'>
                    <div className='space-y-4'>
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className='flex items-center'>
                          <input
                            defaultValue={option.value}
                            defaultChecked={option.checked}
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type='checkbox'
                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className='ml-3 text-sm text-gray-600'
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>

            {/* Product grid */}
            <div className='lg:col-span-3'>
              <div className='bg-slate-50/[.06]'>
                <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:pt-4 pb-24 lg:max-w-7xl lg:px-8'>
                  <h2 className='sr-only'>Products</h2>
                  <div className='overflow-y-auto max-h-[600px]'>
                    <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 z-1'>
                      {filteredProducts.length === 0 ? (
                        <Loader />
                      ) : (
                        filteredProducts.map((product) => (
                          <a
                            key={product._id}
                            href={"/detail/" + product._id}
                            className='group'
                          >
                            <div className='aspect-h-1 aspect-w-1 w-full ove"rflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                              <img
                                alt={product.nombre}
                                src={product.imagenGeneral[0]}
                                className='h-48 w-full object-cover object-center group-hover:opacity-75'
                              />
                            </div>
                            <h3 className='mt-4 text-sm text-gray-700'>
                              {product.nombre}
                            </h3>
                            <p className='mt-1 text-lg font-medium text-gray-900'>
                              {product.precioBase}
                            </p>
                          </a>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
