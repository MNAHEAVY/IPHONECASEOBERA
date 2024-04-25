import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProductByIdAction,
  getValuesAction,
  addToFavoritesAction,
  addToCartAction,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Modal } from "react-bootstrap";
import Loading from "../Loading/Loading";

import { useAuth0 } from "@auth0/auth0-react";
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
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleClick = () => {
    if (isAuthenticated) {
    } else {
      handleShow();
    }
  };

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
                    <li className='listed-details'>
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
                    <li className='listed-details'>
                      <b
                        style={{
                          color: "#9e1693",
                          fontWeight: "600",
                        }}
                      >
                        Precio |
                      </b>{" "}
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
                          ).toLocaleString("es-AR", { useGrouping: true })} */}
                    </li>
                    <li className='listed-details'>
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
                    <li className='listed-details'>
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
                  {Math.round(defaultValues.precio).toLocaleString("es-AR", {
                    useGrouping: true,
                  })}
                  {/* {selectedStorage
                    ? (
                        Math.round(
                          selectedStorage.precio * values.dolarBlue + values.costoGeneral
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
                        ((selectedModel.precio * values.dolarBlue + values.costoGeneral) *
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
                          ).toLocaleString("es-AR", { useGrouping: true })}{" "} */}
                    </span>
                  </div>
                  {isAuthenticated ? (
                    <Button
                      variant='contained'
                      color='primary'
                      startIcon={<ShoppingCartOutlinedIcon />}
                      onClick={() => {
                        if (isAuthenticated) {
                          handleAddToCart();
                        }
                      }}
                    >
                      {" "}
                      Lo Quiero
                    </Button>
                  ) : (
                    <Tooltip title='Registrate primero'>
                      <Button
                        variant='contained'
                        color='primary'
                        startIcon={<ShoppingCartOutlinedIcon />}
                        onClick={() => handleClick()}
                      >
                        {" "}
                        Lo Quiero
                      </Button>
                    </Tooltip>
                  )}

                  {Object.keys(userCheck).length === 0 ? (
                    <Button disabled variant='contained'>
                      Ir al Carro
                    </Button>
                  ) : (
                    <Link to='/cart'>
                      <Button variant='contained'>Ir al Carro</Button>
                    </Link>
                  )}
                </Form>
              </div>
            </div>
            <br />
            <br />
            <ToastContainer />
          </>
        )}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Debes registrarte para tus compras, por favor inicia sesión.
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={loginWithRedirect}>
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
