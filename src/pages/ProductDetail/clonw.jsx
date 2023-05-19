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

  const [defaultValues, setDefaultValues] = useState({
    nombre: product.nombre,
    imagen: product.imagenGeneral[0],
    stock: product.stockGeneral,
    color: product.color[0].nombre,
    id: null,
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
      id: null,
      precio: selectedStorage
        ? (selectedStorage.precio * 470).toFixed(2)
        : (product.precioBase * 470).toFixed(2),
    });
  }, [product, selectedColor, selectedStorage]);

  
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
      defaultValues.id,
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
    <div> <Form>
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
    
  );
}
