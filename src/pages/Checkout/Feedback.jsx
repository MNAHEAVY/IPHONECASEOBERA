import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Carousel from "react-bootstrap/Carousel";
import { useParams } from "react-router-dom";

export default function Feedback() {
  const {
    collection_id,
    collection_status,
    payment_id,
    status,
    external_reference,
    payment_type,
    merchant_order_id,
    preference_id,
    site_id,
    processing_mode,
    merchant_account_id,
  } = useParams();

  // Ahora puedes utilizar estos valores en tu componente
  console.log("collection_id:", collection_id);
  console.log("collection_status:", collection_status);
  console.log("payment_id:", payment_id);
  console.log(" status:", status);
  console.log("external_reference:", external_reference);
  console.log("payment_type:", payment_type);
  console.log("merchant_order_id:", merchant_order_id);
  console.log("preference_id:", preference_id);
  console.log("site_id:", site_id);
  console.log(" processing_mode:", processing_mode);
  console.log("merchant_account_id:", merchant_account_id);

  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        Gracias por tu compra
      </Typography>

      <Carousel className='containerCarousel2' variant='dark'>
        <img
          className='imageCarousel2'
          src='https://res.cloudinary.com/deqxuoyrc/image/upload/v1681659356/IPHONECASEOBERA/background_khw6hk.png'
          alt='First slide'
        />
      </Carousel>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h5' gutterBottom sx={{ mt: 2 }}>
            {" "}
            Nuestro equipo se pondra en contacto contigo a la brevedad
          </Typography>
          <Grid>
            <Typography gutterBottom>Iphone Case Obera</Typography>
            <img src='https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png'></img>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
