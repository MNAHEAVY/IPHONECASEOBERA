"use client";

import { useCallback, useEffect, useState } from "react";

import { Radio, RadioGroup } from "@headlessui/react";
import { getProductByIdAction } from "../../redux/actions/products";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";
import color from "./colors";
import { addToCartAction, addToFavoritesAction } from "../../redux/actions/cart";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import Login from "../../Components/Login/Login";
import { getValuesAction } from "../../redux/actions/values";

const colors = color;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.prodById);
  const values = useSelector((state) => state.values.values);
  const userCheck = useSelector((state) => state.user.user);
  const [log, setLog] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const [selectedCapa, setSelectedCapa] = useState(null);
  const [selectedMod, setSelectedMod] = useState(null);
  const [selectedCol, setSelectedCol] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const getColorClasses = (colorName) => {
    const color = colors.find((c) => c.name === colorName);
    return color
      ? { class: color.class, selectedClass: color.selectedClass }
      : { class: "", selectedClass: "" };
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("URL copiada al portapapeles!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al copiar al portapapeles: ");
      });
  };

  useEffect(() => {
    dispatch(getProductByIdAction(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  const getDefaultValues = useCallback(() => {
    const { precioBase } = product || {};
    const { dolarBlue, profit, mp } = values || {};

    let defaultValues = {
      nombre: product?.nombre,
      imagen: product?.imagenGeneral?.[0],
      stock: product?.stockGeneral,
      color: "",
      productId: product?._id,
      tipo: product?.tipo,
      cantidad: quantity,
      modelo: "",
      capacidad: "",
      precio: null,
    };

    if (precioBase && dolarBlue && profit && mp) {
      defaultValues.precio = parseFloat(precioBase * dolarBlue * profit * mp).toFixed(2);
    }
    if (selectedModel && selectedModel.precio) {
      const modelPrice = parseFloat(selectedModel.precio);
      defaultValues.imagen = selectedModel.imageModel;
      defaultValues.modelo = selectedModel.nombre;
      defaultValues.stock = selectedModel.stockModel;
      defaultValues.precio = (
        modelPrice *
        values.dolarBlue *
        values.profit *
        values.mp
      ).toFixed(2);
    } else if (selectedColor && selectedColor.imageColor) {
      defaultValues.imagen = selectedColor.imageColor;
      defaultValues.color = selectedColor.nombre;
      defaultValues.stock = selectedColor.stockColor;
    }

    if (selectedStorage && selectedStorage.precio) {
      const storagePrice = parseFloat(selectedStorage.precio);
      defaultValues.stock = selectedStorage.stockStorage;
      defaultValues.capacidad = selectedStorage.capacidad;
      defaultValues.precio = (
        storagePrice *
        values.dolarBlue *
        values.profit *
        values.mp
      ).toFixed(2);
    } else if (!defaultValues.precio && precioBase) {
      // Si `defaultValues.precio` todavía es `null`, usa `precioBase`
      defaultValues.precio = (parseFloat(precioBase) * dolarBlue * profit * mp).toFixed(
        2
      );
    }

    return defaultValues;
  }, [product, selectedColor, selectedStorage, selectedModel, quantity, values]);

  const [defaultValues, setDefaultValues] = useState(getDefaultValues());

  useEffect(() => {
    setDefaultValues(getDefaultValues());
  }, [getDefaultValues]);

  console.log(defaultValues);
  //Controladores de color/model/storage/cantidad

  const handleLogChange = () => {
    setLog(true);
  };
  const handleColorChange = (e) => {
    const color = product.color.find((c) => c.nombre === e.target.value);
    console.log(color, "ete");
    setSelectedColor(color);
  };

  const handleStockChange = (e) => {
    const capacity = product.almacenamiento.find((c) => c.capacidad === e.target.value);
    setSelectedStorage(capacity);
  };

  const handleModelChange = (e) => {
    const model = product.modelo.find((c) => c.nombre === e.target.value);
    setSelectedModel(model);
  };

  // const handleQuantityChange = (e) => {
  //   setQuantity(parseInt(e.target.value));
  // };

  const handleAddToFav = () => {
    const userId = userCheck.id;
    const productId = defaultValues.productId;
    dispatch(addToFavoritesAction(productId, userId));
  };

  const handleAddToCart = () => {
    const userId = userCheck.id;
    dispatch(addToCartAction(defaultValues, userId));
  };

  const navigate = useNavigate();

  const handleBuy = () => {
    const userId = userCheck.id;
    dispatch(addToCartAction(defaultValues, userId));

    // Redirigir a /checkout después de añadir al carrito
    navigate("/checkout");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='bg-slate-50 pt-8'>
          <div className='pt-6'>
            {/* Image gallery color*/}

            {selectedModel && selectedModel.imageModel ? (
              <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
                <div className='aspect-h-4 aspect-w-3 overflow-hidden rounded-lg'>
                  <img
                    alt={product.nombre}
                    src={selectedModel.imageModel}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
              </div>
            ) : selectedColor && selectedColor.imageColor ? (
              <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
                <div className='aspect-h-4 aspect-w-3 overflow-hidden rounded-lg'>
                  <img
                    alt={product.nombre}
                    src={selectedColor.imageColor}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
              </div>
            ) : (
              <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
                <div className='aspect-h-4 aspect-w-3 overflow-hidden rounded-lg'>
                  <img
                    alt={product.nombre}
                    src={product.imagenGeneral[0]}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
                {product?.imagenGeneral[1] && (
                  <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
                    <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg'>
                      <img
                        alt={product.nombre}
                        src={product.imagenGeneral[1]}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    {product?.imagenGeneral[2] && (
                      <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg'>
                        <img
                          alt={product.nombre}
                          src={product.imagenGeneral[2]}
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                    )}
                  </div>
                )}
                {product?.imagenGeneral[3] && (
                  <div className='aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg hidden lg:block'>
                    <img
                      alt={product.nombre}
                      src={product.imagenGeneral[3]}
                      className='h-full w-full object-cover object-center'
                    />
                  </div>
                )}
              </div>
            )}

            {/* Product info */}
            <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
              <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
                <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                  {product.nombre}
                </h1>
              </div>

              {/* Options */}
              <div className='mt-4 lg:row-span-3 lg:mt-0'>
                <h2 className='sr-only'>Informacion del Producto</h2>
                <p className='text-3xl tracking-tight text-gray-900'>
                  {" Precio $ "}
                  {selectedStorage
                    ? selectedStorage.precio
                    : selectedModel
                    ? selectedModel.precio
                    : Math.round(
                        product.precioBase *
                          values.dolarBlue *
                          values.profit *
                          values.mp *
                          quantity
                      ).toLocaleString("es-AR", {
                        useGrouping: true,
                      })}
                </p>

                <form className='mt-10'>
                  {/* Colors */}
                  {product?.color && product.color.length > 0 && (
                    <div>
                      <h3 className='text-sm font-medium text-gray-900'>Color</h3>
                      <fieldset aria-label='Choose a color' className='mt-4'>
                        <RadioGroup
                          value={selectedColor}
                          onChange={setSelectedColor}
                          className='flex items-center space-x-3'
                        >
                          {product.color.map((color) => {
                            const colorClasses = getColorClasses(color.nombre);
                            return (
                              <Radio
                                key={color._id}
                                value={color} // Pass the entire color object here
                                className={classNames(
                                  colorClasses.selectedClass,
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                                )}
                              >
                                <span
                                  aria-hidden='true'
                                  className={classNames(
                                    colorClasses.class,
                                    "h-8 w-8 rounded-full border border-black border-opacity-10"
                                  )}
                                />
                              </Radio>
                            );
                          })}
                        </RadioGroup>
                      </fieldset>
                    </div>
                  )}

                  {/* Almacenamiento */}
                  {product?.almacenamiento && product.almacenamiento.length > 0 && (
                    <div className='mt-10'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-sm font-medium text-gray-900'>
                          Almacenamiento
                        </h3>
                        <a className='text-sm font-medium text-indigo-600 hover:text-indigo-500'>
                          Seleccione uno
                        </a>
                      </div>
                      <fieldset aria-label='Choose a size' className='mt-4'>
                        <RadioGroup
                          value={selectedCapa}
                          onChange={setSelectedCapa}
                          className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'
                        >
                          {product.almacenamiento.map((size) => (
                            <Radio
                              key={size.capacidad}
                              value={size.capacidad}
                              disabled={!size.stockStorage}
                              onChange={handleStockChange}
                              className={classNames(
                                size.stockStorage
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                              )}
                            >
                              <span>{size.capacidad}</span>
                              {size.stockStorage ? (
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
                          ))}
                        </RadioGroup>
                      </fieldset>
                    </div>
                  )}

                  {/* Modelo */}
                  {product?.modelo && product.modelo.length > 0 && (
                    <div className='mt-10'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-sm font-medium text-gray-900'>Modelo</h3>
                        <a className='text-sm font-medium text-indigo-600 hover:text-indigo-500'>
                          Seleccione uno
                        </a>
                      </div>
                      <fieldset aria-label='Choose a size' className='mt-4'>
                        <RadioGroup
                          value={selectedMod}
                          onChange={setSelectedMod}
                          className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'
                        >
                          {product.modelo.map((size) => (
                            <Radio
                              key={size.nombre}
                              value={size.nombre}
                              onChange={handleModelChange}
                              disabled={!size.stockModel}
                              className={classNames(
                                size.stockModel
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                              )}
                            >
                              <span>{size.nombre}</span>
                              {size.stockModel ? (
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
                          ))}
                        </RadioGroup>
                      </fieldset>
                    </div>
                  )}
                </form>
                {defaultValues.precio !== null ? (
                  <button
                    className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed'
                    onClick={() => {
                      if (userCheck.id) {
                        handleAddToCart();
                      } else {
                        handleLogChange(true);
                      }
                    }}
                    disabled={defaultValues.stock === 0}
                  >
                    Lo quiero!
                  </button>
                ) : (
                  <></>
                )}
                {defaultValues.precio !== null ? (
                  <button
                    className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed'
                    onClick={() => {
                      if (userCheck.id) {
                        handleBuy();
                      } else {
                        handleLogChange(true);
                      }
                    }}
                    disabled={defaultValues.stock === 0}
                  >
                    Comprar
                  </button>
                ) : (
                  <></>
                )}
              </div>
              {log && (
                <div className='fixed pt-32 inset-0 flex items-center justify-center z-50'>
                  <Login onClose={() => setLog(false)} />
                </div>
              )}
              <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
                {/* Description and details */}
                <div>
                  <h3 className='sr-only'>Descripción</h3>

                  <div className='space-y-6'>
                    <p className='text-base text-gray-900'>{product.descripcion}</p>
                  </div>
                </div>

                <div className='mt-10 flex'>
                  <div className='w-2/3 pr-4'>
                    <h3 className='text-sm font-medium text-gray-900'>Highlights</h3>

                    <div className='mt-4'>
                      <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                        <li className='text-gray-400'>
                          Marca:
                          <span className='text-gray-600 px-2'>{product?.marca}</span>
                        </li>
                        <li className='text-gray-400'>
                          Stock:
                          <span className='text-gray-600 px-2'>
                            {selectedStorage
                              ? selectedStorage.stockStorage
                              : selectedColor
                              ? selectedColor.stockColor
                              : product.stockGeneral}
                          </span>
                        </li>
                        <li className='text-gray-400'>
                          Estado:
                          <span className='text-gray-600 px-2'>{product?.estado}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className='w-1/3 flex gap-4 justify-center'>
                    <ShareIcon
                      className='w-7 h-7  hover:fill-green-500 hover:scale-110'
                      onClick={copyToClipboard}
                    />
                    <HeartIcon
                      className='w-7 h-7 hover:fill-red-500 hover:scale-110 disabled:cursor-not-allowed'
                      onClick={() => {
                        if (userCheck.id) {
                          handleAddToFav();
                        } else {
                          handleLogChange(true);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className='mt-10'>
                  <h2 className='text-sm font-medium text-gray-900'>Consideraciones</h2>

                  <div className='mt-4 space-y-6'>
                    <p className='text-sm text-gray-600'>
                      *El stock final o el precio puede variar según las combinaciónes de
                      color, modelo o almacenamiento, ante la duda consulte
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
