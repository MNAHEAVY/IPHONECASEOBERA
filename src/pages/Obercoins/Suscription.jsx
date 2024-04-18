import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import vid from "../../assets/logo.png";
import { useSearchParams } from "react-router-dom";

export default function Suscription() {
  const [loading, setLoading] = useState(true);
  const buyer = useSelector((state) => state.checkUser);
  const [searchParams] = useSearchParams();
  const parametro = searchParams.get("parametro");

  useEffect(() => {
    const sendSubscriptionData = async () => {
      const buyerData = {
        payer: buyer,
        parametro: parametro, // Incluye el parámetro del path en el objeto de datos
      };
      try {
        const response = await fetch(
          "https://iphonecaseoberab-production.up.railway.app/suscription",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(buyerData),
          }
        );
        const responseData = await response.json();
        console.log("Response Data:", responseData);
      } catch (error) {
        console.error(error);
        throw new Error("Error al enviar los datos");
      } finally {
        setLoading(false);
      }
    };

    if (buyer) {
      sendSubscriptionData();
    } else {
      setLoading(false);
    }
  }, [buyer, parametro]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='containA'>
      <img className='member' src={vid} alt='membresia' />
      <h1 className='titutles'>Bienvenido al equipo...</h1>
      <h2 className='subtitle-sub'>¡Gracias! ¡Tus beneficios ya están activos!</h2>
      <h4 className='subtit'>¡Mantente atento a nuestras actualizaciones!</h4>
      <a href='/'>
        <button class='bn53'>Inicio</button>
      </a>
      <div className='shadow'></div>
    </div>
  );
}
