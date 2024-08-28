import { useEffect, useState } from "react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction, updateUserAction } from "../../redux/actions/user";
import { deleteCartItemAction, getCartItemsAction } from "../../redux/actions/cart";
import Loader from "../../Components/Loader/Loader";
import { ToastContainer } from "react-toastify";

initMercadoPago("APP_USR-8c926d78-0d84-43b8-a918-9da21227b3a9", {
  locale: "es-AR",
});

export default function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const userData = useSelector((state) => state.user.userData);
  const [loading, setLoading] = useState(true);
  const [send, setSend] = useState(0);

  //--------------------- USER SECTION -------------------------------//
  const [updateUser, setUpdateUser] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    family_name: "",
    given_name: "",
    phone: "",
    address: {
      verify: false,
      country: "",
      state: "",
      city: "",
      street_name: "",
      codigo_postal: "",
    },
    id: "",
  });

  useEffect(() => {
    if (user?.email) {
      dispatch(getUserAction(user.email)).then(() => setLoading(false));
      dispatch(getCartItemsAction(user.id));
    }
  }, [dispatch, user?.email, user.id]);

  useEffect(() => {
    if (userData) {
      setFormData({
        email: userData?.email || "",
        family_name: userData?.family_name || "",
        given_name: userData?.given_name || "",
        phone: userData?.phone || "",
        address: {
          verify: userData?.address?.verify || false,
          country: userData?.address?.country || "",
          state: userData?.address?.state || "",
          city: userData?.address?.city || "",
          street_name: userData?.address?.street_name || "",
          codigo_postal: userData?.address?.codigo_postal || "",
        },
        id: userData?._id || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      // Split the name by '.' to handle nested properties
      const nameParts = name.split(".");
      if (type === "checkbox") {
        if (nameParts.length === 2) {
          // Handle nested properties for checkboxes
          const [parentName, childName] = nameParts;
          return {
            ...prevData,
            [parentName]: {
              ...prevData[parentName],
              [childName]: checked,
            },
          };
        } else {
          return {
            ...prevData,
            [name]: checked,
          };
        }
      } else if (nameParts.length === 2) {
        // Handle nested properties
        const [parentName, childName] = nameParts;
        return {
          ...prevData,
          [parentName]: {
            ...prevData[parentName],
            [childName]: value,
          },
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the updateUser action to update the user? data in Redux store
    dispatch(updateUserAction(formData));
    setUpdateUser(true);
  };

  const handleDeleteCartItem = (itemId) => {
    const userId = user.id;
    dispatch(deleteCartItemAction(userId, itemId));
  };
  //--------------------------------CHECKOUT SECTION-----------------------------//
  const subtotal = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const onSubmit = async () => {
    const preferenceData = {
      items: cart,
      purpose: "wallet_purchase",
      envio: send,
      payer: user,
    };
    try {
      const response = await fetch(
        "https://iphonecaseoberab-production.up.railway.app/create_preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferenceData),
        }
      );
      const preference = await response.json();
      return preference.preferenceId;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la preferencia de pago");
    }
  };
  const onError = async (error) => {
    console.error(error);
  };
  const onReady = async () => {
    // Este callback se ejecuta cuando el botón de pago está listo para usarse.
    // Aquí podrías ocultar cualquier mensaje de carga.
  };

  return (
    <div className="relative isolate overflow-hidden bg-slate-50 bg-[url('/src/assets/beams-components.png')] px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <ToastContainer />
      <div className='text-center pb-6 border-b border-gray-900/10'>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
          Let&apos;s Buy!
        </h1>
        <p className='mt-6 text-lg leading-8 text-gray-600'>
          Corrige tu informacion y concreta tu compra, un asesor se pondra en contacto
          contigo.
        </p>
      </div>
      <div className='flex flex-col lg:flex-row justify-between gap-8 pt-4 border-b border-gray-900/10 pb-12'>
        <form className='lg:w-1/2 space-y-6 px-8' onSubmit={handleSubmit}>
          <div>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Confirma tu informacion Personal
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Usa un correo permanente en donde puedas recibir la notificacion de compra.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    type='email'
                    autoComplete='email'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Nombre
                </label>
                <div className='mt-2'>
                  <input
                    id='given_name'
                    name='given_name'
                    value={formData.given_name}
                    onChange={handleChange}
                    type='text'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Apellido
                </label>
                <div className='mt-2'>
                  <input
                    id='family_name'
                    name='family_name'
                    value={formData.family_name}
                    onChange={handleChange}
                    type='text'
                    autoComplete='family-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Pais
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='address.country'
                    name='address.country'
                    value={formData.address?.country}
                    onChange={handleChange}
                    autoComplete='country-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='street-address'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Direccion
                </label>
                <div className='mt-2'>
                  <input
                    id='address.street_name'
                    name='address.street_name'
                    value={formData.address.street_name}
                    onChange={handleChange}
                    type='text'
                    autoComplete='street-address'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2 sm:col-start-1'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Ciudad
                </label>
                <div className='mt-2'>
                  <input
                    id='address.city'
                    name='address.city'
                    value={formData.address.city}
                    onChange={handleChange}
                    type='text'
                    autoComplete='address-level2'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='region'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Provincia
                </label>
                <div className='mt-2'>
                  <input
                    id='address.state'
                    name='address.state'
                    value={formData.address.state}
                    onChange={handleChange}
                    type='text'
                    autoComplete='address-level1'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='postal-code'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Codigo Postal
                </label>
                <div className='mt-2'>
                  <input
                    id='address.codigo_postal'
                    name='address.codigo_postal'
                    value={formData.address.codigo_postal}
                    onChange={handleChange}
                    type='text'
                    autoComplete='postal-code'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-4'>
                <label
                  htmlFor='tel'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Celular
                </label>
                <div className='mt-2'>
                  <input
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    type='number'
                    autoComplete='tel'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
          </div>{" "}
          <button
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Actualizar
          </button>
        </form>

        <div className='lg:w-1/2 mt-8 lg:mt-0 px-8 bg-sky-400/[.06]'>
          <div className='flow-root'>
            <h2 className='text-base font-semibold leading-7 text-gray-900 pb-8'>
              Resumen del pedido
            </h2>
            <ul role='list' className='-my-6 divide-y divide-gray-200'>
              {cart.map((product) => (
                <li key={product._id} className='flex py-6'>
                  <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                    <img
                      alt={product.name}
                      src={product.image}
                      className='h-full w-full object-cover object-center'
                    />
                  </div>
                  <div className='ml-4 flex flex-1 flex-col'>
                    <div>
                      <div className='flex justify-between text-base font-medium text-gray-900'>
                        <h3>{product.name}</h3>
                        <p className='ml-4'>${product.price}</p>
                      </div>
                      <p className='mt-1 text-sm text-gray-500'>{product.color}</p>
                    </div>
                    <div className='flex flex-1 items-end justify-between text-sm'>
                      <p className='text-gray-500'>Cantidad {product.quantity}</p>
                      <button
                        type='button'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                        onClick={() => handleDeleteCartItem(product._id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
            <div>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <p>Subtotal</p>
                <p>${subtotal.toLocaleString("es-ES")}</p>
              </div>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <p>Envio</p>
                <p>${send.toLocaleString("es-ES")}</p>
              </div>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <p>Total</p>
                <p>${(subtotal + send).toLocaleString("es-ES")}</p>
              </div>
            </div>
          </div>
          <fieldset>
            <legend className='text-sm font-semibold leading-6 text-gray-900'>
              Metodo de entrega
            </legend>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Elige el metodo para acceder a tu producto(si eres local o fuera de la
              provincia puedes acordar otros metodos con el asesor)
            </p>
            <div className='mt-6 space-y-6'>
              <div className='flex items-center gap-x-3'>
                <input
                  id='local-pickup'
                  name='delivery-method'
                  type='radio'
                  className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  value={0}
                  checked={send === 0}
                  onChange={(e) => setSend(parseInt(e.target.value))}
                />
                <label
                  htmlFor='local-pickup'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Retiro en Local(o Acuerdo envio local con el asesor)
                </label>
              </div>
              <div className='flex items-center gap-x-3'>
                <input
                  id='provincial-shipping'
                  name='delivery-method'
                  type='radio'
                  className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                  value={8000}
                  checked={send === 8000}
                  onChange={(e) => setSend(parseInt(e.target.value))}
                />
                <label
                  htmlFor='provincial-shipping'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Con Envio(Provincial)
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div className='mt-6 flex justify-center'>
        {updateUser ? (
          <Wallet onSubmit={onSubmit} onReady={onReady} onError={onError} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
