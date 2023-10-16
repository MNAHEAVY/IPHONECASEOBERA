import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavsItemAction } from "../../redux/actions";
import EmptyFav from "../empty/emptyFav";
import { Box, Grid, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import BackButton from "../Button/Back";
import "../Cart/Cart.css";

export default function Favorites() {
  const favs = useSelector((state) => state.favorites);
  const prods = useSelector((state) => state.products);
  const values = useSelector((state) => state.values);
  const user = useSelector((state) => state.checkUser);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteFav = (favoriteId) => {
    const userId = user._id;
    dispatch(deleteFavsItemAction(userId, favoriteId));
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading, favs]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BackButton />
      {favs.length <= 0 ? (
        <EmptyFav />
      ) : (
        <>
          <Typography variant='h4' align='center'>
            Todos tus Favoritos
          </Typography>
          <Typography cvariant='h5' align='center'>
            Te están esperando!
          </Typography>

          <Grid container spacing={2}>
            {favs.map((favorite) => {
              const product = prods.find((p) => p._id === favorite.product);

              if (product) {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={favorite._id}>
                    <div className='cart-item'>
                      <button
                        className='delete-button'
                        onClick={() => handleDeleteFav(favorite._id)}
                      >
                        <RemoveCircleTwoToneIcon />
                      </button>
                      <Link className='noShadow' to={"/detalle/" + product._id}>
                        <img
                          className='item-image'
                          src={product.imagenGeneral[0]}
                          loading='lazy'
                          alt={product.nombre}
                        />

                        <div className='item-details'>
                          <Typography>{product.nombre}</Typography>
                          <Typography>{product.marca}</Typography>
                          <Typography>
                            $
                            {Math.round(
                              (product.precioBase * values.dolarBlue).toLocaleString(
                                "es-AR",
                                { useGrouping: true }
                              )
                            )}
                          </Typography>
                        </div>
                      </Link>
                    </div>
                  </Grid>
                );
              }
              return null;
            })}
          </Grid>
        </>
      )}
      <ToastContainer />
    </Box>
  );
}
