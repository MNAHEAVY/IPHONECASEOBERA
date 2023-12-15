import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

export default function Feedback() {
  const [loading, setLoading] = useState(true);
  const buyer = useSelector((state) => state.checkUser);
  const products = useSelector((state) => state.cart);

  useEffect(() => {
    const sendFeedbackData = async () => {
      const buyerData = {
        items: products,
        payer: buyer,
      };
      try {
        const response = await fetch(
          "https://iphonecaseoberab-production.up.railway.app/payment_success",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(buyerData),
          }
        );
        const preference = await response.json();
        console.log("Preference ID:", preference.preferenceId);
      } catch (error) {
        console.error(error);
        throw new Error("Error al enviar los datos");
      } finally {
        setLoading(false);
      }
    };

    if (buyer && products && products.length > 0) {
      sendFeedbackData(); // Call the function when the component mounts
    } else {
      setLoading(false); // Set loading to false if there's no data to send
    }
  }, [buyer, products]);

  if (loading) {
    return <Loading />; // You can replace this with your loading indicator
  }

  return (
    <>
      <div
        style={{
          left: "30%",
          position: " absolute",
          display: "flex",
          justifyContent: " center",
          alignItems: "center",
          flexDirection: "column",
          alignContent: "center",
          flexWrap: "nowrap",
        }}
      >
        {" "}
        <h3
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            color: "teal",
          }}
        >
          Gracias por tu compra
        </h3>
        <h3
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "teal",
          }}
        >
          Nuestro equipo se pondrá en contacto contigo a la brevedad
        </h3>
      </div>
      <img
        style={{ width: "100%", objectFit: " cover", height: "100vh" }}
        src='https://res.cloudinary.com/deqxuoyrc/image/upload/v1681659356/IPHONECASEOBERA/background_khw6hk.png'
      />
    </>
  );
}
