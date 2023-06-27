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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const userCheck = useSelector((state) => state.checkUser);

  useEffect(() => {
    dispatch(getValues());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductById(id)).then(() => setLoading(false));
  }, [dispatch]);

  const getDefaultValues = () => {
    const defaultValues = {
      nombre: product.nombre,
      imagen: product.imagenGeneral?.[0],
      stock: product.stockGeneral,
      color: product.color?.[0].nombre,
      productId: product._id,
      cantidad: quantity,
      modelo: "",
      capacidad: "",
    };

    if (selectedModel && selectedModel.imageModel) {
      defaultValues.imagen = selectedModel.imageModel;
      defaultValues.modelo = selectedModel.nombre;
      defaultValues.stock = selectedModel.stockModel;
      defaultValues.precio = (selectedModel.precio * values.dolarBlue).toFixed(
        2
      );
    } else if (selectedColor && selectedColor.imageColor) {
      defaultValues.imagen = selectedColor.imageColor;
      defaultValues.color = selectedColor.nombre;
      defaultValues.stock = selectedColor.stockColor;
    }

    if (selectedStorage) {
      defaultValues.stock = selectedStorage.stockStorage;
      defaultValues.precio = (
        selectedStorage.precio * values.dolarBlue
      ).toFixed(2);
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

  console.log(defaultValues);
  //controladores de color/model/storage/cantidad//
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
    console.log("este", model);
  };

  const handlerQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  //controladores de color/model/storage/cantidad//

  const handleAddToFavorites = () => {
    const userId = userCheck._id;
    const productId = defaultValues.productId;
    dispatch(addToFavorites(productId, userId));
  };

  const handleAddToCart = () => {
    const userId = userCheck._id;
    dispatch(addToCart(defaultValues, userId));
  };

  //logica para el cart & favs//

  // Alert Logic
  const [open, setOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  const handleClickShare = (message) => {
    setMessageAlert(message);
    setOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason !== "clickaway") {
      setOpen(false);
    }
  };

  // Alert Logic
  return (
    <div className="containerDetails">
      <div className="principalData">
        <BackButton />
        {loading ? ( // show loading component if still loading
          <Loading />
        ) : (
          <>
            {selectedModel && selectedModel.imageModel ? (
              <img
                style={{ width: "20rem", height: "26rem" }}
                className="imageDetail"
                src={selectedModel.imageModel}
                alt=""
              />
            ) : selectedColor && selectedColor.imageColor ? (
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
                      value={selectedModel?.modelo}
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
                    onClick={() => {
                      handleAddToFavorites();
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
                    onClick={() => {
                      handleAddToCart();
                    }}
                  >
                    Añadir al carrito
                  </Button>
                </Form>
              </div>
            </div>
            <ToastContainer />
          </>
        )}
      </div>
      <Divider />
    </div>
  );
}
