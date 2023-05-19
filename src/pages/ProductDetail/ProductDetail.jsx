import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductDetail.css";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import iph from "../../../iPhone.json";
import { addToFav, addToCart, getCartItems } from "../Cards/Fav&Cart";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function ProductDetail() {
  const product = iph.iphone[0];
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth0();

  const [defaultValues, setDefaultValues] = useState({
    nombre: product.nombre,
    imagen: product.imagenGeneral[0],
    stock: product.stockGeneral,
    color: product.color[0].nombre,
    _id: 5677567,
    precio: (product.precioBase * 470).toFixed(2),
  });

  // Actualiza los valores predeterminados si el producto cambia
  useEffect(() => {
    setDefaultValues({
      nombre: product.nombre,
      imagen: selectedColor
        ? selectedColor.imageColor
        : product.imagenGeneral[0],
      stock: selectedStorage
        ? selectedStorage.stockStorage
        : product.stockGeneral,
      color: selectedColor ? selectedColor.nombre : product.color[0].nombre,
      _id: 5677567,
      precio: selectedStorage
        ? (selectedStorage.precio * 470).toFixed(2)
        : (product.precioBase * 470).toFixed(2),
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
  const handlerQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleCartState = () => {
    const cart = getCartItems(); // Reemplaza esta línea con tu lógica para obtener el carrito
    return cart;
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
  const [open, setOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const handleClickSnackbar = (message) => {
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
        {selectedColor ? (
          <img className="imageDetail" src={selectedColor.imageColor} alt="" />
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
                <b>Precio |</b>{" "}
                {selectedStorage
                  ? selectedStorage.precio * 470
                  : product.precioBase * 470}
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
                *El stock final puede variar en relacion de la combinacion entre
                color y almacenamiento
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
            <div className="listProductDetail">
              <Form.Label>Almacenamiento</Form.Label>
              <Form.Select
                size="sm"
                value={selectedStorage?.capacidad}
                onChange={handleStockChange}
              >
                {product?.almacenamiento?.map((c, index) => {
                  return <option key={index}>{c.capacidad}</option>;
                })}
              </Form.Select>
            </div>
          </ul>
          <b>Descripción</b>
          <p>{product.descripcion}</p>
        </div>
        <div className="productsOptions">
          <div className="detailPayment">
            <h5>${(product?.precioBase[0] * 470).toFixed(2)}</h5>
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
                  ${(product?.precioBase * 470 * quantity).toFixed(2)}
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
                  <p className="userexist">*Debe estar logueado para comprar</p>
                </>
              )}

              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartOutlinedIcon />}
                onClick={handleCartClick}
              >
                Añadir al carrito
              </Button>
            </Form>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleCloseSnackbar} severity="success">
              {messageAlert}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}
