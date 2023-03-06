import {useState,useEffect} from 'react'
import products from "../../../products.json"
import Pagination from '../Pagination/Pagination'
import { Box, Grid} from '@mui/material'
import NavBar from '../NavBar/NavBar'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { GrFavorite } from 'react-icons/gr'
import { CgProfile } from 'react-icons/cg'
import a from "../../assets/apple.png";
import { Link } from 'react-router-dom'
import FloatButton from '../Button/FloatButton'




export default function Iphone(){
    const [currentPage, setCurrentPage] = useState(1);
    const prod = products.productos

    const iph = prod.filter(cat=> cat.categorias == "iPhone")
    // Pagination logic
    
    let idxLastItem = currentPage * 6;
    let ixdFirstItem = idxLastItem - 6;
    let pageProd = iph.slice(ixdFirstItem, idxLastItem);
    const paginate = (number) => {
      setCurrentPage(number)
    };

  
 

   
    return(
<div>


      <div id='pepe'>
      <span>
      <img id="imgtwo" src={a}></img>
      </span>

      <span id="buttons">
      <Link >
      <GrFavorite size="2rem" color='black'/>
      </Link>
      <Link>
      <CgProfile size="2rem" color='black'/>
      </Link>
      <Link>
      <MdOutlineShoppingCart size="2rem" color='black' />
      </Link>


      </span>

      </div>


        
        <Box sx={{ flexGrow: 1 }}>

<div>
            <NavBar/>
        </div>
        <h1 id="centering">Te acercamos el Iphone que deseas</h1>

<h2 class="h2">iPhone</h2>
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
    <Pagination currentPage={currentPage} postPerPage={6} totalPosts={iph.length} paginate={paginate} />
    <FloatButton/>
    </Box>
    </div>
     
        )
}

