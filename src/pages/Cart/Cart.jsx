import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCartItemAction } from "../../redux/actions";
import EmptyCart from "../empty/emptyCart";
import { Box, Grid } from "@mui/material";
import "./Cart.css";
import Button from "react-bootstrap/Button";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import LocalAtmTwoToneIcon from "@mui/icons-material/LocalAtmTwoTone";
import BackButton from "../Button/Back";

export default function Cart() {
  const user = useSelector((state) => state.checkUser);
  const dispatch = useDispatch();

  const carro = useSelector((state) => state.checkUser.cart);

  useEffect(() => {}, []);
  const handleDeleteCartItem = (itemId) => {
    const userId = user._id;
    dispatch(deleteCartItemAction(userId, itemId));
  };

  if (!carro || carro.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <br />
      <BackButton />
      <h1 id="centering">Tu Carrito está listo!!</h1>
      <h2 className="h2">Accede a tu compra!</h2>
      <br />
      <Grid container spacing={2}>
        <br />
        {carro.map((item) => (
          <Grid item xs={2} key={item._id}>
            <div id="delButton">
              <button onClick={() => handleDeleteCartItem(item._id)}>
                <RemoveCircleTwoToneIcon />
              </button>
            </div>
            <div id="smallCard">
              <Link className="noShadow" to={"/detalle/" + item?.product}>
                <div id="centering">
                  <img
                    id="favImg"
                    src={item.image}
                    loading="lazy"
                    alt={item.name}
                  />
                </div>
                <div id="centering">
                  <h5>{item.name}</h5>
                  <h5>${item.price}</h5>
                  <h5>{item.color}</h5>
                </div>
                <br />
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
      <span id="buyButton">
        {user ? (
          <Button size="lg" variant="dark">
            <Link className="linkNormal" to="/payment">
              <LocalAtmTwoToneIcon />
              |Comprar
            </Link>
          </Button>
        ) : (
          <div className="userexistb">
            <Button size="lg" variant="dark" disabled>
              <Link className="linkNormal" to="/payment">
                <LocalAtmTwoToneIcon />
                |Comprar
              </Link>
            </Button>
            <p>*Debe estar logueado para comprar</p>
          </div>
        )}
      </span>
    </Box>
  );
}
