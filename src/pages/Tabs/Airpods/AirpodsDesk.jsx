import { useState, useEffect } from "react";
import { getAllProductsAction, getValuesAction } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import { Box, Grid } from "@mui/material";
import FloatButton from "../../Button/FloatButton";
import BackButton from "../../Button/Back";
import { calcularPrecioFinal } from "../../../functions/price";

export default function AirpodsDesk() {
  const user = useSelector((state) => state.checkUser);
  const [currentPage, setCurrentPage] = useState(1);
  const prod = useSelector((state) =>
    state.products.filter((product) => product.disponible === true)
  );
  const dispatch = useDispatch(); // add this line to get the dispatch function
  const [loading, setLoading] = useState(true);
  const values = useSelector((state) => state.values);

  useEffect(() => {
    dispatch(getValuesAction());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllProductsAction()).then(() => setLoading(false)); // call dispatch as a function and set loading to false when done
  }, [dispatch]);

  const iph = prod.filter((cat) => cat.categorias == "Airpods");
  // Pagination logic

  let idxLastItem = currentPage * 6;
  let ixdFirstItem = idxLastItem - 6;
  let pageProd = iph.slice(ixdFirstItem, idxLastItem);
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
        <h1 id='centering'>Música en tus oídos, libertad en tus manos.</h1>
        <h2 class='h2'>Airpods</h2>

        {loading ? ( // show loading component if still loading
          <Loading />
        ) : (
          <Grid container sparcing={2}>
            {pageProd.map((item) => (
              <Grid item xs={4}>
                <Link className='noShadow' to={"/detalle/" + item._id}>
                  <div id='centering'>
                    <img id='imgDetail' src={item.imagenGeneral[0]} loading='lazy' />
                  </div>
                  <br />
                  <div id='centering'>
                    <h6>{item.nombre}</h6>
                    <h6>${calcularPrecioFinal(user, item, values)}</h6>
                    <br />
                  </div>{" "}
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
