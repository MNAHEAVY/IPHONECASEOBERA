import { useState, useEffect } from "react";
import "./Home.css";
import Pagination from "../Pagination/Pagination";
import { Box, Grid } from "@mui/material";
import FloatButton from "../Button/FloatButton";
import CloseButton from "react-bootstrap/CloseButton";
import { getAllProducts } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const prod = useSelector((state) => state.products);
  const dispatch = useDispatch(); // add this line to get the dispatch function
  const [loading, setLoading] = useState(true); // add state for loading

  let idxLastItem = currentPage * 6;
  let ixdFirstItem = idxLastItem - 6;
  let pageProd = prod.slice(ixdFirstItem, idxLastItem);
  const paginate = (number) => {
    setCurrentPage(number);
  };
  useEffect(() => {
    dispatch(getAllProducts()).then(() => setLoading(false)); // call dispatch as a function and set loading to false when done
  }, [dispatch]);

  //Getting value of the query from the url
  const [searchParams] = useSearchParams();
  const filters = [];
  if (searchParams.has("nombre")) {
    filters.push(["nombre", searchParams.get("nombre")]);
  }

  let filteredProducts = prod.filter((product) => {
    let keep = true;
    filters.forEach((filter) => {
      if (filter[0] === "nombre") {
        keep =
          keep &&
          product.nombre.toLowerCase().includes(filter[1].toLowerCase());
      } else {
        keep = keep && product[filter[0]] === filter[1];
      }
    });
    return keep;
  });

  pageProd = filteredProducts.slice(ixdFirstItem, idxLastItem);

  const location = useLocation();
  const navigate = useNavigate();

  // Clear filters
  function clearFilter(filter) {
    searchParams.delete(filter);
    location.search = `?${searchParams.toString()}`;
    navigate(location);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1 id="centering">Accesorios Iphone desde Oberá</h1>
      <h2 class="h2">Inicio</h2>
      {filters.length > 0 && (
        <div className="filters-container">
          {filters.map((filter, index) => (
            <div key={index} className="filter">
              {filter[0]}: {filter[1]}
              <CloseButton onClick={() => clearFilter(filter[0])} />
            </div>
          ))}
        </div>
      )}
      {loading ? ( // show loading component if still loading
        <Loading />
      ) : (
        <Grid container sparcing={2}>
          {pageProd?.map((item) => (
            <Grid item xs={4}>
              <Link className="noShadow" to={"/detalle/" + item._id}>
                <div id="centering">
                  <img id="imgDetail" src={item.imagen[0]} loading="lazy" />
                </div>
                <br />
                <div id="centering">
                  <h6>{item.nombre}</h6>
                  <h6>${(item.precio[0] * 400).toFixed(2)}</h6>
                  <h6>{item.marca}</h6>
                  <br />
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination
        currentPage={currentPage}
        postPerPage={6}
        totalPosts={prod.length}
        paginate={paginate}
      />
      <FloatButton />
    </Box>
  );
}
