import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction, getValuesAction } from "../../../redux/actions";
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import { Box } from "@mui/material";
import BackButton from "../../Button/Back";
import { calcularPrecioFinal } from "../../../functions/price";

export default function IphoneMobile() {
  const user = useSelector((state) => state.checkUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const prod = useSelector((state) =>
    state.products.filter((product) => product.disponible === true)
  );
  const dispatch = useDispatch(); // add this line to get the dispatch function
  const values = useSelector((state) => state.values);

  const handleBeforeUnload = (event) => {
    // Redirigir a la página de inicio
    window.location.replace("http://localhost:5173");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    dispatch(getValuesAction());
    dispatch(getAllProductsAction()).then(() => setLoading(false)); // call dispatch as a function and set loading to false when done
  }, [dispatch]);

  const iph = prod.filter((cat) => cat.categorias === "Iphone");
  // Pagination logic

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pageProd = iph.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (number) => {
    setCurrentPage(number);
  };
  const refreshPage = () => {
    setCurrentPage(1);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <br />
        <BackButton refreshPage={refreshPage} />
        <h1 id='centering'>Te acercamos el Iphone que deseas</h1>
        <h2 className='h2'>iPhone</h2>

        {loading ? ( // show loading component if still loading
          <Loading />
        ) : (
          <div>
            {pageProd.map((item) => (
              <Link className='noShadow' to={"/detalle/" + item._id} key={item._id}>
                <div id='centering'>
                  <img
                    id='imgDetail'
                    src={item.imagenGeneral[0]}
                    alt='Product'
                    loading='lazy'
                  />
                </div>
                <br />
                <div id='centering'>
                  <h6>{item.nombre}</h6>
                  <h6>${calcularPrecioFinal(user, item, values)}</h6>
                  <h6>{item.marca}</h6>
                  <br />
                </div>
              </Link>
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          postPerPage={itemsPerPage}
          totalPosts={iph.length}
          paginate={paginate}
        />
      </Box>
      <br />
      <br />
    </div>
  );
}
