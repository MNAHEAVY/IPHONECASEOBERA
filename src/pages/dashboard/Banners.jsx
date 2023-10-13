import axios from "axios";
import { useEffect, useState } from "react";

export default function Banners() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await axios.get(
          "https://iphonecaseoberab-production.up.railway.app/banners"
        );
        setBanners(response.data);
      } catch (error) {
        console.error("Error al obtener los banners:", error);
      }
    }

    fetchBanners();
  }, []);

  const updateImageBy_id = async (_id, newImage) => {
    try {
      await axios.put(
        `https://iphonecaseoberab-production.up.railway.app/banners/${_id}`,
        { imagen: newImage }
      );
      // Actualiza el estado de los banners después de la edición
      setBanners((prevBanners) => {
        const newBanners = [...prevBanners];
        const index = newBanners.findIndex((banner) => banner._id === _id);
        if (index !== -1) {
          newBanners[index].imagen = newImage;
        }
        return newBanners;
      });
    } catch (error) {
      console.error("Error al actualizar la imagen:", error);
    }
  };

  const handleImageChange = (_id) => {
    const newImageUrl = prompt("Introduce la nueva URL de la imagen:");
    if (newImageUrl) {
      updateImageBy_id(_id, newImageUrl);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem",
      }}
    >
      <h4>Editor de Banners</h4>
      <p>Recuerda que cada banner debe tener unas med_idas aproximadas de 1280 x 720</p>

      {banners.map((banner, index) => (
        <div key={banner._id}>
          <img
            style={{ w_idth: "auto", height: "26vh" }}
            src={banner.imagen}
            alt={`Sl_ide ${index + 1}`}
          />
          <button onClick={() => handleImageChange(banner._id)}>Cambiar Imagen</button>
        </div>
      ))}
    </div>
  );
}
