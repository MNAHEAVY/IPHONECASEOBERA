import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { logout } from "../../redux/reducers/authSlice";
import { PowerIcon, UserIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";

const solutions = [
  {
    name: "Editar Datos",
    description: "Corrije los datos de tu cuenta",
    href: "/user/:id",
    icon: UserIcon,
  },

  {
    name: "Cerrar sesion",
    description: "Hasta pronto!",
    icon: PowerIcon,
    action: "logout",
  },
];

export default function userMenu() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    window.location.href = "/"; // Redirect to the homepage
  };
  return (
    <Popover className='relative'>
      <PopoverButton className='inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900'>
        <UserIcon className='h-6 w-6  hover:fill-blue-500 hover:scale-110' />
      </PopoverButton>

      <PopoverPanel
        transition
        className='absolute right-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/5 px-4 transition data-[closed]:translate-y-0 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in'
      >
        <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
          <div className='p-4'>
            {solutions.map((item) => (
              <div
                key={item.name}
                className='group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50'
                onClick={item.action === "logout" ? handleLogout : null} // Attach the click event for logout
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
