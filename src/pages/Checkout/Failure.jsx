import React from "react";

export default function Failure() {
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
          Esperamos que puedas encontrar el producto que buscas
        </h3>
        <h3
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "teal",
          }}
        >
          Ante cualquier duda no dudes en comunicarte con nosotros
        </h3>
      </div>
      <img
        style={{ width: "100%", objectFit: " cover", height: "100vh" }}
        src='https://res.cloudinary.com/deqxuoyrc/image/upload/v1681659356/IPHONECASEOBERA/background_khw6hk.png'
      />
    </>
  );
}
