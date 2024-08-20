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
  { name: "Mas Populares", href: "#", current: true },
  { name: "Mejor Rankeados", href: "#", current: false },
  { name: "Nuevos", href: "#", current: false },
  { name: "Precio: Menor a Mayor", href: "#", current: false },
  { name: "Precio: Mayor a Menor", href: "#", current: false },
];

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "negro", label: "Negro", checked: false },
      { value: "blanco", label: "Blanco", checked: false },
      { value: "gris", label: "Gris", checked: false },
      { value: "rojo", label: "Rojo", checked: false },
      { value: "azul", label: "Azul", checked: false },
      { value: "verde", label: "Verde", checked: false },
      { value: "amarillo", label: "Amarillo", checked: false },
      { value: "naranja", label: "Naranja", checked: false },
      { value: "rosa", label: "Rosa", checked: false },
      { value: "morado", label: "Morado", checked: false },
      { value: "marron", label: "Marrón", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "dorado", label: "Dorado", checked: false },
      { value: "plateado", label: "Plateado", checked: false },
    ],
  },
  {
    id: "almacenamiento",
    name: "Almacenamiento",
    options: [
      { value: "64gb", label: "64 GB", checked: false },
      { value: "128gb", label: "128 GB", checked: false },
      { value: "256gb", label: "256 GB", checked: false },
      { value: "512gb", label: "512 GB", checked: false },
      { value: "1tb", label: "1 TB", checked: false },
    ],
  },
  {
    id: "modelo",
    name: "Modelo",
    options: [
      { value: "iphone11", label: "iPhone 11", checked: false },
      { value: "iphone11pro", label: "iPhone 11 Pro", checked: false },
      { value: "iphone11promax", label: "iPhone 11 Pro Max", checked: false },
      { value: "iphone12", label: "iPhone 12", checked: false },
      { value: "iphone12mini", label: "iPhone 12 Mini", checked: false },
      { value: "iphone12pro", label: "iPhone 12 Pro", checked: false },
      { value: "iphone12promax", label: "iPhone 12 Pro Max", checked: false },
      { value: "iphone13", label: "iPhone 13", checked: false },
      { value: "iphone13mini", label: "iPhone 13 Mini", checked: false },
      { value: "iphone13pro", label: "iPhone 13 Pro", checked: false },
      { value: "iphone13promax", label: "iPhone 13 Pro Max", checked: false },
      { value: "iphone14", label: "iPhone 14", checked: false },
      { value: "iphone14plus", label: "iPhone 14 Plus", checked: false },
      { value: "iphone14pro", label: "iPhone 14 Pro", checked: false },
      { value: "iphone14promax", label: "iPhone 14 Pro Max", checked: false },
      { value: "iphone15", label: "iPhone 15", checked: false },
      { value: "iphone15plus", label: "iPhone 15 Plus", checked: false },
      { value: "iphone15pro", label: "iPhone 15 Pro", checked: false },
      { value: "iphone15promax", label: "iPhone 15 Pro Max", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Searched() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const prod = useSelector((state) => state.products.products);
  const values = useSelector((state) => state.values.values);
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState({
    color: [],
    almacenamiento: [],
    modelo: [],
  });

  const handleFilterChange = (filterCategory, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterCategory]: prev[filterCategory].includes(value)
        ? prev[filterCategory].filter((item) => item !== value)
        : [...prev[filterCategory], value],
    }));
  };

  const filteredProducts = prod.filter((product) => {
    const matchesQuery = product.nombre.toLowerCase().includes(query.toLowerCase());
    const matchesColor = selectedFilters.color.length
      ? product.color.some((c) => selectedFilters.color.includes(c.nombre))
      : true;
    const matchesStorage = selectedFilters.almacenamiento.length
      ? selectedFilters.almacenamiento.includes(product.almacenamiento)
      : true;
    const matchesModel = selectedFilters.modelo.length
      ? selectedFilters.modelo.includes(product.modelo)
      : true;
    return matchesQuery && matchesColor && matchesStorage && matchesModel;
  });

  const availableFilters = filters
    .map((section) => {
      if (
        section.id === "almacenamiento" &&
        !filteredProducts.some((product) => product.almacenamiento.length > 0)
      ) {
        return null;
      }
      if (
        section.id === "modelo" &&
        !filteredProducts.some((product) => product.modelo.length > 0)
      ) {
        return null;
      }
      return section;
    })
    .filter(Boolean);

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
              {availableFilters.map((section) => (
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
            Tus Busqueda: {query}
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
              {availableFilters.map((section) => (
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
                            onChange={() => handleFilterChange(section.id, option.value)}
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
                        <p>No existe productos con esa busqueda</p>
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
                            <p>
                              $
                              {Math.round(
                                product.precioBase *
                                  values.dolarBlue *
                                  values.profit *
                                  values.mp
                              ).toLocaleString("es-AR", { useGrouping: true })}
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
