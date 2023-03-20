import { useState, useEffect } from "react";
import { getAllProducts } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import Pagination from "../../Pagination/Pagination";
import { Box, Grid } from "@mui/material";
import FloatButton from "../../Button/FloatButton";
import { Link } from "react-router-dom";

export default function Accesorios() {
  const [currentPage, setCurrentPage] = useState(1);
  const prod = useSelector((state) => state.products);
  const dispatch = useDispatch(); // add this line to get the dispatch function
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllProducts()).then(() => setLoading(false)); // call dispatch as a function and set loading to false when done
  }, [dispatch]);

  const iph = prod.filter((cat) => cat.categorias == "Accesorios");
  // Pagination logic

  let idxLastItem = currentPage * 6;
  let ixdFirstItem = idxLastItem - 6;
  let pageProd = iph.slice(ixdFirstItem, idxLastItem);
  const paginate = (number) => {
    setCurrentPage(number);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <br></br>
        <br></br>
        <h1 id="centering">Todo en accesorios sin ir mas lejos</h1>
        <h2 class="h2">Accesorios</h2>

        {loading ? ( // show loading component if still loading
          <Loading />
        ) : (
          <Grid container sparcing={2}>
            {pageProd.map((item) => (
              <Grid item xs={4}>
                <Link className="noShadow" to={"/detalle/" + item._id}>
                  <div id="centering">
                    <img id="imgDetail" src={item.imagen[0]} loading="lazy" />
                  </div>
                  <br />
                  <div id="centering">
                    <h6>{item.nombre}</h6>
                    <h6>${(item.precio[0] * 380).toFixed(2)}</h6>
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
