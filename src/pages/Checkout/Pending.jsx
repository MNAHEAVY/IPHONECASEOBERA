import React from "react";

export default function Pending() {
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
          Estamos procesando tu pago
        </h3>
        <h3
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "teal",
          }}
        >
          Un representante de nuestro equipo se pondra en contacto en breve
        </h3>
      </div>
      <img
        style={{ width: "100%", objectFit: " cover", height: "100vh" }}
        src='https://res.cloudinary.com/deqxuoyrc/image/upload/v1681659356/IPHONECASEOBERA/background_khw6hk.png'
      />
    </>
  );
}
