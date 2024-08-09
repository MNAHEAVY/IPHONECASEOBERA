"use client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

import Home from "./Views/Home/Home";
import Products from "./Views/Products/Products";

function App() {
  return (
    <Router>
      <Banner />
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/products' element={<Products />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
