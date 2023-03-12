// From React
import React, { useState } from "react";
import { Link } from "react-router-dom";
// Icons
import { AiFillShopping } from "react-icons/ai";
import { AiFillPushpin } from "react-icons/ai";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
// Favorites and cart Logic
import { addToFav, addToCart } from "./Fav&Cart";
// Custom Styles
import "./Cards.css";
// Material UI
import FavoriteIcon from "@mui/icons-material/Favorite";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
//import Skeleton from '@mui/material/Skeleton';
//import { useDispatch, useSelector } from "react-redux";
//import { booleano } from "../../redux/actions/productActionsTest";

export default function Card({
  userName,
  userImage,
  nombre,
  marca,
  precio,
  imagen,
  stock,
  _id,
  handleAdded,
  handleNotAdded,
  setFavProducts,
}) {
  const handleFavoritesState = (e) => {
    let favs = JSON.parse(localStorage.getItem("favList"));
    let answer = favs?.map((fav) => fav === _id);
    return answer;
  };

  return (
    <div className="container rounded-lg mb-5" key={_id}>
      <div className="img-container">
        <Link to={`/detail/${_id}`}>
          <img id="imgDetail" src={imagen} loading="lazy" />
        </Link>

        <div>
          <div className="flex justify-center items-center">
            <h2 className="font-semibold text-xl w-52 ">{nombre}</h2>
            <div className="flex text-center justify-start gap-1 absolute left-4">
              <FavoriteIcon className="text-red-500" />
            </div>
          </div>

          <div className="flex items-center">
            <div className="font-medium flex items-center absolute right-6 text-xl">
              <MonetizationOnIcon className="text-green-500" />
              <span className="relative bottom-0.5">{precio}</span>
            </div>
          </div>
        </div>
      </div>
      <ul className="social-media">
        <li>
          <a href="#">
            <i className="gr gr-pin">
              <AiFillPushpin
                onClick={(e) => {
                  addToFav(
                    userName,
                    userImage,
                    nombre,
                    marca,
                    precio,
                    imagen,
                    stock,
                    _id,
                    handleAdded,
                    handleNotAdded,
                    setFavProducts
                  );
                }}
              />
            </i>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="gr gr-bag">
              {stock > 0 ? (
                <AiFillShopping
                  onClick={(e) => {
                    addToCart(
                      userName,
                      userImage,
                      nombre,
                      marca,
                      precio,
                      imagen,
                      stock,
                      _id,
                      handleAdded,
                      handleNotAdded,
                      setFavProducts
                    );
                    dispatch(booleano());
                  }}
                  disabled={stock === 0}
                />
              ) : (
                <RemoveShoppingCartIcon
                  onClick={(e) => {
                    outOfStock(e);
                  }}
                  className={"text-red-500"}
                />
              )}
            </i>
          </a>
        </li>
      </ul>
    </div>
  );
}
