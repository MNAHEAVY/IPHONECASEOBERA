"use client";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

import Home from "./Views/Home/Home";
import Products from "./Views/Products/Products";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import { getAllProductsAction } from "./redux/actions/products";
import SignIn from "./Views/SignIn/SignIn";
import { setUser } from "./redux/reducers/userSlice";
import { logout } from "./redux/reducers/authSlice";
import ProductDetail from "./Views/ProductDetail/ProductDetail";
import { getValuesAction } from "./redux/actions/values";
import User from "./Views/User/User";
import Searched from "./Views/Searched/Searched";
import Checkout from "./Views/Checkout/Checkout";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsAction());
    dispatch(getValuesAction());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token.trim() !== "") {
      try {
        const user = jwtDecode(token);
        const isTokenExpired = user.exp * 1000 < Date.now();

        if (isTokenExpired) {
          localStorage.removeItem("token");
          dispatch(logout());
        } else {
          dispatch(setUser(user));
        }
      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("token");
        dispatch(logout());
      }
    } else {
      // Opcional: Manejo cuando no hay token o es inválido
      console.log("No hay token válido, el usuario no está autenticado.");
    }
  }, [dispatch]);

  return (
    <Router>
      <Banner />
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/search' element={<Searched />} />
        <Route exact path='/register' element={<SignIn />} />
        <Route exact path='/detail/:id' element={<ProductDetail />} />
        <Route exact path='/user/:id' element={<User />} />
        <Route exact path='/checkout' element={<Checkout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
