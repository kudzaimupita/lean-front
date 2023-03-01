import React from "react";
import reducer from "../../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
// import ProductTable from '../../ProductTable'
import ProductTableTools from "../../TableView/TableTools";

injectReducer("dataList", reducer);

const ProductList = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">Vehicles</h3>
        <ProductTableTools />
      </div>
      {/* <ProductTable /> */}
    </AdaptableCard>
  );
};

export default ProductList;
