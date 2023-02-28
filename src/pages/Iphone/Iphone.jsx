import {useState,useEffect} from 'react'
import products from "../../../products.json"
import ProductCard from '../Cards/Cards'
import Pagination from '../Pagination/Pagination'
import { Box, Grid} from '@mui/material'
import { FitScreen } from '@mui/icons-material'
import NavBar from '../NavBar/NavBar'




export default function Iphone(){
  //const [currentPage, setCurrentPage] = useState(1);
    const prod = products.productos

    const iph = prod.filter(cat=> cat.categorias == "iPhone")
    // Pagination logic
   console.log(iph)

  
 

   
    return(
      <Box sx={{ flexGrow: 1 }}>

<div>
            <NavBar/>
        </div>
        <br></br>
      <Grid container sparcing={2}>
      {iph.map((item) => (
        <Grid item xs={4}>
          <img id="imgDetail"
            src={item.imagen[0]}
            loading="lazy"
          />
          <div id="centering">
            <h6>{item.nombre}</h6>
            <h6>${item.precio * 380}</h6>
            <h6>{item.marca}</h6>
          </div>

        </Grid >
      ))}
    </Grid >
    </Box>
        )
}

