import React from "react";
import { useGlobalFilterContext } from "../context/filterContext";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { gridView, filterProducts } = useGlobalFilterContext();

  if (gridView === true) {
    return <GridView products={filterProducts} />;
  }

  if (gridView === false) {
    return <ListView products={filterProducts} />;
  }
};

export default ProductList;
