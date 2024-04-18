import react, { useEffect } from "react";
import vid from "../../assets/logo.png";
import "./Obercoins.css";
import { Link, useLocation } from "react-router-dom";

export default function Obercoins() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 40); // Restaurar el desplazamiento al cambiar de página
  }, [location]);

  return (
    <div className='custom-cursor'>
      <div className='elemen'>
        <a href='/' className='ffllooaat'>
          <svg
            height='24'
            width='24'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 472.615 472.615'
          >
            <path d='m167.158 117.315-.001-77.375L0 193.619l167.157 153.679v-68.555c200.338.004 299.435 153.932 299.435 153.932 3.951-19.967 6.023-40.609 6.023-61.736 0-174.644-130.815-253.624-305.457-253.624' />
          </svg>
        </a>
        volver
      </div>
      <div className='obercontainA'>
        <img className='member' src={vid} alt='membresia' />
        <h1 className='tittles'>Te ofrecemos nuestra membresia</h1>
        <h2 className='subtitle'>
          Suscribite y disfrutá los mejores beneficios a un precio increíble.
        </h2>
        <div className='shadowB'></div>
        <div className='shadow'></div>
      </div>
      <div className='obercontainB'>
        {" "}
        <div className='leftcontain'>
          <div className='subcontain'>
            <div className='head'>
              <h2 className='header'>Cuales son mis beneficios?</h2>
            </div>
            <ul className='oberlist'>
              <li>
                ¡Te presentamos una oportunidad única! Con nuestra suscripcion, podrás
                acceder a nuestros sorteos mensuales de productos para tu ecosistema Apple
                🤩
              </li>
              <li>
                Los suscriptos tienen descuentos en todas sus compras desde el 10% al 20%
                🔥
              </li>
              <li>Envios gratis en compras superiores a $30.000 🚚</li>
              <li>
                ¿Cuál es el objetivo? generar una comunidad con beneficios para que logren
                una mayor integracion tecnologica 👨‍💻
              </li>
              <li>
                Descuentos sorpresa todos los meses en tus marcas favoritas, te agregamos
                a nuestra lista exclusiva 🛍️
              </li>
              <li>Ofertas exclusivas y descuentos especiales en tus compras✨ </li>
            </ul>
          </div>
        </div>
        <div className='rightcontain'>
          <div className='rightcont'>
            <div className='headTitle'>Suscripción mensual</div>
            <div className='partr'>a partir de</div>
            <div className='price'>
              <span className='totalPrice'>
                $ 1.399 <span className='period'>/mes </span>
              </span>
            </div>
          </div>
          <hr className='hrr' />
          <div>
            <div className='body-title'>Medios de pago</div>
            <div className='paymentmethods-v3__options'>
              <div className='paymentmethods-v3__option'>
                <div
                  className='paymentmethods-v3__icon'
                  style={{ width: "24px", height: "24px" }}
                >
                  <svg
                    style={{ width: "24px", height: "24px" }}
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M4.74902 22.75H9.24902V21.25H4.74902V22.75Z'
                      fill='rgba(0, 0, 0, 0.9)'
                      fill-opacity='0.9'
                    ></path>
                    <path
                      d='M15.249 22.75H10.749V21.25H15.249V22.75Z'
                      fill='rgba(0, 0, 0, 0.9)'
                      fill-opacity='0.9'
                    ></path>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M2.49902 4.75H29.499C30.7417 4.75 31.749 5.75736 31.749 7V25C31.749 26.2426 30.7417 27.25 29.499 27.25H2.49902C1.25638 27.25 0.249023 26.2426 0.249023 25V7C0.249023 5.75736 1.25638 4.75 2.49902 4.75ZM1.74902 11.4796V13.75H30.249V11.4796H1.74902ZM30.249 9.97964H1.74902V7C1.74902 6.58579 2.08481 6.25 2.49902 6.25H29.499C29.9132 6.25 30.249 6.58579 30.249 7V9.97964ZM30.249 15.25H1.74902V25C1.74902 25.4142 2.08481 25.75 2.49902 25.75H29.499C29.9132 25.75 30.249 25.4142 30.249 25V15.25Z'
                      fill='rgba(0, 0, 0, 0.9)'
                      stroke='none'
                      fill-opacity='0.9'
                    ></path>
                  </svg>
                </div>
                <div className='paymentmethods-v3__option-title'>
                  <span>Tarjeta de crédito o débito</span>
                </div>
              </div>
              <div className='paymentmethods-v3__option'>
                <div
                  className='paymentmethods-v3__icon'
                  style={{ width: "24px", height: "24px" }}
                >
                  <svg
                    style={{ width: "24px", height: "24px" }}
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M1.75 25.6167V6.25H26.499C27.7416 6.25 28.749 7.25736 28.749 8.5V10.75H30.249V8.5C30.249 6.42893 28.5701 4.75 26.499 4.75H0.25V27.1095L26.481 27.2355L26.499 27.2356C28.5701 27.2356 30.249 25.5566 30.249 23.4856V21.25H28.749V23.4856C28.749 24.7282 27.7416 25.7356 26.499 25.7356L26.4882 25.7355L1.75 25.6167Z'
                      fill='black'
                      stroke='none'
                      fill-opacity='0.9'
                    ></path>
                    <path
                      d='M21.999 17.498C22.8269 17.498 23.498 16.8269 23.498 15.999C23.498 15.1711 22.8269 14.5 21.999 14.5C21.1711 14.5 20.5 15.1711 20.5 15.999C20.5 16.8269 21.1711 17.498 21.999 17.498Z'
                      fill='black'
                      stroke='none'
                      fill-opacity='0.9'
                    ></path>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M31.75 21.2435H30.999L30.9851 21.2434L21.9707 21.2173C19.0844 21.209 16.749 18.8668 16.749 15.9804C16.749 13.0954 19.0878 10.7565 21.9729 10.7565H31.7363L31.75 21.2435ZM30.2382 12.2565H21.9729C19.9163 12.2565 18.249 13.9238 18.249 15.9804C18.249 18.04 19.9155 19.7114 21.9751 19.7173L30.248 19.7413L30.2382 12.2565Z'
                      fill='black'
                      stroke='none'
                      fill-opacity='0.9'
                    ></path>
                  </svg>
                </div>
                <div className='paymentmethods-v3__option-title'>
                  <span>Dinero disponible en Mercado Pago</span>
                </div>
              </div>
              <div className='paymentmethods-v3__option'>
                <div
                  className='paymentmethods-v3__icon'
                  style={{ width: "24px", height: "24px" }}
                >
                  <svg
                    style={{ width: "24px", height: "24px" }}
                    viewBox='0 0 32 32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M13.1382 17.6719L12.0602 19.1839C12.8003 19.936 13.8459 20.4845 15.249 20.6298V22.7653H16.749V20.6275C18.7673 20.3968 19.7462 19.2031 19.7462 17.6719C19.7462 15.5592 17.7885 15.0965 16.249 14.7326L16.2184 14.7253C15.2225 14.4903 14.3842 14.2924 14.3842 13.6959C14.3842 13.1359 14.8602 12.7579 15.7142 12.7579C16.6662 12.7579 17.6742 13.0799 18.4302 13.7799L19.5362 12.3239C18.7954 11.6393 17.8568 11.2156 16.749 11.0745V9.24991H15.249V11.0612C13.4373 11.2882 12.3542 12.4689 12.3542 13.8639C12.3542 15.9633 14.2618 16.4003 15.7783 16.7477L15.8402 16.7619L15.9167 16.7808C16.9052 17.024 17.7302 17.2271 17.7302 17.8959C17.7302 18.4279 17.1982 18.9319 16.1062 18.9319C14.8182 18.9319 13.7962 18.3579 13.1382 17.6719Z'
                      fill='black'
                      stroke='none'
                      fill-opacity='0.9'
                    ></path>
                    <path
                      d='M24.999 17.4999C25.8274 17.4999 26.499 16.8283 26.499 15.9999C26.499 15.1715 25.8274 14.4999 24.999 14.4999C24.1706 14.4999 23.499 15.1715 23.499 15.9999C23.499 16.8283 24.1706 17.4999 24.999 17.4999Z'
                      fill='black'
                      stroke='none'
                      fill-opacity='0.9'
                    ></path>
                    <path
                      d='M8.499 15.9999C8.499 16.8283 7.82743 17.4999 6.999 17.4999C6.17057 17.4999 5.499 16.8283 5.499 15.9999C5.499 15.1715 6.17057 14.4999 6.999 14.4999C7.82743 14.4999 8.499 15.1715 8.499 15.9999Z'
                      fill='black'
                      stroke='none'
                      fill-opacity='0.9'
                    ></path>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M0.25 5.49658H31.749V26.5032H0.25V5.49658ZM1.75 6.99658V25.0032H30.249V6.99658H1.75Z'
                      fill='black'
                      stroke='none'
                      fill-opacity='0.9'
                    ></path>
                  </svg>
                </div>
                <div className='paymentmethods-v3__option-title'>
                  <span>Efectivo</span>
                </div>
              </div>
            </div>
          </div>
          <div className='bns'>
            <div className='bnoos'>
              <a
                class='bn31'
                href='https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808489cf38310189d23fa49d0135'
              >
                <span class='bn31span'>Classic</span>
              </a>
              <p className='parrap'>100 Chances de sorteo </p>{" "}
              <p className='parrap'>10% OFF </p> <p className='parrap'>$1000 Reintegro</p>
            </div>
            <div className='bnoos'>
              <a
                class='bn32'
                href='https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808489cf38a70189d240ddcc0139'
              >
                <span class='bn32span'>Gold</span>
              </a>
              <p className='parrap'>200 Chances de sorteo</p>
              <p className='parrap'> 15% OFF </p>{" "}
              <p className='parrap'>$1500 Reintegro</p>
            </div>
            <div className='bnoos'>
              <a
                class='bn33'
                href='https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848eed4752018ef1a6989d02bf'
              >
                <span class='bn33span'>Premium</span>
              </a>
              <p className='parrap'>500 Chances de sorteo</p>
              <p className='parrap'> 20% OFF </p>{" "}
              <p className='parrap'>$2000 Reintegro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
