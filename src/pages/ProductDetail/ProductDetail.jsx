import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import ProductDetailMobile from "./ProductDetailMobile";
import ProductDetailDesk from "./ProductDetailDesk";

const ProductDetail = () => {
  // Use the useMediaQuery hook to check if the screen width is below 600px (mobile view)
  const isMobileView = useMediaQuery("(max-width:600px)");

  return <>{isMobileView ? <ProductDetailMobile /> : <ProductDetailDesk />}</>;
};

export default ProductDetail;
