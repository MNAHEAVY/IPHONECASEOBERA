"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import ProductsMenu from "./Fly-menu-products";
import UsersMenu from "./Fly-menu-user";
import Search from "../Search/Search";
import Login from "../Login/Login";
import CartFav from "../../Views/Cart&Fav/Cart&Fav";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Fundas", href: "/products?query=Fundas" },
  { name: "Glass", href: "/products?query=Glass" },
  { name: "Energia/Cables", href: "/products?query=Energia y Cables" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [showCartFav, setShowCartFav] = useState(null); // null, "cart", or "favs"
  const drawer = useSelector((state) => state.drawer.drawer);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); // Redirige al usuario a la página principal o a donde quieras
    }
    setToken(localStorage.getItem("token"));
  }, [navigate]);

  const handleCartClick = () => {
    setShowCartFav("cart");
  };

  const handleFavsClick = () => {
    setShowCartFav("favs");
  };
  const handleClose = () => {
    setShowCartFav(null);
  };
  return (
    <header className='absolute inset-x-0 z-50'>
      <nav aria-label='Global' className='flex items-center justify-between p-6 lg:px-8'>
        <div className='flex lg:flex-1'>
          <a href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>IPHONECASEOBERA</span>
            <img alt='' src={logo} className='h-8 w-auto' />
          </a>
        </div>
        <div className='flex lg:hidden'>
          {drawer ? (
            <button
              type='button'
              onClick={() => setMobileMenuOpen(true)}
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            >
              <span className='sr-only'>Abrir menu</span>
              <Bars3Icon
                aria-hidden='true'
                className={`${showCartFav === null ? "" : "hidden"} h-6 w-6`}
              />
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          <ProductsMenu />
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              {item.name}
            </a>
          ))}
          {/* Botón que abre el buscador */}
          <button onClick={() => setSearchOpen(true)} className='text-gray-900'>
            <svg
              className={`${showCartFav === null ? "" : "hidden"} h-6 w-6 fill-gray-900`}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z'></path>
            </svg>
          </button>
          {/* Fin del botón */}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          {token && token !== "undefined" && token.trim() !== "" ? (
            <div className='flex gap-3'>
              <HeartIcon
                onClick={handleFavsClick}
                onClose={handleClose}
                className={`${
                  showCartFav === null ? "" : "hidden"
                } h-6 w-6 hover:fill-red-500 hover:scale-110`}
              />

              <ShoppingCartIcon
                onClick={handleCartClick}
                onClose={handleClose}
                className={`${
                  showCartFav === null ? "" : "hidden"
                } h-6 w-6 hover:fill-green-500 hover:scale-110`}
              />
              {showCartFav === null ? <UsersMenu /> : <></>}
            </div>
          ) : (
            <button
              className='text-sm font-semibold leading-6 text-gray-900'
              onClick={() => setLoginOpen(true)}
            >
              Iniciar sesion <span aria-hidden='true'>&rarr;</span>
            </button>
          )}
        </div>
      </nav>
      {showCartFav && <CartFav type={showCartFav} onClose={handleClose} />}
      {/* Componente de búsqueda */}
      {searchOpen && <Search onClose={() => setSearchOpen(false)} />}
      {/* Fin del componente de búsqueda */}
      {/* Componente de búsqueda */}
      {loginOpen && <Login onClose={() => setLoginOpen(false)} />}
      {/* Fin del componente de búsqueda */}

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className='lg:hidden'>
        <div className='fixed inset-0 z-50' />
        <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <a href='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>IPHONECASEOBERA</span>
              <img alt='' src={logo} className='h-8 w-auto' />
            </a>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(false)}
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon aria-hidden='true' className='h-6 w-6' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                <ProductsMenu />
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                  >
                    {item.name}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className='text-gray-900'
                >
                  <svg
                    className=' h-6 w-6 fill-gray-900'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z'></path>
                  </svg>
                </button>
              </div>

              <div className='flex justify-center py-5'>
                {token && token !== "undefined" && token.trim() !== "" ? (
                  <div className='flex gap-3'>
                    <HeartIcon
                      onClick={() => {
                        handleFavsClick();
                        setMobileMenuOpen(false);
                      }}
                      onClose={handleClose}
                      className='h-9 w-9 hover:fill-red-500 hover:scale-110'
                    />

                    <ShoppingCartIcon
                      onClick={() => {
                        handleCartClick();
                        setMobileMenuOpen(false);
                      }}
                      onClose={handleClose}
                      className='h-9 w-9 hover:fill-green-500 hover:scale-110'
                    />

                    <UserIcon className='h-9 w-9  hover:fill-blue-500 hover:scale-110' />
                  </div>
                ) : (
                  <div className='py-6'>
                    <button
                      className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                      onClick={() => {
                        setLoginOpen(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Iniciar sesion <span aria-hidden='true'>&rarr;</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
