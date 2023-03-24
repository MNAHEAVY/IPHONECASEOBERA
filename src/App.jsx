//import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
//COMPONENTS//PAGES
import Landing from "./pages/Landing/Landing";
import Accesorios from "./pages/Tabs/Accesorios/Accesorios";
import Iphone from "./pages/Tabs/Iphone/Iphone";
import Watch from "./pages/Tabs/Watch/Watch";
import Airpods from "./pages/Tabs/Airpods/Airpods";
import Favoritos from "./pages/Favs/Favs";
import NavBar from "./pages/NavBar/NavBar";
import Footer from "./pages/Footer/Footer";
import NotFound from "./pages/ErrorElement/NotFound";
import Nav from "./pages/Nav/Nav";
import Dashboard from "./pages/dashboard/Dashboard";
import Glass from "./pages/Tabs/Accesorios/Glass/Glass";
import Checkout from "./pages/Checkout/Checkout";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Case from "./pages/Tabs/Accesorios/Case/Case";
import Energy from "./pages/Tabs/Accesorios/Energy/Energy";
import Terms from "./pages/Terms/Terms";
import AllProducts from "./pages/dashboard/AllProducts";
import { useDispatch, useSelector } from "react-redux";
import { checkUserExists, checkUserAdmin } from "../src/redux/actions";
import AllUsers from "./pages/dashboard/AllUsers";
import CreateProduct from "./pages/dashboard/CreateProduct";
import Allvalues from "./pages/dashboard/AllValues";

function App() {
  const [added, setAdded] = useState(false);
  const [notAdded, setNotAdded] = useState(false);
  const dispatch = useDispatch();
  const userCheck = useSelector((state) => state.checkUser);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAdded(false);
    setNotAdded(false);
  };
  const handleAdded = () => {
    setAdded(true);
  };
  const handleNotAdded = () => {
    setNotAdded(true);
  };

  const { user } = useAuth0();

  useEffect(() => {
    const userData = {
      email: user?.email,
      email_verified: user?.email_verified,
      family_name: user?.family_name,
      given_name: user?.given_name,
      locale: user?.locale,
      name: user?.name,
      nickname: user?.nickname,
      picture: user?.picture,
      auth0Id: user?.sub,
    };
    if (userData) {
      dispatch(checkUserExists(userData));
    }
  }, [dispatch, user?.email]);

  useEffect(() => {
    const mail = user?.email;

    if (mail) {
      dispatch(checkUserAdmin(mail));
    }
  }, [dispatch, user?.email]);

  return (
    <>
      <Router>
        <Nav />
        <NavBar />
        <Footer />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/accesorios" element={<Accesorios />} />
          <Route path="/iphone" element={<Iphone />} />
          <Route
            path="/detalle/:id"
            element={
              <ProductDetail
                handleAdded={handleAdded}
                handleNotAdded={handleNotAdded}
              />
            }
          />
          <Route path="/watch" element={<Watch />} />
          <Route path="/airpods" element={<Airpods />} />

          {userCheck && userCheck.isAdmin === true ? (
            <>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/allprods" element={<AllProducts />} />
              <Route path="/admin/allprods/edit" element={<AllProducts />} />
              <Route path="/admin/allusers" element={<AllUsers />} />
              <Route path="/admin/allusers/edit" element={<AllUsers />} />
              <Route path="/admin/values" element={<Allvalues />} />
              <Route path="/admin/values/edit" element={<Allvalues />} />
              <Route path="/admin/create" element={<CreateProduct />} />
            </>
          ) : (
            <Route path="/404" element={<NotFound />} />
          )}
          <Route path="/payment" element={<Checkout />} />
          <Route path="/glass" element={<Glass />} />
          <Route path="/fundas" element={<Case />} />
          <Route path="/charger" element={<Energy />} />
          <Route path="/terminos" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
