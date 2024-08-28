"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItemAction,
  deleteFavsItemAction,
  getCartItemsAction,
  getFavsItemsAction,
} from "../../redux/actions/cart";
import Loader from "../../Components/Loader/Loader";

// eslint-disable-next-line react/prop-types
export default function CartFav({ type, onClose }) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const fav = useSelector((state) => state.cart.favorites);
  const prods = useSelector((state) => state.products.products);

  useEffect(() => {
    if (!user.id) {
      setLoading(true);
      return; // Si no hay datos del usuario en checkUser, no obtenemos los elementos del carrito
    }
    dispatch(getCartItemsAction(user.id));
    dispatch(getFavsItemsAction(user.id));
    setLoading(false);
  }, [dispatch, user.id]);

  if (loading) {
    return <Loader />;
  }
  const handleClose = () => {
    setOpen(false); // Cierra el diálogo localmente
    onClose(); // Informa al componente padre que el diálogo se cerró
  };

  // delete triggers

  const handleDeleteFav = (favId) => {
    const userId = user.id;
    dispatch(deleteFavsItemAction(userId, favId));
  };
  const handleDeleteCartItem = (itemId) => {
    const userId = user.id;
    dispatch(deleteCartItemAction(userId, itemId));
  };
  // subtotal calc
  const subtotal = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <Dialog open={open} onClose={handleClose} className='relative z-10'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0'
      />
      <div className='fixed inset-0 overflow-hidden'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
            <DialogPanel
              transition
              className='pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700'
            >
              <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
                  <div className='flex items-start justify-between'>
                    <DialogTitle className='text-lg font-medium text-gray-900'>
                      {type === "cart" ? "Tu Carrito" : "Tus Favoritos"}
                    </DialogTitle>
                    <div className='ml-3 flex h-7 items-center'>
                      <button
                        type='button'
                        onClick={handleClose}
                        className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                      >
                        <span className='absolute -inset-0.5' />
                        <span className='sr-only'>Cerrar</span>
                        <XMarkIcon aria-hidden='true' className='h-6 w-6' />
                      </button>
                    </div>
                  </div>

                  <div className='mt-8'>
                    <div className='flow-root'>
                      <ul role='list' className='-my-6 divide-y divide-gray-200'>
                        {type === "favs"
                          ? fav.map((favsItem) => {
                              const product = prods.find(
                                (p) => p._id === favsItem.product
                              );
                              return product ? (
                                <li key={product._id} className='flex py-6'>
                                  <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                    <a href={"/detail/" + product._id}>
                                      <img
                                        alt={product.nombre}
                                        src={
                                          product.imagenGeneral &&
                                          product.imagenGeneral[0]
                                        }
                                        className='h-full w-full object-cover object-center'
                                      />
                                    </a>
                                  </div>
                                  <div className='ml-4 flex flex-1 flex-col'>
                                    <div>
                                      <div className='flex justify-between text-base font-medium text-gray-900'>
                                        <h3>{product.nombre}</h3>
                                        <p className='ml-4'>${product.precioBase}</p>
                                      </div>
                                      <p className='mt-1 text-sm text-gray-500'>
                                        {product.color && product.color[0]?.nombre}
                                      </p>
                                    </div>
                                    <div className='flex flex-1 items-end justify-between text-sm'>
                                      <button
                                        type='button'
                                        className='font-medium text-indigo-600 hover:text-indigo-500'
                                        onClick={() => handleDeleteFav(favsItem._id)}
                                      >
                                        Quitar
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ) : null;
                            })
                          : cart.map((product) => (
                              <li key={product._id} className='flex py-6'>
                                <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                                  <img
                                    alt={product.name}
                                    src={product.image}
                                    className='h-full w-full object-cover object-center'
                                  />
                                </div>
                                <div className='ml-4 flex flex-1 flex-col'>
                                  <div>
                                    <div className='flex justify-between text-base font-medium text-gray-900'>
                                      <h3>{product.name}</h3>
                                      <p className='ml-4'>${product.price}</p>
                                    </div>
                                    <p className='mt-1 text-sm text-gray-500'>
                                      {product.color}
                                    </p>
                                  </div>
                                  <div className='flex flex-1 items-end justify-between text-sm'>
                                    <p className='text-gray-500'>
                                      Cantidad {product.quantity}
                                    </p>
                                    <button
                                      type='button'
                                      className='font-medium text-indigo-600 hover:text-indigo-500'
                                      onClick={() => handleDeleteCartItem(product._id)}
                                    >
                                      Quitar
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                  {type === "cart" ? (
                    <div>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <p>Subtotal</p>
                        <p>${subtotal.toLocaleString("es-ES")}</p>
                      </div>
                      <p className='mt-0.5 text-sm text-gray-500'>
                        El envío e impuestos se calculan en el momento de la compra.
                      </p>
                      <div className='mt-6'>
                        <a
                          href='/checkout'
                          className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                        >
                          Checkout
                        </a>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                    <p>
                      o{" "}
                      <button
                        type='button'
                        onClick={handleClose}
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        Continuar Comprando
                        <span aria-hidden='true'> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
