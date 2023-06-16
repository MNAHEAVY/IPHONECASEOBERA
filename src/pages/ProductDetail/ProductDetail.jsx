import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductById, getValues } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./ProductDetail.css";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import { addToFavorites, addToCart } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Loading from "../Loading/Loading";
import BackButton from "../Button/Back";

import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Alert from "@mui/material/Alert";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.prodById);
  const [loading, setLoading] = useState(true);
  const values = useSelector((state) => state.values);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth0();
  console.log(product);

  useEffect(() => {
    dispatch(getValues());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProductById(id)).then(() => setLoading(false));
  }, [dispatch]);

  const [defaultValues, setDefaultValues] = useState({
    nombre: product?.nombre,
    imagen: product?.imagenGeneral?.[0],
    stock: product?.stockGeneral,
    color: product?.color?.[0].nombre,
    _id: product?.id,
    precio:
      product && values
        ? (product.precioBase * values.dolarBlue).toFixed(2)
        : null,
  });

  // Actualiza los valores predeterminados si el producto cambia
  useEffect(() => {
    setDefaultValues({
      nombre: product?.nombre,
      imagen: selectedColor
        ? selectedColor.imageColor
        : product?.imagenGeneral?.[0],
      stock: selectedStorage
        ? selectedStorage.stockStorage
        : product.stockGeneral,
      color: selectedColor ? selectedColor.nombre : product?.color?.[0].nombre,
      _id: product.id,

      precio: selectedStorage
        ? (selectedStorage.precio * values.dolarBlue).toFixed(2)
        : (product.precioBase * values.dolarBlue).toFixed(2),
    });
  }, [product, selectedColor, selectedStorage]);

  const handleColorChange = (e) => {
    const color = product.color.find((c) => c.nombre === e.target.value);
    setSelectedColor(color);
  };

  const handleStockChange = (e) => {
    const capacity = product.almacenamiento.find(
      (c) => c.capacidad === e.target.value
    );
    setSelectedStorage(capacity);
  };

  const handleModelChange = (e) => {
    const model = product.modelo.find((c) => c.nombre === e.target.value);
    setSelectedModel(model);
  };

  const handlerQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleCartState = () => {
    const cart = getCartItems(); // Reemplaza esta línea con tu lógica para obtener el carrito
    return cart;
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(defaultValues));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(defaultValues));
  };

  const handleCartClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (defaultValues.stock === 0) {
      return;
    }
    addToCart(
      defaultValues.nombre,
      defaultValues.imagen,
      defaultValues.stock,
      defaultValues.color,
      defaultValues._id,
      defaultValues.precio,
      e
    );
    handleClickSnackbar(
      handleCartState().length ? "Añadido al carrito" : "Eliminado del carrito"
    );
  };

  // Alert Logic
  const [open, setOpen] = React.useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClickShare = (message) => {
    setMessageAlert(message);
    setOpen(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  console.log(defaultValues);
  return (
    <div className="containerDetails">
      <div className="principalData">
        <BackButton />
        {loading ? ( // show loading component if still loading
          <Loading />
        ) : (
          <>
            {selectedColor ? (
              <img
                style={{ width: "20rem", height: "26rem" }}
                className="imageDetail"
                src={selectedColor.imageColor}
                alt=""
              />
            ) : (
              <Carousel variant="dark">
                {product?.imagenGeneral?.map((img, index) => {
                  return (
                    <Carousel.Item interval={3000} key={index}>
                      <img className="imageDetail" src={img} alt="" />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            )}
            <div className="productData">
              <h3>{product.nombre}</h3>
              <ul>
                <div className="listProductDetail">
                  <li>
                    <b>Marca |</b> {product.marca}
                  </li>
                  <li>
                    <b>Precio |</b>
                    {selectedStorage
                      ? Math.round(selectedStorage.precio * values.dolarBlue)
                      : Math.round(product.precioBase * values.dolarBlue)}
                  </li>
                  <li>
                    <b>Stock |</b>
                    {selectedStorage
                      ? selectedStorage.stockStorage
                      : selectedColor
                      ? selectedColor.stockColor
                      : product.stockGeneral}
                  </li>
                  <p className="userexist" id="smallLetter">
                    *El stock final puede variar en relacion de la combinacion
                    entre color y almacenamiento
                  </p>
                  <li>
                    <b>Estado |</b> {product.estado}
                  </li>
                </div>
                <div className="listProductDetail">
                  <Form.Label>Color</Form.Label>
                  <Form.Select
                    size="sm"
                    value={selectedColor?.nombre}
                    onChange={handleColorChange}
                  >
                    {product?.color?.map((c, index) => {
                      return <option key={index}>{c.nombre}</option>;
                    })}
                  </Form.Select>
                </div>
                {product?.modelo && product.modelo.length > 0 && (
                  <div className="listProductDetail">
                    <Form.Label>Modelo/s</Form.Label>
                    <Form.Select
                      size="sm"
                      value={product?.modelo}
                      onChange={handleModelChange}
                    >
                      {product.modelo.map((c, index) => {
                        return <option key={index}>{c.nombre}</option>;
                      })}
                    </Form.Select>
                  </div>
                )}

                {product?.almacenamiento &&
                  product.almacenamiento.length > 0 && (
                    <div className="listProductDetail">
                      <Form.Label>Almacenamiento</Form.Label>
                      <Form.Select
                        size="sm"
                        value={selectedStorage?.capacidad}
                        onChange={handleStockChange}
                      >
                        {product.almacenamiento.map((c, index) => {
                          return <option key={index}>{c.capacidad}</option>;
                        })}
                      </Form.Select>
                    </div>
                  )}
              </ul>
              <b>Descripción</b>
              <p>{product.descripcion}</p>
            </div>
            <div className="productsOptions">
              <div className="share-favorite">
                <Tooltip title="Agregar a Favoritos">
                  <IconButton
                    onClick={(e) => {
                      setOpen(false);
                      setTimeout(
                        () => {
                          addToFav(
                            productItem.nombre,
                            productItem.imagen,
                            productItem._id,
                            productItem.precio,
                            null,
                            null,
                            e,
                            setFavProducts,
                            productItem.stock
                          );
                          handleFavoritesState();
                          handleClickShare(
                            handleFavoritesState().length
                              ? "Añadido a favoritos"
                              : "Eliminado de favoritos"
                          );
                        },
                        open ? 100 : 0
                      );
                    }}
                  >
                    <FavoriteIcon className="text-black" />
                  </IconButton>
                </Tooltip>
                <CopyToClipboard text={window.location.href}>
                  <Tooltip
                    onClick={() => {
                      setOpen(false);
                      setTimeout(
                        () => {
                          handleClickShare("Link copiado al portapapeles");
                        },
                        open ? 100 : 0
                      );
                    }}
                    title="Compartir"
                  >
                    <IconButton>
                      <ShareIcon className="text-black" />
                    </IconButton>
                  </Tooltip>
                </CopyToClipboard>

                <Snackbar
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleCloseSnackbar}
                >
                  <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    {messageAlert}
                  </Alert>
                </Snackbar>
              </div>
              <div className="detailPayment">
                <h5>
                  $
                  {selectedStorage
                    ? Math.round(selectedStorage.precio * values.dolarBlue)
                    : Math.round(product.precioBase * values.dolarBlue)}
                </h5>
                <Form className="formDetailProduct">
                  <Form.Group className="selectInput">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Select
                      size="sm"
                      value={quantity}
                      onChange={(e) => handlerQuantity(e)}
                    >
                      {[...Array(product.stockGeneral)].map((e, i) => (
                        <option value={i + 1} key={i}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <div className="total">
                    Total:{" "}
                    <span>
                      $
                      {Math.round(
                        product?.precioBase * values.dolarBlue * quantity
                      )}
                    </span>
                  </div>
                  {user ? (
                    <Link to="/cart">
                      <Button variant="contained">Comprar</Button>
                    </Link>
                  ) : (
                    <>
                      <Button variant="contained" disabled>
                        Comprar
                      </Button>
                      <p className="userexist">
                        *Debe estar logueado para comprar
                      </p>
                    </>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartOutlinedIcon />}
                    onClick={(e) => {
                      setOpen(false);
                      setTimeout(
                        () => {
                          handleAddToCart(handleClickShare);
                          handleCartState().length
                            ? "Añadido al carrito"
                            : "Eliminado del carrito";
                        },
                        open ? 100 : 0
                      );
                    }}
                  >
                    Añadir al carrito
                  </Button>
                </Form>
              </div>
            </div>
          </>
        )}
      </div>
      <Divider />
    </div>
  );
}
