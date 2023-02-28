import {useState,useEffect} from 'react'
import './Home.css'
import products from "../../../products.json"
import ProductCard from '../Cards/Cards'
import Pagination from '../Pagination/Pagination'
import { Box, Grid} from '@mui/material'
import { FitScreen } from '@mui/icons-material'




export default function Home(){
  //const [currentPage, setCurrentPage] = useState(1);
    const prod = products.productos
 
   
  
 

   
    return(
      <Box sx={{ flexGrow: 1 }}>
      <Grid container sparcing={2}>
      {prod.map((item) => (
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

