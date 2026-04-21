"use client";

import { useEffect, useMemo, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { getProductByIdAction } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";
import color from "./colors";
import { addToCartAction, addToFavoritesAction } from "../../redux/actions/cart";
import {
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Login from "../../Components/Login/Login";

const colors = color;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.products.prodById);
  const values = useSelector((state) => state.values.values);
  const userCheck = useSelector((state) => state.user.user);

  const [log, setLog] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [quantity, setQuantity] = useState(1);

  const getColorClasses = (colorName) => {
    const foundColor = colors.find((c) => c.name === colorName);
    return foundColor
      ? { class: foundColor.class, selectedClass: foundColor.selectedClass }
      : { class: "", selectedClass: "" };
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL copiada al portapapeles!");
      })
      .catch(() => {
        toast.error("Error al copiar al portapapeles");
      });
  };

  useEffect(() => {
    dispatch(getProductByIdAction(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  const variants = product?.variants || [];

  const uniqueColors = useMemo(() => {
    return [...new Set(variants.map((v) => v.attributes?.color).filter(Boolean))];
  }, [variants]);

  const uniqueStorages = useMemo(() => {
    return [...new Set(variants.map((v) => v.attributes?.storage).filter(Boolean))];
  }, [variants]);

  const uniqueModels = useMemo(() => {
    return [...new Set(variants.map((v) => v.attributes?.model).filter(Boolean))];
  }, [variants]);

  const filteredVariants = useMemo(() => {
    return variants.filter((variant) => {
      const attrs = variant.attributes || {};

      if (selectedColor && attrs.color !== selectedColor) return false;
      if (selectedStorage && attrs.storage !== selectedStorage) return false;
      if (selectedModel && attrs.model !== selectedModel) return false;

      return true;
    });
  }, [variants, selectedColor, selectedStorage, selectedModel]);

  const selectedVariant = useMemo(() => {
    const inStockVariant = filteredVariants.find((v) => v.stock > 0);
    return inStockVariant || filteredVariants[0] || variants[0] || null;
  }, [filteredVariants, variants]);

  const currentImages =
    selectedVariant?.images?.length > 0
      ? selectedVariant.images
      : product?.images?.length > 0
        ? product.images
        : [];

  const calculatedPrice = useMemo(() => {
    const basePrice = selectedVariant?.price ?? 0;
    const { dolarBlue, profit, mp } = values || {};

    if (!basePrice || !dolarBlue || !profit || !mp) return 0;

    return Math.round(basePrice * dolarBlue * profit * mp * quantity);
  }, [selectedVariant, values, quantity]);

  const cartItem = useMemo(() => {
    return {
      product: product?._id,
      sku: selectedVariant?.sku || "",
      name: product?.name || "",
      image: currentImages[0] || "",
      stock: selectedVariant?.stock || 0,
      price: selectedVariant?.price || 0,
      quantity,
      attributes: {
        color: selectedVariant?.attributes?.color || "",
        model: selectedVariant?.attributes?.model || "",
        storage: selectedVariant?.attributes?.storage || "",
      },
    };
  }, [product, currentImages, selectedVariant, quantity]);

  const handleLogChange = () => {
    setLog(true);
  };

  const handleAddToFav = () => {
    const userId = userCheck.id;
    const productId = cartItem.product;
    dispatch(addToFavoritesAction(productId, userId));
  };

  const handleAddToCart = () => {
    const userId = userCheck.id;
    dispatch(addToCartAction(cartItem, userId));
  };

  const handleBuy = () => {
    const userId = userCheck.id;
    dispatch(addToCartAction(cartItem, userId));
    navigate("/checkout");
  };

  const handleWhatsApp = () => {
    const phone = "5493755611592"; // reemplaza por tu número

    const productName = product?.name || "este producto";

    const color = selectedVariant?.attributes?.color
      ? `Color: ${selectedVariant.attributes.color}`
      : null;

    const storage = selectedVariant?.attributes?.storage
      ? `Almacenamiento: ${selectedVariant.attributes.storage}`
      : null;

    const model = selectedVariant?.attributes?.model
      ? `Modelo: ${selectedVariant.attributes.model}`
      : null;

    const details = [color, storage, model].filter(Boolean).join(" | ");
    const url = window.location.href;

    const message = `Hola! Me interesa ${productName}${
      details ? ` (${details})` : ""
    }. Quisiera consultar disponibilidad, precio y formas de pago.
Link del producto: ${url}`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='bg-slate-50 pt-8'>
          <div className='pt-6'>
            <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
              {currentImages[0] && (
                <div className='aspect-h-4 aspect-w-3 overflow-hidden rounded-lg'>
                  <img
                    alt={product?.name}
                    src={currentImages[0]}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
              )}

              {currentImages[1] && (
                <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
                  <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg'>
                    <img
                      alt={product?.name}
                      src={currentImages[1]}
                      className='h-full w-full object-cover object-center'
                    />
                  </div>
                  {currentImages[2] && (
                    <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg'>
                      <img
                        alt={product?.name}
                        src={currentImages[2]}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                  )}
                </div>
              )}

              {currentImages[3] && (
                <div className='aspect-h-5 aspect-w-4 hidden lg:block sm:overflow-hidden sm:rounded-lg lg:aspect-h-4 lg:aspect-w-3'>
                  <img
                    alt={product?.name}
                    src={currentImages[3]}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
              )}
            </div>

            <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
              <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                  {product?.name}
                </h1>
              </div>

              <div className='mt-4 lg:row-span-3 lg:mt-0'>
                <h2 className='sr-only'>Informacion del Producto</h2>

                <p className='text-3xl tracking-tight text-gray-900'>
                  {" Precio $ "}
                  {calculatedPrice.toLocaleString("es-AR", {
                    useGrouping: true,
                  })}
                </p>

                <form className='mt-10'>
                  {uniqueColors.length > 0 && (
                    <div>
                      <h3 className='text-sm font-medium text-gray-900'>Color</h3>
                      <fieldset aria-label='Choose a color' className='mt-4'>
                        <RadioGroup
                          value={selectedColor}
                          onChange={setSelectedColor}
                          className='flex items-center space-x-3'
                        >
                          {uniqueColors.map((colorName) => {
                            const colorClasses = getColorClasses(colorName);

                            return (
                              <Radio
                                key={colorName}
                                value={colorName}
                                className={classNames(
                                  colorClasses.selectedClass,
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1",
                                )}
                              >
                                <span
                                  aria-hidden='true'
                                  className={classNames(
                                    colorClasses.class,
                                    "h-8 w-8 rounded-full border border-black border-opacity-10",
                                  )}
                                />
                              </Radio>
                            );
                          })}
                        </RadioGroup>
                      </fieldset>
                    </div>
                  )}

                  {uniqueStorages.length > 0 && (
                    <div className='mt-10'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-sm font-medium text-gray-900'>
                          Almacenamiento
                        </h3>
                      </div>

                      <fieldset aria-label='Choose storage' className='mt-4'>
                        <RadioGroup
                          value={selectedStorage}
                          onChange={setSelectedStorage}
                          className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'
                        >
                          {uniqueStorages.map((storage) => {
                            const hasStock = variants.some(
                              (v) =>
                                v.attributes?.storage === storage &&
                                (!selectedColor ||
                                  v.attributes?.color === selectedColor) &&
                                (!selectedModel ||
                                  v.attributes?.model === selectedModel) &&
                                v.stock > 0,
                            );

                            return (
                              <Radio
                                key={storage}
                                value={storage}
                                disabled={!hasStock}
                                className={classNames(
                                  hasStock
                                    ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6",
                                )}
                              >
                                <span>{storage}</span>
                                {hasStock ? (
                                  <span
                                    aria-hidden='true'
                                    className='pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500'
                                  />
                                ) : (
                                  <span
                                    aria-hidden='true'
                                    className='pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200'
                                  >
                                    <svg
                                      stroke='currentColor'
                                      viewBox='0 0 100 100'
                                      preserveAspectRatio='none'
                                      className='absolute inset-0 h-full w-full stroke-2 text-gray-200'
                                    >
                                      <line
                                        x1={0}
                                        x2={100}
                                        y1={100}
                                        y2={0}
                                        vectorEffect='non-scaling-stroke'
                                      />
                                    </svg>
                                  </span>
                                )}
                              </Radio>
                            );
                          })}
                        </RadioGroup>
                      </fieldset>
                    </div>
                  )}

                  {uniqueModels.length > 0 && (
                    <div className='mt-10'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-sm font-medium text-gray-900'>Modelo</h3>
                      </div>

                      <fieldset aria-label='Choose model' className='mt-4'>
                        <RadioGroup
                          value={selectedModel}
                          onChange={setSelectedModel}
                          className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'
                        >
                          {uniqueModels.map((model) => {
                            const hasStock = variants.some(
                              (v) =>
                                v.attributes?.model === model &&
                                (!selectedColor ||
                                  v.attributes?.color === selectedColor) &&
                                (!selectedStorage ||
                                  v.attributes?.storage === selectedStorage) &&
                                v.stock > 0,
                            );

                            return (
                              <Radio
                                key={model}
                                value={model}
                                disabled={!hasStock}
                                className={classNames(
                                  hasStock
                                    ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6",
                                )}
                              >
                                <span>{model}</span>
                                {hasStock ? (
                                  <span
                                    aria-hidden='true'
                                    className='pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500'
                                  />
                                ) : (
                                  <span
                                    aria-hidden='true'
                                    className='pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200'
                                  >
                                    <svg
                                      stroke='currentColor'
                                      viewBox='0 0 100 100'
                                      preserveAspectRatio='none'
                                      className='absolute inset-0 h-full w-full stroke-2 text-gray-200'
                                    >
                                      <line
                                        x1={0}
                                        x2={100}
                                        y1={100}
                                        y2={0}
                                        vectorEffect='non-scaling-stroke'
                                      />
                                    </svg>
                                  </span>
                                )}
                              </Radio>
                            );
                          })}
                        </RadioGroup>
                      </fieldset>
                    </div>
                  )}
                </form>

                {selectedVariant.precio !== null && (
                  <button
                    className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed'
                    onClick={() => {
                      if (userCheck.id) {
                        handleAddToCart();
                      } else {
                        handleLogChange();
                      }
                    }}
                    disabled={!selectedVariant || selectedVariant.stock === 0}
                  >
                    Lo quiero!
                  </button>
                )}

                {selectedVariant.precio !== null && (
                  <button
                    className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed'
                    onClick={() => {
                      if (userCheck.id) {
                        handleBuy();
                      } else {
                        handleLogChange();
                      }
                    }}
                    disabled={!selectedVariant || selectedVariant.stock === 0}
                  >
                    Comprar
                  </button>
                )}
              </div>

              {log && (
                <div className='fixed inset-0 z-50 flex items-center justify-center pt-32'>
                  <Login onClose={() => setLog(false)} />
                </div>
              )}

              <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
                <div>
                  <h3 className='sr-only'>Descripción</h3>
                  <div className='space-y-6'>
                    <p className='text-base text-gray-900'>{product?.description}</p>
                  </div>
                </div>

                <div className='mt-10 flex'>
                  <div className='w-2/3 pr-4'>
                    <h3 className='text-sm font-medium text-gray-900'>Highlights</h3>

                    <div className='mt-4'>
                      <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                        <li className='text-gray-400'>
                          Marca:
                          <span className='px-2 text-gray-600'>{product?.brand}</span>
                        </li>

                        <li className='text-gray-400'>
                          Stock:
                          <span className='px-2 text-gray-600'>
                            {selectedVariant?.stock ?? product?.totalStock ?? 0}
                          </span>
                        </li>

                        <li className='text-gray-400'>
                          Disponible:
                          <span className='px-2 text-gray-600'>
                            {product?.available ? "Sí" : "No"}
                          </span>
                        </li>

                        {selectedVariant?.attributes?.color && (
                          <li className='text-gray-400'>
                            Color:
                            <span className='px-2 text-gray-600'>
                              {selectedVariant.attributes.color}
                            </span>
                          </li>
                        )}

                        {selectedVariant?.attributes?.storage && (
                          <li className='text-gray-400'>
                            Almacenamiento:
                            <span className='px-2 text-gray-600'>
                              {selectedVariant.attributes.storage}
                            </span>
                          </li>
                        )}

                        {selectedVariant?.attributes?.model && (
                          <li className='text-gray-400'>
                            Modelo:
                            <span className='px-2 text-gray-600'>
                              {selectedVariant.attributes.model}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className='flex w-1/3 items-center justify-center gap-4'>
                    <button
                      type='button'
                      onClick={copyToClipboard}
                      className='flex h-8 w-8 items-center justify-center'
                    >
                      <ShareIcon className='h-7 w-7 transition-transform hover:scale-110 hover:fill-green-500' />
                    </button>

                    <button
                      type='button'
                      className='flex h-8 w-8 items-center justify-center'
                      onClick={() => {
                        if (userCheck.id) {
                          handleAddToFav();
                        } else {
                          handleLogChange();
                        }
                      }}
                    >
                      <HeartIcon className='h-7 w-7 transition-transform hover:scale-110 hover:fill-red-500' />
                    </button>

                    <button
                      type='button'
                      onClick={handleWhatsApp}
                      className='flex h-8 w-8 items-center justify-center'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 32 32'
                        className='h-7 w-7 transition-transform hover:scale-110'
                        fill='none'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M16 31c7.732 0 14-6.268 14-14S23.732 3 16 3 2 9.268 2 17c0 2.51.661 4.867 1.818 6.905L2 31l7.315-1.696A13.94 13.94 0 0 0 16 31m0-2.154c6.543 0 11.846-5.303 11.846-11.846 0-6.542-5.303-11.846-11.846-11.846C9.458 5.154 4.154 10.458 4.154 17c0 2.526.79 4.868 2.138 6.79L5.23 27.77l4.049-1.013a11.8 11.8 0 0 0 6.72 2.09'
                          fill='#bfc8d0'
                        />
                        <path
                          d='M28 16c0 6.627-5.373 12-12 12-2.528 0-4.873-.782-6.807-2.116L5.09 26.909l1.075-4.03A11.95 11.95 0 0 1 4 16C4 9.373 9.373 4 16 4s12 5.373 12 12'
                          fill='url(#a)'
                        />
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M16 30c7.732 0 14-6.268 14-14S23.732 2 16 2 2 8.268 2 16c0 2.51.661 4.867 1.818 6.905L2 30l7.315-1.696A13.94 13.94 0 0 0 16 30m0-2.154c6.543 0 11.846-5.303 11.846-11.846 0-6.542-5.303-11.846-11.846-11.846C9.458 4.154 4.154 9.458 4.154 16c0 2.526.79 4.868 2.138 6.79L5.23 26.77l4.049-1.013a11.8 11.8 0 0 0 6.72 2.09'
                          fill='#fff'
                        />
                        <path
                          d='M12.5 9.5c-.333-.669-.844-.61-1.36-.61-.921 0-2.359 1.105-2.359 3.16 0 1.684.742 3.528 3.243 6.286 2.414 2.662 5.585 4.039 8.218 3.992s3.175-2.313 3.175-3.078c0-.339-.21-.508-.356-.554-.897-.43-2.552-1.233-2.928-1.384-.377-.15-.573.054-.695.165-.342.325-1.019 1.284-1.25 1.5s-.578.106-.721.024c-.53-.212-1.964-.85-3.107-1.958-1.415-1.371-1.498-1.843-1.764-2.263-.213-.336-.057-.542.021-.632.305-.351.726-.894.914-1.164s.04-.679-.05-.934c-.387-1.097-.715-2.015-.981-2.55'
                          fill='#fff'
                        />
                        <defs>
                          <linearGradient
                            id='a'
                            x1='26.5'
                            y1='7'
                            x2='4'
                            y2='28'
                            gradientUnits='userSpaceOnUse'
                          >
                            <stop stopColor='#5bd066' />
                            <stop offset='1' stopColor='#27b43e' />
                          </linearGradient>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className='mt-10'>
                  <h2 className='text-sm font-medium text-gray-900'>Consideraciones</h2>

                  <div className='mt-4 space-y-6'>
                    <p className='text-sm text-gray-600'>
                      *El stock final o el precio puede variar según las combinaciones de
                      color, modelo o almacenamiento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ToastContainer />
        </div>
      )}
    </>
  );
}
