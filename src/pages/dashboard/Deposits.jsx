import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./dashboard.css";

function preventDefault(event) {
  event.preventDefault();
}
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);
hoy.toDateString();
console.log(hoy.toDateString());

export default function Deposits() {
  const user = useSelector((state) => state.checkUser);
  return (
    <React.Fragment>
      <Title>Bienvenido {user.name}!!</Title>
      <CardMedia
        id='logo-b'
        component='img'
        height='100px'
        image='https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png'
        alt='IphoneCaseObera'
      />
      <br />
      <Typography color='text.secondary' sx={{ flex: 1 }}>
        {hoy.toDateString()}
      </Typography>
      <div>
        <Link to='/'>Volver al inicio</Link>
      </div>
    </React.Fragment>
  );
}
