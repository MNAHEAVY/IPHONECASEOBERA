import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCartItemAction } from "../../redux/actions";
import EmptyCart from "../empty/emptyCart";
import { Box, Grid, Typography, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import LocalAtmTwoToneIcon from "@mui/icons-material/LocalAtmTwoTone";
import BackButton from "../Button/Back";
import "./Cart.css";

export default function Cart() {
  const user = useSelector((state) => state.checkUser);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDeleteCartItem = (itemId) => {
    const userId = user._id;
    dispatch(deleteCartItemAction(userId, itemId));
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading, cartItems]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BackButton />
      {cartItems.length <= 0 ? (
        <EmptyCart />
      ) : (
        <>
          <Typography variant='h4' align='center'>
            Tu Carrito está listo!!
          </Typography>
          <Typography variant='h5' align='center'>
            Accede a tu compra!
          </Typography>

          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                <div className='cart-item'>
                  <button
                    className='delete-button'
                    onClick={() => handleDeleteCartItem(item._id)}
                  >
                    <RemoveCircleTwoToneIcon />
                  </button>
                  <Link className='item-link' to={"/detalle/" + item?.product}>
                    <img
                      className='item-image'
                      src={item.image}
                      loading='lazy'
                      alt={item.name}
                    />
                    <div className='item-details'>
                      <Typography variant='h6'>{item.name}</Typography>
                      <Typography variant='subtitle1'>{item.color}</Typography>
                      <Typography variant='h5'>${item.price}</Typography>
                    </div>
                  </Link>
                </div>
              </Grid>
            ))}
          </Grid>
          <div className='buy-button'>
            {user ? (
              <Button size='large' variant='contained'>
                <Link className='link-normal' to='/payment'>
                  <LocalAtmTwoToneIcon /> Comprar
                </Link>
              </Button>
            ) : (
              <div className='user-exist-block'>
                <Button size='large' variant='contained' disabled>
                  <Link className='link-normal' to='/payment'>
                    <LocalAtmTwoToneIcon /> Comprar
                  </Link>
                </Button>
                <Typography variant='subtitle1'>
                  *Debe estar logueado para comprar
                </Typography>
              </div>
            )}
          </div>
          <ToastContainer />
        </>
      )}
    </Box>
  );
}
