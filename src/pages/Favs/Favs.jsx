import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import "./Favs.css";
import { deleteFavsItemAction } from "../../redux/actions";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import BackButton from "../Button/Back";
import EmptyFav from "../empty/emptyFav"; // Asegúrate de importar el componente EmptyFav si aún no lo has hecho
import { ToastContainer } from "react-toastify";

export default function Favorites() {
  const favs = useSelector((state) => state.favorites);
  const prods = useSelector((state) => state.products);
  const values = useSelector((state) => state.values);
  const user = useSelector((state) => state.checkUser);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const deleteFav = (favoriteId) => {
    const userId = user._id;
    dispatch(deleteFavsItemAction(userId, favoriteId));
    setLoading(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <br />
      <BackButton />
      {favs.length <= 0 ? (
        <EmptyFav />
      ) : (
        <>
          <h1 id='centering'>Todos tus Favoritos</h1>
          <h2 className='h2'>Te están esperando!</h2>
          <br />
          <Grid container spacing={2}>
            <br />
            {favs.map((favorite) => {
              const product = prods.find((p) => p._id === favorite.product);

              if (product) {
                return (
                  <Grid item xs={2} key={favorite._id}>
                    <div id='delButton'>
                      <button onClick={() => deleteFav(favorite._id)}>
                        <RemoveCircleTwoToneIcon />
                      </button>
                    </div>
                    <div id='smallCard'>
                      <Link className='noShadow' to={"/detalle/" + product._id}>
                        <div id='centering'>
                          <img
                            id='favImg'
                            src={product.imagenGeneral[0]}
                            loading='lazy'
                            alt={product.nombre}
                          />
                        </div>
                        <div id='centering'>
                          <h5>{product.nombre}</h5>
                          <h5>${(product.precioBase * values.dolarBlue).toFixed(2)}</h5>
                          <h5>{product.marca}</h5>
                        </div>
                      </Link>
                    </div>
                  </Grid>
                );
              }

              return null;
            })}
          </Grid>
          <ToastContainer />
        </>
      )}
    </Box>
  );
}
