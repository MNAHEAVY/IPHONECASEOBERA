import { useState, useEffect } from "react";
import products from "../../../../products.json";
import Pagination from "../../Pagination/Pagination";
import { Box, Grid } from "@mui/material";
import FloatButton from "../../Button/FloatButton";

export default function Airpods() {
  const [currentPage, setCurrentPage] = useState(1);
  const prod = products.productos;

  const iph = prod.filter((cat) => cat.categorias == "Airpods");
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
        <h1 id="centering">Música en tus oídos, libertad en tus manos.</h1>

        <h2 class="h2">Airpods</h2>
        <Grid container sparcing={2}>
          {pageProd.map((item) => (
            <Grid item xs={4}>
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
            </Grid>
          ))}
        </Grid>
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
