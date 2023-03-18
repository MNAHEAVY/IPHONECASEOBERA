import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductById } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";

// Components
import { addToFav, addToCart } from "../Cards/Fav&Cart";
// Styles
import Carousel from "react-bootstrap/Carousel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function ProductDetail({ handleAdded, handleNotAdded }) {
  // Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const instrumentItem = useSelector((state) => state.prodById);
  const { _id, nombre, precio, imagen, marca, color } = instrumentItem
    ? instrumentItem
    : {};
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch]);

  // Alert Logic
  const [open, setOpen] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function handlerQuantity(e) {
    addToCart(
      _id,
      nombre,
      precio,
      imagen,
      marca,
      color,
      handleAdded,
      handleNotAdded
    );
    const localStoreList = JSON.parse(localStorage.getItem("cartList"));
    const localStoreItem = localStoreList.find((item) => item.id === _id);
    localStoreItem.quantity = e.target.value;
    localStorage.setItem("cartList", JSON.stringify(localStoreList));
    setQuantity(e.target.value);
  }
  const imgs = instrumentItem.imagen;

  console.log(instrumentItem);

  return (
    <div className="containerDetails">
      <div className="principalData">
        <Carousel variant="dark">
          {imgs.map((img, index) => {
            return (
              <Carousel.Item interval={3000} key={index}>
                <img className="imageDetail" src={img} alt="" />
              </Carousel.Item>
            );
          })}
        </Carousel>

        <div className="productData">
          <h3>{instrumentItem.nombre}</h3>
          <p>{instrumentItem.descripcion}</p>
          <ul>
            <div className="listProductDetail">
              <li>
                <b>Marca:</b> {instrumentItem.marca}
              </li>
              <li>
                <b>Stock:</b> {instrumentItem.stock}
              </li>
              <li>
                <b>Estado:</b> {instrumentItem.estado}
              </li>
            </div>
            <div className="listProductDetail">
              <li>
                <b>Color:</b> {instrumentItem.color}
              </li>
            </div>
          </ul>
        </div>

        <div className="productsOptions">
          <div className="share-favorite">
            <p>
              <FavoriteBorderOutlinedIcon
                onClick={() =>
                  addToFav(
                    id,
                    nombre,
                    precio,
                    imagen,
                    marca,
                    handleAdded,
                    handleNotAdded
                  )
                }
              />{" "}
              Favorite
            </p>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Link copied to clipboard
              </Alert>
            </Snackbar>
          </div>

          <div className="detailPayment">
            <h5>${instrumentItem.price}</h5>
            <Form className="formDetailProduct">
              <Form.Group className="selectInput">
                <Form.Label>Quantity</Form.Label>
                <Form.Select
                  size="sm"
                  value={quantity}
                  onChange={(e) => handlerQuantity(e)}
                >
                  {[...Array(instrumentItem.stock)].map((e, i) => (
                    <option value={i + 1} key={i}>
                      {i + 1}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div className="total">
                Total: <span>${instrumentItem.precio * quantity}</span>
              </div>
              <Link to="/cart">
                <Button variant="contained">Buy Now</Button>
              </Link>
              <Button
                onClick={() =>
                  addToCart(
                    id,
                    nombre,
                    precio,

                    imagen,
                    marca,
                    color,
                    handleAdded,
                    handleNotAdded
                  )
                }
                variant="outlined"
                startIcon={<ShoppingCartOutlinedIcon />}
              >
                Add to cart
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
}
