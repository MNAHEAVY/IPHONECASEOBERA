"use client";

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  // send manual login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        onClose();
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  // send google login
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google"; // Redirige a la ruta de Google OAuth
  };

  return (
    <div open={open} className='flex justify-center items-start h-screen bg-gray-100 '>
      <div className='relative w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg z-10'>
        <button
          onClick={handleClose}
          className='absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 focus:outline-none'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
          </svg>
        </button>{" "}
        <h2 className='text-2xl font-bold text-center'>Iniciar sesión</h2>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Contraseña</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              required
            />
          </div>
          <div>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Entrar
            </button>
          </div>
          <div>
            <label className='justify-center flex text-sm font-medium text-gray-700 gap-2'>
              No estas registrado?{" "}
              <a className=' text-blue-700' href='/register'>
                Crea tu cuenta
              </a>
            </label>
          </div>
        </form>
        <div className='mt-6 space-y-2'>
          <button
            onClick={handleGoogleLogin}
            className='w-full gap-2 py-2 px-4 flex items-center justify-center bg-slate-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
          >
            {" "}
            <svg
              className='h-6 w-6    '
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path
                fill='#EA4335'
                d='M5.27 9.76A7.08 7.08 0 0 1 16.42 6.5L19.9 3A11.97 11.97 0 0 0 1.24 6.65l4.03 3.11Z'
              />
              <path
                fill='#34A853'
                d='M16.04 18.01A7.4 7.4 0 0 1 12 19.1a7.08 7.08 0 0 1-6.72-4.82l-4.04 3.06A11.96 11.96 0 0 0 12 24a11.4 11.4 0 0 0 7.83-3l-3.79-2.99Z'
              />
              <path
                fill='#4A90E2'
                d='M19.83 21c2.2-2.05 3.62-5.1 3.62-9 0-.7-.1-1.47-.27-2.18H12v4.63h6.44a5.4 5.4 0 0 1-2.4 3.56l3.8 2.99Z'
              />
              <path
                fill='#FBBC05'
                d='M5.28 14.27a7.12 7.12 0 0 1-.01-4.5L1.24 6.64A11.93 11.93 0 0 0 0 12c0 1.92.44 3.73 1.24 5.33l4.04-3.06Z'
              />
            </svg>{" "}
            Iniciar sesion con Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
