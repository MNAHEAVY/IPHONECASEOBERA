import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux"; // Importa useDispatch
import { registerUserAction } from "../../redux/actions/auth";
import Loader from "../../Components/Loader/Loader";

export default function SignIn() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    given_name: "",
    family_name: "",
    email: "",
    password: "",
    privacyPolicyAccepted: false,
  });

  const validateForm = (event) => {
    event.preventDefault();
    const newErrors = {};

    const { given_name, family_name, email, password, privacyPolicyAccepted } =
      formValues;

    if (!given_name.trim()) {
      newErrors.given_name = "El nombre es obligatorio";
    }

    if (!family_name.trim()) {
      newErrors.family_name = "El apellido es obligatorio";
    }

    if (!email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "El email no es válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un símbolo";
    }

    if (!privacyPolicyAccepted) {
      newErrors.privacyPolicy = "Debes aceptar la política de privacidad";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      const userData = {
        given_name,
        family_name,
        email,
        password,
      };
      dispatch(registerUserAction(userData))
        .then(() => {
          toast.success("¡Registro exitoso, ahora inicia sesion!");
          setFormValues({
            given_name: "",
            family_name: "",
            email: "",
            password: "",
            privacyPolicyAccepted: false,
          });
          setErrors({});
        })
        .catch((error) => {
          console.error(error);
          toast.error("¡Hubo un problema con el registro, inténtelo nuevamente.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className='relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0'>
      <ToastContainer />
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <svg
          aria-hidden='true'
          className='absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]'
        >
          <defs>
            <pattern
              x='50%'
              y={-1}
              id='e813992c-7d03-4cc4-a2bd-151760b470a0'
              width={200}
              height={200}
              patternUnits='userSpaceOnUse'
            >
              <path d='M100 200V.5M.5 .5H200' fill='none' />
            </pattern>
          </defs>
          <svg x='50%' y={-1} className='overflow-visible fill-gray-50'>
            <path
              d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z'
              strokeWidth={0}
            />
          </svg>
          <rect
            fill='url(#e813992c-7d03-4cc4-a2bd-151760b470a0)'
            width='100%'
            height='100%'
            strokeWidth={0}
          />
        </svg>
      </div>
      <form className='px-24' onSubmit={validateForm} noValidate>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Ingresa tu datos para registrarte
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Use una dirección permanente donde pueda recibir correos.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='given_name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Nombre
                </label>
                <div className='mt-2'>
                  <input
                    id='given_name'
                    name='given_name'
                    type='text'
                    value={formValues.given_name}
                    onChange={handleChange}
                    autoComplete='given-name'
                    aria-describedby='given_name-error'
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.given_name ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {errors.given_name && (
                    <p
                      id='given_name-error'
                      className='mt-2 text-sm text-red-600'
                      aria-live='assertive'
                    >
                      {errors.given_name}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='family_name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Apellido
                </label>
                <div className='mt-2'>
                  <input
                    id='family_name'
                    name='family_name'
                    type='text'
                    value={formValues.family_name}
                    onChange={handleChange}
                    autoComplete='family-name'
                    aria-describedby='family_name-error'
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.family_name ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {errors.family_name && (
                    <p
                      id='family_name-error'
                      className='mt-2 text-sm text-red-600'
                      aria-live='assertive'
                    >
                      {errors.family_name}
                    </p>
                  )}
                </div>
              </div>

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
                    type='email'
                    value={formValues.email}
                    onChange={handleChange}
                    autoComplete='email'
                    aria-describedby='email-error'
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.email ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {errors.email && (
                    <p
                      id='email-error'
                      className='mt-2 text-sm text-red-600'
                      aria-live='assertive'
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Contraseña
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    value={formValues.password}
                    onChange={handleChange}
                    autoComplete='current-password'
                    aria-describedby='password-error'
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.password ? "ring-red-500" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  />
                  {errors.password && (
                    <p
                      id='password-error'
                      className='mt-2 text-sm text-red-600'
                      aria-live='assertive'
                    >
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>Tus datos</h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Es importante que sepas que tus datos están protegidos y solo son utilizados
            con el fin de brindarte un buen servicio.
          </p>

          <div className='mt-10 space-y-10'>
            <fieldset>
              <legend className='text-sm font-semibold leading-6 text-blue-500'>
                <a href='terms'>Política de privacidad {"-->"}</a>
              </legend>
              <div className='mt-6 space-y-6'>
                <div className='relative flex gap-x-3'>
                  <div className='flex h-6 items-center'>
                    <input
                      id='privacy-policy'
                      name='privacyPolicyAccepted'
                      type='checkbox'
                      checked={formValues.privacyPolicyAccepted}
                      onChange={handleChange}
                      aria-describedby='privacy-policy-error'
                      className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 ${
                        errors.privacyPolicy ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  <div className='text-sm leading-6'>
                    <label htmlFor='privacy-policy' className='font-medium text-gray-900'>
                      Aceptar
                    </label>
                    <p className='text-gray-500'>
                      Acepto las políticas de privacidad y la veracidad de mis datos.
                    </p>
                    {errors.privacyPolicy && (
                      <p
                        id='privacy-policy-error'
                        className='mt-2 text-sm text-red-600'
                        aria-live='assertive'
                      >
                        {errors.privacyPolicy}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <button
              type='button'
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              <a href='/'> Cancelar</a>
            </button>
            <button
              type='submit'
              className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Registrarse
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
