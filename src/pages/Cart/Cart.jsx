import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmptyCart from "../empty/emptyCart";
import { Box, Grid } from "@mui/material";
import "./Cart.css";
import Button from "react-bootstrap/Button";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import LocalAtmTwoToneIcon from "@mui/icons-material/LocalAtmTwoTone";

export default function Cart() {
  const [favProducts, setFavProducts] = useState(
    JSON.parse(localStorage.getItem("cartList"))
  );

  const prodFavs = favProducts;

  const deleteFav = (id) => {
    let arr = favProducts.filter((prod) => prod._id !== id);
    localStorage.setItem("cartList", JSON.stringify(arr));
    setFavProducts(arr);
  };

  if (!favProducts || favProducts.length === 0) {
    return <EmptyCart />;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <br />
      <h1 id="centering">Tu Carrito esta listo!!</h1>
      <h2 class="h2">Accede a tu compra!</h2>
      <br />
      <Grid container sparcing={2}>
        <br />
        {prodFavs?.map((item) => (
          <Grid item xs={2}>
            <div id="delButton">
              <button onClick={() => deleteFav(item._id)}>
                <RemoveCircleTwoToneIcon />
              </button>
            </div>
            <div id="smallCard">
              <Link className="noShadow" to={"/detalle/" + item._id}>
                <div id="centering">
                  <img id="favImg" src={item.imagen[0]} loading="lazy" />
                </div>
                <div id="centering">
                  <h5>{item.nombre}</h5>
                  <h5>${(item.precio[0] * 380).toFixed(2)}</h5>
                  <h5>{item.marca}</h5>
                </div>
                <br />
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
      <span id="buyButton">
        <Button size="lg" variant="dark">
          <LocalAtmTwoToneIcon />
          |Comprar
        </Button>
      </span>
    </Box>
  );
}
