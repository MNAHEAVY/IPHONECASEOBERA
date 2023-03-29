import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyFav from "../empty/emptyFav";
//import { getFavorites } from "../../redux/actions/productActionsTest";
import "./Favs.css";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.testReducer.favorites);
  const [favProducts, setFavProducts] = useState(
    JSON.parse(localStorage.getItem("favList"))
  );

  useEffect(() => {
    if (favProducts !== undefined) {
      dispatch(getFavorites(favProducts));
    }
  }, [favProducts]);

  const renderProducts = () => {
    if (!favProducts || favProducts.length === 0) {
      return <EmptyFav />;
    }

    let productsMap = favorites.map((e) => <div key={e.id}></div>);

    return <div className="pin_container">{productsMap}</div>;
  };

  return renderProducts();
}
