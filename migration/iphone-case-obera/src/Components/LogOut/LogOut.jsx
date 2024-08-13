const handleLogout = () => {
  localStorage.removeItem("token");
  dispatch(logoutUser()); // Asume que tienes una acción para manejar el logout
  navigate("/login"); // Redirige al usuario a la página de login
};
