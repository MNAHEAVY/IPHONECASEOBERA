import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ClockIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import earpods from "../../assets/device-earphone-headphone-2-svgrepo-com.svg";
import ckkke from "../../assets/case-outlineca-red-svgrepo-com.svg";

const EarpodsIcon = () => (
  <img
    src={earpods}
    alt='Earpods'
    className='h-6 w-6 text-gray-600 group-hover:text-indigo-600'
  />
);
const CaseIcon = () => (
  <img
    src={ckkke}
    alt='Earpods'
    className='h-6 w-6 text-gray-600 group-hover:text-indigo-600'
  />
);

const solutions = [
  {
    name: "iPhone",
    description: "Te acercamos el Iphone que deseas",
    href: "/products?query=iPhone",
    icon: DevicePhoneMobileIcon,
  },
  {
    name: "AirPods",
    description: "Música en tus oídos, libertad en tus manos",
    href: "/products?query=Airpods",
    icon: EarpodsIcon,
  },
  {
    name: "Watch",
    description: "El compañero perfecto para una vida activa",
    href: "/products?query=Watch",
    icon: ClockIcon,
  },
  {
    name: "Accesorios",
    description: "El compañero perfecto para una vida activa",
    href: "/products?query=Accesorios",
    icon: CaseIcon,
  },
];

export default function ProductsMenu() {
  return (
    <Popover className='relative'>
      <PopoverButton className='inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900'>
        <span>Productos</span>
        <ChevronDownIcon aria-hidden='true' className='h-5 w-5' />
      </PopoverButton>

      <PopoverPanel
        transition
        className='absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
      >
        <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
          <div className='p-4'>
            {solutions.map((item) => (
              <div
                key={item.name}
                className='group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50'
              >
                <div className='mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
                  <item.icon
                    aria-hidden='true'
                    className='h-6 w-6 text-gray-600 group-hover:text-indigo-600'
                  />
                </div>
                <div>
                  <a href={item.href} className='font-semibold text-gray-900'>
                    {item.name}
                    <span className='absolute inset-0' />
                  </a>
                  <p className='mt-1 text-gray-600'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
