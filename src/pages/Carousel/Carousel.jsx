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
  }, []); // El segundo argumento vacío asegura que la solicitud se realice solo una vez al cargar el componente

  return (
    <Carousel className='containerCarousel' variant='dark'>
      <Carousel.Item interval={3000}>
        <video
          className='imageCarousel'
          src={banners[0]?.imagen}
          autoPlay={true}
          loop={true}
        />
        {/* <img
          className='imageCarousel'
          src={banners[0]?.imagen || imageOne}
          alt='First slide'
        /> */}
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img
          className='imageCarousel'
          src={banners[1]?.imagen || imageTwo}
          alt='Second slide'
        />
      </Carousel.Item>

      <Carousel.Item interval={3000}>
        <img
          className='imageCarousel'
          src={banners[2]?.imagen || imageThree}
          alt='Third slide'
        />
      </Carousel.Item>
    </Carousel>
  );
}
