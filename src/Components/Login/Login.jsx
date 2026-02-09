import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    if (onClose) onClose();
  };
  // 🔒 Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://iphonecaseoberab-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("¡Sesión iniciada!");
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        toast.error("¡Correo o contraseña inválidos!");
      }
    } catch (error) {
      toast.error("Error de conexión");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://iphonecaseoberab-production.up.railway.app/auth/google";
  };

  return (
    <>
      <ToastContainer />

      {/* 🔲 OVERLAY */}
      <div
        onClick={handleClose}
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'
      >
        {/* 🧱 MODAL */}
        <div
          onClick={(e) => e.stopPropagation()}
          className='relative w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-xl'
        >
          {/* ❌ Close */}
          <button
            onClick={handleClose}
            className='absolute top-3 right-3 text-gray-400 hover:text-gray-600'
          >
            ✕
          </button>

          <h2 className='text-2xl font-bold text-center'>Iniciar sesión</h2>

          <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 w-full px-3 py-2 border rounded-md focus:ring-blue-500'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium'>Contraseña</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mt-1 w-full px-3 py-2 border rounded-md focus:ring-blue-500'
                required
              />
            </div>

            <button className='w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
              Entrar
            </button>

            <p className='text-sm text-center'>
              ¿No estás registrado?{" "}
              <a href='/register' className='text-blue-600'>
                Crear cuenta
              </a>
            </p>
          </form>

          <button
            onClick={handleGoogleLogin}
            className='w-full mt-6 flex items-center justify-center gap-2 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700'
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
            Iniciar sesión con Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
