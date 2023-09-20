import React, { useState, useEffect } from "react";
import { getAllProductsAction, getValuesAction } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import Pagination from "../../Pagination/Pagination";
import { Box } from "@mui/material";
import FloatButton from "../../Button/FloatButton";
import { Link } from "react-router-dom";
import BackButton from "../../Button/Back";

export default function AccesoriosMobile() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const prod = useSelector((state) =>
    state.products.filter((product) => product.disponible === true)
  );
  const dispatch = useDispatch(); // add this line to get the dispatch function
  const values = useSelector((state) => state.values);

  useEffect(() => {
    dispatch(getValuesAction());
    dispatch(getAllProductsAction()).then(() => setLoading(false)); // call dispatch as a function and set loading to false when done
  }, [dispatch]);

  const iph = prod.filter((cat) => cat.categorias === "Accesorios");
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
        <br></br>
        <BackButton refreshPage={refreshPage} />
        <h1 id="centering">Todo en accesorios sin ir mas lejos</h1>
        <h2 className="h2">Accesorios</h2>

        {loading ? ( // show loading component if still loading
          <Loading />
        ) : (
          <div>
            {pageProd.map((item) => (
              <Link className="noShadow" to={"/detalle/" + item._id} key={item._id}>
                <div id="centering">
                  <img
                    id="imgDetail"
                    src={item.imagenGeneral[0]}
                    alt="Product"
                    loading="lazy"
                  />
                </div>
                <br />
                <div id="centering">
                  <h6>{item.nombre}</h6>
                  <h6>${(item.precioBase * values.dolarBlue).toFixed(2)}</h6>
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
        <FloatButton />
      </Box>
      <br />
      <br />
    </div>
  );
}