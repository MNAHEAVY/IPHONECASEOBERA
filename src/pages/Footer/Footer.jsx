import * as React from "react";
import "./Footer.css";
import { HiMail } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const excludePaths = ["/admin"];

  if (excludePaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className='nav'>
      <span className='dev'>
        <Link className='lin' to='/terminos' color='inherit'>
          Terminos |
        </Link>
        {" © "}
        <Link className='lin' to='https://github.com/MNAHEAVY' color='inherit'>
          MnaDev {"  "}
        </Link>
        {new Date().getFullYear()}
      </span>

      <div className='linksik'>
        <a className='links' href='mailto:davidalexanderh21@gmail.com'>
          <HiMail />
        </a>
        <a className='links' href='https://wa.me/5493755611592'>
          <BsWhatsapp />
        </a>
        <a className='links' href='https://www.instagram.com/iphonecaseobera/'>
          <BsInstagram />
        </a>
      </div>
    </nav>
  );
}
