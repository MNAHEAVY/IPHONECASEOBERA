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

import Loading from "../Loading/Loading";
import BackButton from "../Button/Back";

import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function ProductDetailMobile() {
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
      cantidad: quantity,
      modelo: "",
      capacidad: "",
    };

    if (selectedModel && selectedModel.imageModel) {
      defaultValues.imagen = selectedModel.imageModel;
      defaultValues.modelo = selectedModel.nombre;
      defaultValues.stock = selectedModel.stockModel;
      defaultValues.precio = (selectedModel.precio * values.dolarBlue).toFixed(2);
    } else if (selectedColor && selectedColor.imageColor) {
      defaultValues.imagen = selectedColor.imageColor;
      defaultValues.color = selectedColor.nombre;
      defaultValues.stock = selectedColor.stockColor;
    }

    if (selectedStorage) {
      defaultValues.stock = selectedStorage.stockStorage;
      defaultValues.precio = (selectedStorage.precio * values.dolarBlue).toFixed(2);
      defaultValues.capacidad = selectedStorage.capacidad;
    } else {
      defaultValues.precio = (product.precioBase * values.dolarBlue).toFixed(2);
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

  const handleAddToCart = () => {
    const userId = userCheck._id;
    dispatch(addToCartAction(defaultValues, userId));
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <div style={{ padding: "8px" }}>
              <br />
              <h3>{product.nombre}</h3>
            </div>
            <br />
            {selectedModel && selectedModel.imageModel ? (
              <img
                style={{
                  width: "100%",
                  height: "auto",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
                src={selectedModel.imageModel}
                alt=''
              />
            ) : selectedColor && selectedColor.imageColor ? (
              <img
                style={{
                  width: "100%",
                  height: "auto",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
                src={selectedColor.imageColor}
                alt=''
              />
            ) : (
              <Carousel variant='dark'>
                {product?.imagenGeneral?.map((img, index) => (
                  <Carousel.Item interval={3000} key={index}>
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                      src={img}
                      alt=''
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
            <br />

            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "auto",
                  gap: "5px",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
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
                <div
                  style={{
                    display: "flex",
                    width: "auto",
                    gap: "5px",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
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
                <div
                  style={{
                    display: "flex",
                    width: "auto",
                    gap: "5px",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
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
            </div>
            <br />

            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "row",
                paddingRight: "10px",
                justifyContent: " space-between",
              }}
            >
              <div>
                <ul>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                      gap: " 0.5em",
                    }}
                  >
                    <li>
                      <b
                        style={{
                          color: "#9e1693",
                          fontWeight: "600",
                        }}
                      >
                        Marca |
                      </b>{" "}
                      {product.marca}
                    </li>
                    <li>
                      <b
                        style={{
                          color: "#9e1693",
                          fontWeight: "600",
                        }}
                      >
                        Precio |
                      </b>{" "}
                      {selectedStorage
                        ? Math.round(
                            selectedStorage.precio * values.dolarBlue
                          ).toLocaleString("es-AR", { useGrouping: true })
                        : selectedModel
                        ? Math.round(
                            selectedModel.precio * values.dolarBlue
                          ).toLocaleString("es-AR", { useGrouping: true })
                        : Math.round(
                            product.precioBase * values.dolarBlue
                          ).toLocaleString("es-AR", { useGrouping: true })}
                    </li>
                    <li>
                      <b
                        style={{
                          color: "#9e1693",
                          fontWeight: "600",
                        }}
                      >
                        Stock |
                      </b>{" "}
                      {selectedStorage
                        ? selectedStorage.stockStorage
                        : selectedColor
                        ? selectedColor.stockColor
                        : product.stockGeneral}
                    </li>
                    <p
                      style={{
                        fontSize: "8px",
                        color: "grey",
                        position: "absolute",
                        marginTop: "85px",
                      }}
                    >
                      *El stock final puede variar según la combinación de color y
                      almacenamiento
                    </p>
                    <li>
                      <b
                        style={{
                          color: "#9e1693",
                          fontWeight: "600",
                        }}
                      >
                        Estado |
                      </b>{" "}
                      {product.estado}
                    </li>
                  </div>
                </ul>
              </div>
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
            </div>
            <br />
            <b
              style={{
                color: "grey",
                fontWeight: "600",
                paddingLeft: "10px",
              }}
            >
              Descripción
            </b>
            <p
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                overflowY: "auto",
                height: "75px",
              }}
            >
              {" "}
              {product.descripcion}
            </p>

            <div className='productsOptions'>
              <div className='detailPayment'>
                <h5>
                  ${" "}
                  {selectedStorage
                    ? Math.round(
                        selectedStorage.precio * values.dolarBlue
                      ).toLocaleString("es-AR", { useGrouping: true })
                    : selectedModel
                    ? Math.round(selectedModel.precio * values.dolarBlue).toLocaleString(
                        "es-AR",
                        { useGrouping: true }
                      )
                    : Math.round(product.precioBase * values.dolarBlue).toLocaleString(
                        "es-AR",
                        { useGrouping: true }
                      )}
                </h5>
                <p>
                  En 3 Cuotas:{" $"}
                  {selectedStorage
                    ? Math.round(
                        (selectedStorage.precio *
                          values.dolarBlue *
                          values.comision *
                          values.tasa) /
                          3
                      ).toLocaleString("es-AR", { useGrouping: true })
                    : selectedModel
                    ? Math.round(
                        (selectedModel.precio *
                          values.dolarBlue *
                          values.comision *
                          values.tasa) /
                          3
                      ).toLocaleString("es-AR", { useGrouping: true })
                    : Math.round(
                        (product.precioBase *
                          values.dolarBlue *
                          values.comision *
                          values.tasa) /
                          3
                      ).toLocaleString("es-AR", { useGrouping: true })}
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
                      {selectedStorage
                        ? (
                            Math.round(selectedStorage.precio * values.dolarBlue) *
                            quantity
                          ).toLocaleString("es-AR", { useGrouping: true })
                        : selectedModel
                        ? (
                            Math.round(selectedModel.precio * values.dolarBlue) * quantity
                          ).toLocaleString("es-AR", { useGrouping: true })
                        : Math.round(product.precioBase * values.dolarBlue) *
                          quantity.toLocaleString("es-AR", { useGrouping: true })}{" "}
                    </span>
                  </div>

                  {userCheck ? (
                    <Button variant='contained'>
                      Ir al Carro<Link to='/cart'></Link>
                    </Button>
                  ) : (
                    <>
                      <Button variant='contained' disabled>
                        Ir al Carro
                      </Button>
                      <p className='userexist'>*Debe estar logueado para comprar</p>
                    </>
                  )}
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
                    Añadir al carrito
                  </Button>
                </Form>
              </div>
            </div>
            <br />
            <br />
            <ToastContainer />
          </>
        )}
      </div>
    </div>
  );
}
