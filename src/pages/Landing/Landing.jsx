import React from 'react';
import axios from 'axios';
import a from "../../assets/apple.png";
import { GrFavorite } from 'react-icons/gr';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { CgProfile} from 'react-icons/cg';
import NavBar from '../NavBar/NavBar';
import './Landing.css'
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Carrousel from '../Carousel/Carousel';
import Home from '../Home/Home';


// const getInfoDolar = async (req, res) => {
//   try {
//       const dataDolar = await axios.get("https://www.dolarsi.com/api/dolarSiInfo.xml",  { mode: 'no-cors' })
//       const json = convert.xml2json(dataDolar.data, {compact: true, spaces: 4});
//       const jsonParsed = JSON.parse(json);

//       return jsonParsed
//   } catch(e) {
//       res.sendStatus(500)
//       console.log(e)
//   }
// }
// console.log(getInfoDolar())

export default function Landing(){


    return(
      <>
         
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
          
          <div>
            <Carrousel/>
          </div>
          <div>
            <Home/>
          </div>
          <div>
            <NavBar />

          </div>
      

    
          


           <h3>Iphone case Oberá</h3>
           
        
           
       
        
                
    
        
        </div>
        
        <div>
        <Footer />
        </div>
        </>
       
        )
}
