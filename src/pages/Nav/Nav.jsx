import * as React from 'react';
import "./Nav.css"
import a from "../../assets/apple.png";
import { GrFavorite } from 'react-icons/gr';
import { MdOutlineShoppingCart } from 'react-icons/md';

import { Link } from 'react-router-dom';
import LoginButton from '../Sign/Login';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../Sign/Logout';
import { NavDropdown } from "react-bootstrap";




export default function Nav() {

    const { user, isAuthenticated, isLoading } = useAuth0()


  return (
    
  <div id='pepe'>
          <span>
          <Link to="/admin" >
        <img id="imgtwo" src={a}></img>
          </Link>
          </span>

          <span id="buttons">
          <Link to="/favoritos"  >
          <GrFavorite size="2rem" color='black'/>
          </Link>

          {isAuthenticated ?
                    <>
                        
                        <img className="ProfileImg" src={user.picture} alt="user"referrerPolicy="no-referrer"></img><NavDropdown id="navbarScrollingDropdown">
                            <NavDropdown.Item href='/profile/data' z-index="3000" className="dropDown" >Personal Data</NavDropdown.Item>
                            {/* <NavDropdown.Item href='/profile/shop-history' className="dropDown" >Shopping history</NavDropdown.Item> */}
                            <NavDropdown.Item href='/profile/my-products' className="dropDown" >My Products</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href='/' className="dropDown" ><LogoutButton/></NavDropdown.Item>
                        </NavDropdown>
                        
                    </>
                    : (!isLoading && <a><LoginButton /></a>)}


          <Link to="/cart" >
          <MdOutlineShoppingCart size="2rem" color='black' />
          </Link>


          </span>

          </div>


  );
}