//import "./app.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

//COMPONENTS//PAGES
import Landing from "./pages/Landing/Landing";
import Accesorios from "./pages/Tabs/Accesorios/Accesorios";
import Iphone from "./pages/Tabs/Iphone/Iphone";
import Watch from "./pages/Tabs/Watch/Watch"
import Airpods from "./pages/Tabs/Airpods/Airpods"
//import Faq from "./pages/FAQ/Faq";
import Terms from "./pages/Terms/Terms";
//import AboutUs from "./pages/AboutUs/AboutUs";
//import ContactUs from "./pages/ContactUs/ContactUs";
//import DetailProduct from "./components/DetailProduct/DetailProduct";
import Favoritos from "./pages/Favs/Favs";
import NavBar from "./pages/NavBar/NavBar";
//import CreateProduct from "./components/CreateProduct/CreateProduct";
//import Dashboard from "./pages/Admin/views/Dashboard";
//import AllArtWork from "./pages/Admin/views/AllArtWork";
//import AllUsers from "./pages/Admin/views/AllUsers";
//import EditProduct from "./pages/Admin/components/EditProduct";
//import Cart from "./components/Cart/Cart";
//import ProductDetail from "./pages/Admin/components/ProductDetail";
//import UserProfile from "./pages/UserProfile/UserProfile";
import Footer from "./pages/Footer/Footer";


//import Alert from "./components/Alert/Alert";
//import Buy from "./components/Buy/Buy";
import NotFound from "./pages/ErrorElement/NotFound"
import Nav from "./pages/Nav/Nav";
import Dashboard from "./pages/dashboard/Dashboard";


function App() {
//   const [added, setAdded] = useState(false);
//   const [notAdded, setNotAdded] = useState(false);
  
//   const dispatch = useDispatch()

//   let favs = JSON.parse(localStorage.getItem('favList'))
//   let cart = JSON.parse(localStorage.getItem('cartList'))

//   useEffect(() => {
//     if (localStorage.getItem("token") !== null) {
//       const token = localStorage.getItem("token");
//       dispatch(verifyToken(token))
//         .then((res) => {
//           if(res === "error"){
//             dispatch(unLogFromApp())
//           }
//         });
//     } else {
//       dispatch(unLogFromApp());
//     }
  
//     if(favs === null || !favs.length){
//       localStorage.setItem("favList", JSON.stringify([]))}
//     if(cart === null || !cart.length){
//       localStorage.setItem("cartList", JSON.stringify([]))}
//   }, []);

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setAdded(false);
//     setNotAdded(false);
//   };
//   const handleAdded = () => {
//     setAdded(true);
//   };
//   const handleNotAdded = () => {
//     setNotAdded(true);
//   };

  //const loggedUser = useSelector((store) => store.userSignReducer.userData);

  return (
    <>
      <Router>
        <Nav/>
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<Landing/>} />
          <Route exact path="/admin" element={<Dashboard/>} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/accesorios" element={<Accesorios/>} />
          <Route path="/iphone" element={<Iphone/>} />
          <Route path="/watch" element={<Watch/>} />
          <Route path="/airpods" element={<Airpods/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;