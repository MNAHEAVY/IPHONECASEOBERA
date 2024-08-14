"use client";

import { useEffect, useState } from "react";

import { Radio, RadioGroup } from "@headlessui/react";
import { getProductByIdAction } from "../../redux/actions/products";
import { getValuesAction } from "../../redux/actions/values";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";
import color from "./colors";
import { addToCartAction } from "../../redux/actions/cart";

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
  console.log(selectedStorage);
  // const [showModal, setShowModal] = useState(false);

  // const handleClose = () => setShowModal(false);
  // const handleShow = () => setShowModal(true);

  // const handleClick = () => {
  //   if (isAuthenticated) {
  //   } else {
  //     handleShow();
  //   }
  // };

  useEffect(() => {
    dispatch(getValuesAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductByIdAction(id)).then(() => setLoading(false));
  }, [dispatch, id]);

  const getDefaultValues = () => {
    const defaultValues = {
      nombre: product.nombre,
      imagen: product.imagenGeneral?.[0],
      stock: product.stockGeneral,
      color: product.color?.[0]?.nombre,
      productId: product._id,
      tipo: product.tipo,
      cantidad: quantity,
      modelo: "",
      capacidad: "",
    };

    if (selectedModel && selectedModel.imageModel) {
      defaultValues.imagen = selectedModel.imageModel;
      defaultValues.modelo = selectedModel.nombre;
      defaultValues.stock = selectedModel.stockModel;
      defaultValues.precio = (
        selectedModel.precio *
        values.dolarBlue *
        values.profit *
        values.mp
      ).toFixed(2);
    } else if (selectedColor && selectedColor.imageColor) {
      defaultValues.imagen = selectedColor.imageColor;
      defaultValues.color = selectedColor.nombre;
      defaultValues.stock = selectedColor.stockColor;
    }

    if (selectedStorage) {
      defaultValues.stock = selectedStorage.stockStorage;
      defaultValues.capacidad = selectedStorage.capacidad;
      defaultValues.precio = (
        selectedStorage.precio *
        values.dolarBlue *
        values.profit *
        values.mp
      ).toFixed(2);
    } else {
      defaultValues.precio = (
        product.precioBase *
        values.dolarBlue *
        values.profit *
        values.mp
      ).toFixed(2);
    }

    return defaultValues;
  };

  const [defaultValues, setDefaultValues] = useState(getDefaultValues());

  useEffect(() => {
    setDefaultValues(getDefaultValues());
  }, [product, selectedColor, selectedStorage, selectedModel, quantity]);

  //Controladores de color/model/storage/cantidad

  const handleColorChange = (e) => {
    const color = product.color.find((c) => c.nombre === e.target.value);
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

  // Logica para agregar a favoritos y al carrito
  // const handleAddToFavorites = () => {
  //   const userId = userCheck.id;
  //   const productId = defaultValues.productId;
  //   dispatch(addToFavoritesAction(productId, userId));
  // };
  console.log(defaultValues);

  const userId = userCheck.id;
  const handleAddToCart = () => {
    dispatch(addToCartAction(defaultValues, userId));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='bg-slate-50 pt-8'>
          <div className='pt-6'>
            {/* Image gallery */}
            <div className='mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8'>
              <div className='aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block'>
                <img
                  alt={product.nombre}
                  src={product.imagenGeneral[0]}
                  className='h-full w-full object-cover object-center'
                />
              </div>
              {product.imagenGeneral[1] && (
                <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
                  <div className='aspect-h-2 aspect-w-3 overflow-hidden rounded-lg'>
                    <img
                      alt={product.nombre}
                      src={product.imagenGeneral[1]}
                      className='h-full w-full object-cover object-center'
                    />
                  </div>
                  {product.imagenGeneral[2] && (
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

              {product.imagenGeneral[3] && (
                <div className='aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg'>
                  <img
                    alt={product.nombre}
                    src={product.imagenGeneral[3]}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
              )}
            </div>

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
                  {Math.round(defaultValues.precio * quantity).toLocaleString("es-AR", {
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
                          value={selectedCol} // Asegúrate de que el valor coincida con el nombre del color
                          onChange={(color) => setSelectedCol(color)}
                          className='flex items-center space-x-3'
                        >
                          {product.color.map((color) => {
                            const colorClasses = getColorClasses(color.nombre);
                            return (
                              <Radio
                                key={color._id} // Usa el ID único del color como clave
                                value={color.nombre} // Usa el nombre del color como valor
                                aria-label={color.nombre}
                                onChange={handleColorChange}
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
                                size.stockStorage
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                              )}
                            >
                              <span>{size.nombre}</span>
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
                </form>
                <button
                  className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  onClick={() => {
                    handleAddToCart();
                  }}
                >
                  Lo quiero!
                </button>
              </div>

              <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6'>
                {/* Description and details */}
                <div>
                  <h3 className='sr-only'>Descripción</h3>

                  <div className='space-y-6'>
                    <p className='text-base text-gray-900'>{product.descripcion}</p>
                  </div>
                </div>

                <div className='mt-10'>
                  <h3 className='text-sm font-medium text-gray-900'>Highlights</h3>

                  <div className='mt-4'>
                    <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                      <li className='text-gray-400'>
                        {" "}
                        Marca:
                        <span className='text-gray-600 px-2'>{product.marca}</span>
                      </li>
                      <li className='text-gray-400'>
                        {" "}
                        Stock:
                        <span className='text-gray-600 px-2'>
                          {" "}
                          {selectedStorage
                            ? selectedStorage.stockStorage
                            : selectedColor
                            ? selectedColor.stockColor
                            : product.stockGeneral}
                        </span>
                      </li>
                      <li className='text-gray-400'>
                        Estado:
                        <span className='text-gray-600 px-2'>{product.estado}</span>
                      </li>
                    </ul>
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