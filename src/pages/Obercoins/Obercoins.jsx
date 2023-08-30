import react, { useEffect } from "react";
import vid from "../../assets/large.mp4";
import coins from "../../assets/coins.png";
import asks from "../../assets/asks.png";
import get from "../../assets/getiphone.png";
import gears from "../../assets/gears.png";
import "./Obercoins.css";
import { Link, useLocation } from "react-router-dom";

export default function Obercoins() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 40); // Restaurar el desplazamiento al cambiar de página
  }, [location]);

  return (
    <div className='custom-cursor'>
      <div className='obercontainA'>
        <h1 className='tittles'>Te traemos los Obercoins</h1>
        <div>
          <video src={vid} autoPlay loop />
        </div>
        <h2 className='subtitle'>Alcanza con nosotros tu iPhone</h2>
      </div>
      <div className='obercontainB'>
        <div className='leftcontain'>
          <div className='subcontain'>
            <div className='head'>
              <h2 className='header'>Que son los Obercoins?</h2>
            </div>
            <ul className='oberlist'>
              <li>
                ¡Te presentamos una oportunidad única! Con nuestra propuesta, podrás
                acceder de manera rápida y segura a tu primer iPhone o actualizar tu
                modelo actual.
              </li>
              <li>
                Los Obercoins representan una inversión destinada a adquirir el equipo que
                mejor se adapte a tus necesidades.
              </li>
              <li>
                Estamos introduciendo un innovador sistema de puntos que te permitirá
                mantener el valor de tus pagos y alcanzar tus metas de manera efectiva
              </li>
              <li>
                ¿Cuál es el objetivo? Disponer de toda nuestra gama de equipos listos para
                entrega inmediata una vez hayas alcanzado el puntaje requerido.{" "}
              </li>
            </ul>
          </div>

          <div className='subcontain'>
            <div className='head'>
              <h2 className='header'>Como funciona?</h2>
            </div>
            <ul className='oberlist'>
              <li>
                La dinámica es sencilla: puedes adquirir tu iPhone una vez hayas acumulado
                suficientes Obercoins para cubrir su valor.{" "}
              </li>
              <li>
                <li>
                  Nuestro sistema de pagos te brinda la posibilidad de convertir tu dinero
                  en Obercoins.
                </li>
                <li>
                  Estos Obercoins tienen un valor establecido y se mantienen en tu cuenta
                  a medida que sigues acumulando.{" "}
                </li>
              </li>
              <li>
                A través de este sistema, te garantizamos la seguridad de obtener un
                dispositivo, al mismo tiempo que creas una suerte de reserva que conserva
                su valor y te acerca cada vez más a la obtención de tu equipo deseado
              </li>
            </ul>
          </div>
        </div>

        <div className='rightcontain'>
          <div className='imgleft'>
            <img className='oberimghandup' src={coins} />
            <img className='oberimghandup' src={asks} />
          </div>

          <div className='imgright'>
            <img className='oberimghandup' src={get} />
            <h6 className='texts'>Acercate al tuyo!</h6>
          </div>
        </div>
      </div>
      <div className='obercontainC'>
        <div className='underpart'>
          <h2 className='texts'>Aún estamos trabajando para que esto suceda</h2>
          <img className='oberimggears' src={gears} />
          <p className='pharaph'>Contamos con vos muy pronto...</p>
          <br />
          <Link id='back-button' to='/'>
            Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
