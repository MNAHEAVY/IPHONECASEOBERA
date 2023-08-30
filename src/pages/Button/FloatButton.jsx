import React, { useState } from "react";
import { IoMdContacts } from "react-icons/io";
import { MdCompare } from "react-icons/md";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import "./styles.css";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import GoldenSparksAnimation from "./GoldenSparsk";
import logo from "../../assets/logo.png";
const Icon = ({ children }) => (
  <span className='material-symbols-outlined'>{children}</span>
);

export default function FloatButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className='fab'>
        <GoldenSparksAnimation />
      </div>
      <div className='fabB'>
        <button className='fabbutton'>
          <Link className='fabLink' to='/obercoins'>
            <img style={{ width: "3.5rem", height: "3.5rem" }} src={logo} />
          </Link>
        </button>
      </div>
    </>
  );
}
