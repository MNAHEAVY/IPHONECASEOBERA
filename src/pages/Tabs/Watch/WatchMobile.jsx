import React, { useState, useEffect } from "react";
import Pagination from "../../Pagination/Pagination";
import { Box, Grid } from "@mui/material";
import { getAllProductsAction, getValuesAction } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";
import FloatButton from "../../Button/FloatButton";
import "./Watch.css"; // Import the CSS file for your component here
import BackButton from "../../Button/Back";

export default function Watch() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const prod = useSelector((state) =>
    state.products.filter((product) => product.disponible === true)
  );
  const dispatch = useDispatch();
  const values = useSelector((state) => state.values);

  useEffect(() => {
    dispatch(getValuesAction());
    dispatch(getAllProductsAction()).then(() => setLoading(false));
  }, [dispatch]);

  const iph = prod.filter((cat) => cat.categorias === "Watch");

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
        <h1 id='centering'>El compañero perfecto para una vida activa</h1>
        <h2 className='h2'>Watch</h2>

        {loading ? (
          <Loading />
        ) : (
          <div>
            <Grid container spacing={2}>
              {pageProd.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Link className='noShadow' to={"/detalle/" + item._id}>
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
                      <h6>
                        ${" "}
                        {Math.round(item.precioBase * values.dolarBlue).toLocaleString(
                          "es-AR",
                          { useGrouping: true }
                        )}
                      </h6>{" "}
                      <h6>{item.marca}</h6>
                      <br />
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>
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
