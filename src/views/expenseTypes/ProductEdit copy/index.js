import React, { useEffect, useState } from "react";
import { Loading, DoubleSidedImage } from "components/shared";
import { toast, Notification } from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "store/index";
import { useLocation, useNavigate } from "react-router-dom";
// import { getProduct, updateProduct, deleteProduct } from "./store/dataSlice";
import { getExpenseType } from "../../../services/expenseTypeService";
import ProductForm from "../Form/index";
import isEmpty from "lodash/isEmpty";

injectReducer("salesProductEdit", reducer);

const ProductEdit = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const productData = useSelector(
    (state) => state.salesProductEdit.data.productData
  );
  // const loading = useSelector((state) => state.salesProductEdit.data.loading);

  const handleFormSubmit = async (values, setSubmitting) => {
    console.log("jjj");
  };

  const handleDiscard = () => {
    navigate("/app/sales/product-list");
  };

  const handleDelete = async (setDialogOpen) => {
    console.log("hhhhhhhhhhhhh");
  };

  const popNotification = (keyword) => {
    toast.push(
      <Notification
        title={`Successfuly ${keyword}`}
        type="success"
        duration={2500}
      >
        Product successfuly {keyword}
      </Notification>,
      {
        placement: "top-center",
      }
    );
    navigate("/app/sales/product-list");
  };

  const [vehicle, setVehicle] = useState({});
  // const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    const rquestParam = { id: path };
    setLoading(true);
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
    getExpenseType(path).then((data) => {
      setVehicle(data);
      setLoading(false);
    });
    // fetchData(rquestParam);
    console.log(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <Loading loading={loading}>
        {!isEmpty(vehicle) && (
          <>
            <ProductForm
              type="edit"
              initialData={vehicle}
              onFormSubmit={handleFormSubmit}
              onDiscard={handleDiscard}
              onDelete={handleDelete}
            />
          </>
        )}
      </Loading>
      {!loading && isEmpty(vehicle) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No product found!"
          />
          <h3 className="mt-8">No product found!</h3>
        </div>
      )}
    </>
  );
};

export default ProductEdit;
