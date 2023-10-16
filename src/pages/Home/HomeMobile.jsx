import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, useTheme, useMediaQuery } from "@mui/material";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";

import Pagination from "../Pagination/Pagination";
import FloatButton from "../Button/FloatButton";
import Loading from "../Loading/Loading";

import { getAllProductsAction, getValuesAction } from "../../redux/actions";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const prod = useSelector((state) =>
    state.products.filter((product) => product.disponible === true)
  );
  const values = useSelector((state) => state.values);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getValuesAction());
    dispatch(getAllProductsAction()).then(() => setLoading(false));
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to apply filters
  const applyFilters = (products, filters) => {
    return products.filter((product) => {
      return filters.every((filter) => {
        if (filter[0] === "nombre") {
          return product.nombre.toLowerCase().includes(filter[1].toLowerCase());
        } else {
          return product[filter[0]] === filter[1];
        }
      });
    });
  };

  // Apply filters
  const filters = [];
  if (searchParams.has("nombre")) {
    filters.push(["nombre", searchParams.get("nombre")]);
  }
  const filteredProducts = applyFilters(prod, filters);

  // Determine the number of columns based on the screen width
  const theme = useTheme();

  const postPerPage = 6;

  // Paginate filtered products
  const idxLastItem = currentPage * postPerPage;
  const ixdFirstItem = idxLastItem - postPerPage;
  const pageProd = filteredProducts.slice(ixdFirstItem, idxLastItem);

  // Helper function to clear filters
  const clearFilter = (filter) => {
    searchParams.delete(filter);
    location.search = `?${searchParams.toString()}`;
    navigate(location);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1 id='centering'>Accesorios Iphone desde Oberá</h1>
      <h2 className='h2'>Inicio</h2>
      {filters.length > 0 && (
        <div className='filters-container'>
          {filters.map((filter, index) => (
            <div key={index} className='filter'>
              {filter[0]}: {filter[1]}
              <CloseButton onClick={() => clearFilter(filter[0])} />
            </div>
          ))}
        </div>
      )}
      {loading ? (
        <Loading />
      ) : (
        <Grid container spacing={2}>
          {pageProd?.map((item) => (
            <Grid key={item._id} item xs={12} sm={6} md={4}>
              <Link className='noShadow' to={"/detalle/" + item._id}>
                <div id='centering'>
                  <img
                    id='imgDetail'
                    src={item.imagenGeneral[0]}
                    loading='lazy'
                    alt={item.nombre}
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
                  </h6>
                  <h6>{item.marca}</h6>
                  {item.subCategoria === "Smartphone" && (
                    <h5 className='borderH5'>{item.estado}</h5>
                  )}
                  <br />
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination
        currentPage={currentPage}
        postPerPage={postPerPage}
        totalPosts={filteredProducts.length}
        paginate={setCurrentPage}
      />
      <br />
      <FloatButton />
      <br />
    </Box>
  );
}
