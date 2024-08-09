import axios from "axios";
import Slider from "react-slick";
import "./Carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imageOne from "../../assets/a.jpg";
import imageTwo from "../../assets/Iph.png";
import imageThree from "../../assets/c.jpg";
import { useEffect, useState } from "react";

export default function SlickSlider() {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className='pb-16'
      style={{
        minHeight: "0",
        minWidth: "0",
      }}
    >
      <Slider {...settings}>
        {banners.length > 0 ? (
          banners.map((banner, index) => (
            <div key={banner._id}>
              {banner.tipo === "video" ? (
                <video src={banner.imagen} autoPlay loop />
              ) : (
                <img
                  src={banner.imagen || getDefaultImage(index)}
                  alt={`Slide ${index + 1}`}
                />
              )}
            </div>
          ))
        ) : (
          <div className='w-full'>
            <img
              src={imageOne}
              alt='Default Slide'
              className='w-full h-auto object-cover'
            />
          </div>
        )}
      </Slider>{" "}
    </div>
  );

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
