import a from "../../assets/promo_airpods_pro_order__d8xv36p4uwae_small_2x.jpg";
import b from "../../assets/promo_apple_watch_series_9_order__b3u85rm9zf6u_small_2x.jpg";
import c from "../../assets/promo_college_students__bxqdcoxgjzw2_small_2x.jpg";
import d from "../../assets/promo_ipadair__cu1bnxi7uuwm_small_2x.jpg";
import e from "../../assets/promo_mbp__ek7p477bkp6q_large.jpg";
import f from "../../assets/hero_ipadpro__bpt7a9d8sh42_small_2x.jpg";
import g from "../../assets/hero_macbook_air_m3__cp4t7pn8zqaa_small_2x.jpg";
import background from "../../assets/iphone16.png";
import Carousel from "../../Components/Carousel/Carousel";

export default function Home() {
  return (
    <>
      <div className='relative isolate px-6 lg:px-8'>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          />
        </div>
        <div className='mx-auto max-w-2xl pt-1 pb-28 sm:py-24 lg:py-32'>
          <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
            <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
              Anunciando el nuevo iPhone 16.{" "}
              <a href='#' className='font-semibold text-indigo-600'>
                <span aria-hidden='true' className='absolute inset-0' />
                Saber mas <span aria-hidden='true'>&rarr;</span>
              </a>
            </div>
          </div>
          <div className='text-center py-20'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              iPhone Case Oberá,
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Nuestras cámaras más poderosas hasta ahora. Chips ultrarrápidos. Y USB‑C.
            </p>
          </div>{" "}
          <img
            style={{ filter: "drop-shadow(0px 0px 3.5px purple)" }}
            alt=''
            src={background}
            className='absolute bottom-0 inset-x-0 -z-10 h-full md:h-fit w-full object-cover object-center md:object-center'
          />
        </div>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          />
        </div>
      </div>
      <div className='relative overflow-hidden bg-gray-900'>
        <div className='pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40'>
          <div
            aria-hidden='true'
            className='absolute inset-x-0 -top-40 -z-1 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>
          <div className='relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8'>
            <div className='sm:max-w-lg'>
              <h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
                Todos tus dispositivos y accesorios apple
              </h1>
              <p className='mt-4 text-xl text-gray-500'>
                Encontra eso que buscas en nuestra tienda online, o acercate a nuestra
                sucursal ubicada en Av. Italia 406, al Lado del Jardín de los Pájaros.
                Obera, Misiones.
              </p>
            </div>
            <div>
              <div className='mt-10'>
                {/* Decorative image grid */}
                <div
                  aria-hidden='true'
                  className='pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl'
                >
                  <div className='absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
                    <div className='flex items-center space-x-6 lg:space-x-8'>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100'>
                          <img
                            alt=''
                            src={e}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt=''
                            src={d}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                      </div>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt=''
                            src={c}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt=''
                            src={b}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt=''
                            src={a}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                      </div>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt=''
                            src={f}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            alt=''
                            src={g}
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href='#'
                  className='inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700'
                >
                  Ver Productos
                </a>
              </div>
            </div>
          </div>{" "}
        </div>{" "}
      </div>
      <Carousel />
    </>
  );
}
