import axios from "axios";
import { useEffect, useState } from "react";

// Componente de Banner
function Banner({ banner, index, onimagenChange }) {
  return (
    <div>
      {banner.tipo === "video" ? (
        // Banner de video
        <video src={banner.imagen} controls autoPlay loop>
          Tu navegador no admite la reproducción de videos.
        </video>
      ) : (
        // Banner de imagen
        <img
          style={{ width: "auto", height: "26vh" }}
          src={banner.imagen}
          alt={`Slide ${index + 1}`}
        />
      )}
      <button onClick={() => onimagenChange(banner._id)}>Cambiar Multiimagen</button>
    </div>
  );
}

// Componente Banners
export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(banners);
  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await axios.get(
          "https://iphonecaseoberab-production.up.railway.app/banners"
        );
        setBanners(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los banners:", error);
        setLoading(false);
      }
    }

    fetchBanners();
  }, []);

  const updateimagenById = async (_id, newimagen) => {
    try {
      await axios.put(
        `https://iphonecaseoberab-production.up.railway.app/banners/${_id}`,
        {
          imagen: newimagen,
        }
      );
      // Actualiza el estado de los banners después de la edición
      setBanners((prevBanners) => {
        const newBanners = [...prevBanners];
        const index = newBanners.findIndex((banner) => banner._id === _id);
        if (index !== -1) {
          newBanners[index].imagen = newimagen;
        }
        return newBanners;
      });
    } catch (error) {
      console.error("Error al actualizar la multiimagen:", error);
    }
  };

  const handleimagenChange = (_id) => {
    const newimagenUrl = prompt("Introduce la nueva URL de la multiimagen:");
    if (newimagenUrl) {
      updateimagenById(_id, newimagenUrl);
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
      <p>Recuerda que cada banner debe tener unas medidas aproximadas de 1280p x 480p</p>

      {loading ? (
        <p>Cargando banners...</p>
      ) : (
        banners.map((banner, index) => (
          <Banner
            key={banner._id}
            banner={banner}
            index={index}
            onimagenChange={handleimagenChange}
          />
        ))
      )}
    </div>
  );
}
