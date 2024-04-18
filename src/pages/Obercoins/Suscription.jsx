import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import vid from "../../assets/logo.png";

export default function Suscription() {
  const [loading, setLoading] = useState(true);
  const buyer = useSelector((state) => state.checkUser);

  // useEffect(() => {
  //   const sendSuscriptionData = async () => {
  //     const buyerData = {
  //       payer: buyer,
  //     };
  //     try {
  //       const response = await fetch(
  //         "https://iphonecaseoberab-production.up.railway.app/suscription",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(buyerData),
  //         }
  //       );
  //       const preference = await response.json();
  //       console.log("Preference ID:", preference.preferenceId);
  //     } catch (error) {
  //       console.error(error);
  //       throw new Error("Error al enviar los datos");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (buyer) {
  //     sendSuscriptionData(); // Call the function when the component mounts
  //   } else {
  //     setLoading(false); // Set loading to false if there's no data to send
  //   }
  // }, [buyer]);

  // if (loading) {
  //   return <Loading />; // You can replace this with your loading indicator
  // }

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
