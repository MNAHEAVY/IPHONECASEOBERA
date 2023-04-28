import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getValues } from "../../redux/actions";
import EmptyCart from "../empty/emptyCart";
import { Box, Grid } from "@mui/material";
import "./Cart.css";
import Button from "react-bootstrap/Button";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import LocalAtmTwoToneIcon from "@mui/icons-material/LocalAtmTwoTone";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../Button/Back";
import { useAuth0 } from "@auth0/auth0-react";

export default function Cart() {
  const dispatch = useDispatch();
  const [favProducts, setFavProducts] = useState(
    JSON.parse(localStorage.getItem("cartList"))
  );
  const values = useSelector((state) => state.values);
  const prodFavs = favProducts;
  const { user } = useAuth0();

  useEffect(() => {
    dispatch(getValues());
  }, [dispatch]);

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
      <BackButton />
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
                  <h5>${item.precio}</h5>
                  <h5>{item.marca}</h5>
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
            <Link id="linkNormal" to="/payment">
              <LocalAtmTwoToneIcon />
              |Comprar
            </Link>
          </Button>
        ) : (
          <div className="userexistb">
            <Button size="lg" variant="dark" disabled>
              <Link id="linkNormal" to="/payment">
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
