import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProductByIdAction,
  getValuesAction,
  addToFavoritesAction,
  addToCartAction,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth0 } from "@auth0/auth0-react";

import Loading from "../Loading/Loading";
import BackButton from "../Button/Back";

import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function ProductDetailDesk() {
  const { isAuthenticated } = useAuth0();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.prodById);
  const [loading, setLoading] = useState(true);
  const values = useSelector((state) => state.values);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const userCheck = useSelector((state) => state.checkUser);

  useEffect(() => {
    dispatch(getValuesAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductByIdAction(id)).then(() => setLoading(false));
  }, [dispatch]);

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
      defaultValues.precio =
        userCheck.isAdmin === true
          ? (selectedModel.precio * values.dolarBlue * values.profit).toFixed(2)
          : (selectedModel.precio * values.dolarBlue * values.profit * values.mp).toFixed(
              2
            );
    } else if (selectedColor && selectedColor.imageColor) {
      defaultValues.imagen = selectedColor.imageColor;
      defaultValues.color = selectedColor.nombre;
      defaultValues.stock = selectedColor.stockColor;
    }

    if (selectedStorage) {
      defaultValues.stock = selectedStorage.stockStorage;
      defaultValues.capacidad = selectedStorage.capacidad;
      defaultValues.precio =
        userCheck.isAdmin === true
          ? (selectedStorage.precio * values.dolarBlue * values.profit).toFixed(2)
          : (
              selectedStorage.precio *
              values.dolarBlue *
              values.profit *
              values.mp
            ).toFixed(2);
    } else {
      defaultValues.precio =
        userCheck.isAdmin === true
          ? (product.precioBase * values.dolarBlue * values.profit).toFixed(2)
          : (product.precioBase * values.dolarBlue * values.profit * values.mp).toFixed(
              2
            );
    }

    return defaultValues;
  };

  const [defaultValues, setDefaultValues] = useState(getDefaultValues());

  useEffect(() => {
    setDefaultValues(getDefaultValues());
  }, [product, selectedColor, selectedStorage, selectedModel, quantity]);

  // Controladores de color/model/storage/cantidad
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

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  // Logica para agregar a favoritos y al carrito
  const handleAddToFavorites = () => {
    const userId = userCheck._id;
    const productId = defaultValues.productId;
    dispatch(addToFavoritesAction(productId, userId));
  };

  const userId = userCheck._id;
  console.log(userId);
  const handleAddToCart = () => {
    dispatch(addToCartAction(defaultValues, userId));
  };

  return (
    <>
      <div className='backinback'>
        <BackButton />
      </div>

      <div className='containerDetails'>
        <div className='principalData'>
          {loading ? (
            <Loading />
          ) : (
            <>
              {selectedModel && selectedModel.imageModel ? (
                <img
                  style={{ width: "20rem", height: "26rem" }}
                  className='imageDetail'
                  src={selectedModel.imageModel}
                  alt=''
                />
              ) : selectedColor && selectedColor.imageColor ? (
                <img
                  style={{ width: "20rem", height: "26rem" }}
                  className='imageDetail'
                  src={selectedColor.imageColor}
                  alt=''
                />
              ) : (
                <Carousel variant='dark'>
                  {product?.imagenGeneral?.map((img, index) => (
                    <Carousel.Item interval={3000} key={index}>
                      <img className='imageDetail' src={img} alt='' />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
              <div className='productData'>
                <h3>{product.nombre}</h3>
                <ul>
                  <div className='listProductDetail'>
                    <li>
                      <b>Marca |</b> {product.marca}
                    </li>
                    <li>
                      <b>Precio |</b>{" "}
                      {Math.round(defaultValues.precio).toLocaleString("es-AR", {
                        useGrouping: true,
                      })}
                      {/* {selectedStorage
                        ? (
                            Math.round(
                              selectedStorage.precio * values.dolarBlue +
                                values.costoGeneral
                            ) * values.profit
                          ).toLocaleString("es-AR", { useGrouping: true })
                        : selectedModel
                        ? (
                            Math.round(
                              selectedModel.precio * values.dolarBlue +
                                values.costoGeneral
                            ) * values.profit
                          ).toLocaleString("es-AR", { useGrouping: true })
                        : (
                            Math.round(
                              product.precioBase * values.dolarBlue + values.costoGeneral
                            ) * values.profit
                          ).toLocaleString("es-AR", { useGrouping: true })}  */}
                    </li>
                    <li>
                      <b>Stock |</b>{" "}
                      {selectedStorage
                        ? selectedStorage.stockStorage
                        : selectedColor
                        ? selectedColor.stockColor
                        : product.stockGeneral}
                    </li>
                    <p className='userexist' id='smallLetter'>
                      *El stock final puede variar según la combinación de color y
                      almacenamiento
                    </p>
                    <li>
                      <b>Estado |</b> {product.estado}
                    </li>
                  </div>
                  <div className='listProductDetail'>
                    <Form.Label>Color</Form.Label>
                    <Form.Select
                      size='sm'
                      value={selectedColor?.nombre}
                      onChange={handleColorChange}
                    >
                      {product?.color?.map((c, index) => (
                        <option key={index}>{c.nombre}</option>
                      ))}
                    </Form.Select>
                  </div>
                  {product?.modelo && product.modelo.length > 0 && (
                    <div className='listProductDetail'>
                      <Form.Label>Modelo/s</Form.Label>
                      <Form.Select
                        size='sm'
                        value={selectedModel?.nombre}
                        onChange={handleModelChange}
                      >
                        {product.modelo.map((c, index) => (
                          <option key={index}>{c.nombre}</option>
                        ))}
                      </Form.Select>
                    </div>
                  )}

                  {product?.almacenamiento && product.almacenamiento.length > 0 && (
                    <div className='listProductDetail'>
                      <Form.Label>Almacenamiento</Form.Label>
                      <Form.Select
                        size='sm'
                        value={selectedStorage?.capacidad}
                        onChange={handleStockChange}
                      >
                        {product.almacenamiento.map((c, index) => (
                          <option key={index}>{c.capacidad}</option>
                        ))}
                      </Form.Select>
                    </div>
                  )}
                </ul>
                <b>Descripción</b>
                <p>{product.descripcion}</p>
              </div>
              <div className='productsOptions'>
                <div className='share-favorite'>
                  <Tooltip title='Agregar a Favoritos'>
                    <IconButton
                      onClick={() => {
                        if (Object.keys(userCheck).length > 0) {
                          handleAddToFavorites();
                        }
                      }}
                      disabled={Object.keys(userCheck).length === 0}
                    >
                      <FavoriteIcon className='text-black' />
                    </IconButton>
                  </Tooltip>

                  <CopyToClipboard text={window.location.href}>
                    <Tooltip
                      title='Compartir'
                      onClick={() => {
                        toast.success("¡Link copiado al portapapeles!");
                      }}
                    >
                      <IconButton>
                        <ShareIcon className='text-black' />
                      </IconButton>
                    </Tooltip>
                  </CopyToClipboard>
                </div>
                <div className='detailPayment'>
                  <h5>
                    $
                    {Math.round(defaultValues.precio).toLocaleString("es-AR", {
                      useGrouping: true,
                    })}
                    {/* {selectedStorage
                      ? (
                          Math.round(
                            selectedStorage.precio * values.dolarBlue +
                              values.costoGeneral
                          ) * values.profit
                        ).toLocaleString("es-AR", { useGrouping: true })
                      : selectedModel
                      ? (
                          Math.round(
                            selectedModel.precio * values.dolarBlue + values.costoGeneral
                          ) * values.profit
                        ).toLocaleString("es-AR", { useGrouping: true })
                      : (
                          Math.round(
                            product.precioBase * values.dolarBlue + values.costoGeneral
                          ) * values.profit
                        ).toLocaleString("es-AR", { useGrouping: true })} */}
                  </h5>
                  <p>
                    En 3 Cuotas:{" $"}
                    {Math.round(
                      (defaultValues.precio * values.comision * values.tasa) / 3
                    ).toLocaleString("es-AR", {
                      useGrouping: true,
                    })}
                    {/* {selectedStorage
                      ? Math.round(
                          ((selectedStorage.precio * values.dolarBlue +
                            values.costoGeneral) *
                            values.profit *
                            values.comision *
                            values.tasa) /
                            3
                        ).toLocaleString("es-AR", { useGrouping: true })
                      : selectedModel
                      ? Math.round(
                          ((selectedModel.precio * values.dolarBlue +
                            values.costoGeneral) *
                            values.profit *
                            values.comision *
                            values.tasa) /
                            3
                        ).toLocaleString("es-AR", { useGrouping: true })
                      : Math.round(
                          ((product.precioBase * values.dolarBlue + values.costoGeneral) *
                            values.profit *
                            values.comision *
                            values.tasa) /
                            3
                        ).toLocaleString("es-AR", { useGrouping: true })} */}
                  </p>{" "}
                  <Form className='formDetailProduct'>
                    <Form.Group className='selectInput'>
                      <Form.Label>Cantidad</Form.Label>
                      <Form.Select
                        size='sm'
                        value={quantity}
                        onChange={handleQuantityChange}
                      >
                        {[...Array(product.stockGeneral)].map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <div className='total'>
                      Total:{" "}
                      <span>
                        ${" "}
                        {Math.round(defaultValues.precio * quantity).toLocaleString(
                          "es-AR",
                          {
                            useGrouping: true,
                          }
                        )}
                        {/* {selectedStorage
                          ? (
                              Math.round(
                                (selectedStorage.precio * values.dolarBlue +
                                  values.costoGeneral) *
                                  values.profit
                              ) * quantity
                            ).toLocaleString("es-AR", { useGrouping: true })
                          : selectedModel
                          ? (
                              Math.round(
                                (selectedModel.precio * values.dolarBlue +
                                  values.costoGeneral) *
                                  values.profit
                              ) * quantity
                            ).toLocaleString("es-AR", { useGrouping: true })
                          : (
                              Math.round(
                                (product.precioBase * values.dolarBlue +
                                  values.costoGeneral) *
                                  values.profit
                              ) * quantity
                            ).toLocaleString("es-AR", { useGrouping: true })} */}
                      </span>
                    </div>

                    <Button
                      variant='contained'
                      color='primary'
                      startIcon={<ShoppingCartOutlinedIcon />}
                      onClick={() => {
                        if (Object.keys(userCheck).length > 0) {
                          handleAddToCart();
                        }
                      }}
                      disabled={Object.keys(userCheck).length === 0}
                    >
                      {" "}
                      Añadir al carrito
                    </Button>
                    {isAuthenticated ? (
                      <Link to='/cart'>
                        <Button variant='contained'>Ir al Carro</Button>
                      </Link>
                    ) : (
                      <Tooltip title='Registrate primero'>
                        <Button variant='contained'>Ir al Carro</Button>
                      </Tooltip>
                    )}
                  </Form>
                </div>
              </div>
              <ToastContainer />
            </>
          )}
        </div>
        <Divider />
      </div>
    </>
  );
}
