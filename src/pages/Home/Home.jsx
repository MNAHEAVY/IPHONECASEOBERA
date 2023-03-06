import {useState,useEffect} from 'react'
import './Home.css'
import products from "../../../products.json"
import Pagination from '../Pagination/Pagination'
import { Box, Grid} from '@mui/material'
import FloatButton from '../Button/FloatButton'




export default function Home(){
    const [currentPage, setCurrentPage] = useState(1);
    const prod = products.productos
 
    let idxLastItem = currentPage * 6;
    let ixdFirstItem = idxLastItem - 6;
    let pageProd = prod.slice(ixdFirstItem, idxLastItem);
    const paginate = (number) => {
      setCurrentPage(number)
    };
  
 

   
    return(
      <Box sx={{ flexGrow: 1 }}>
        <h1 id="centering">Accesorios Iphone desde Oberá</h1>

        <h2 class="h2">Inicio</h2>
      <Grid container sparcing={2}>
      {pageProd.map((item) => (
        <Grid item xs={4}>
          <div id="centering">
          <img id="imgDetail"
            src={item.imagen[0]}
            loading="lazy"
          />
          </div>
          <div id="centering">
            <h6>{item.nombre}</h6>
            <h6>${item.precio[0] * 380}</h6>
            <h6>{item.marca}</h6>
          </div>

        </Grid >
      ))}
    </Grid >
    <Pagination currentPage={currentPage} postPerPage={6} totalPosts={prod.length} paginate={paginate} />
    <FloatButton/>
    </Box>
        )
}

