import axios from "axios";
import imageOne from "../../assets/a.jpg";
import imageTwo from "../../assets/Iph.png";
import imageThree from "../../assets/c.jpg";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";
import { useEffect, useState } from "react";

export default function Carrousel() {
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

  return (
    <Carousel className='containerCarousel' variant='dark'>
      {banners.length > 0 ? (
        banners.map((banner, index) => (
          <Carousel.Item key={banner._id} interval={3000}>
            {banner.tipo === "video" ? (
              // Banner de video
              <video className='imageCarousel' src={banner.imagen} autoPlay loop />
            ) : (
              // Banner de imagen
              <img
                className='imageCarousel'
                src={banner.imagen || getDefaultImage(index)}
                alt={`Slide ${index + 1}`}
              />
            )}
          </Carousel.Item>
        ))
      ) : (
        // Manejar el caso en que no hay banners cargados
        <Carousel.Item>
          <img className='imageCarousel' src={imageOne} alt='Default Slide' />
        </Carousel.Item>
      )}
    </Carousel>
  );

  // Función de utilidad para obtener una imagen por defecto según el índice
  function getDefaultImage(index) {
    switch (index) {
      case 0:
        return imageOne;
      case 1:
        return imageTwo;
      case 2:
        return imageThree;
      default:
        return null;
    }
  }
}
