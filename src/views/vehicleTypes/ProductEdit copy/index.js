import React, { useEffect, useState } from "react";
import { Loading, DoubleSidedImage } from "components/shared";
import { toast, Notification } from "components/ui";
import reducer from "./store";
import { injectReducer } from "store/index";
import { useLocation, useNavigate } from "react-router-dom";
// import { getProduct, updateProduct, deleteProduct } from "./store/dataSlice";
import { getVehicleType } from "../../../services/vehicleTypeService";
import ProductForm from "../Form/index";
import isEmpty from "lodash/isEmpty";

const ProductEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
  const path = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  useEffect(() => {
    if (path === "add") {
      setVehicle({});
    }
    // const rquestParam = new URLSearchParams(location.pathname);
    // console.log(location.pathname.split("/"));
    path !== "add" && setLoading(true);
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
    path !== "add" &&
      getVehicleType(path)
        .then((data) => {
          setVehicle(data);
          setLoading(false);
        })
        .catch(setLoading(true));
    // setLoading(false);
    // fetchData(rquestParam);
    console.log(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <Loading loading={loading}>
        {(!isEmpty(vehicle) || path === "add") && (
          <>
            <ProductForm
              loading={loading}
              type="edit"
              initialData={vehicle}
              onFormSubmit={handleFormSubmit}
              onDiscard={handleDiscard}
              onDelete={handleDelete}
            />
          </>
        )}
      </Loading>
      {(!loading && isEmpty(vehicle)) ||
        (path === "add" && (
          <div className="h-full flex flex-col items-center justify-center">
            <DoubleSidedImage
              src="/img/others/img-2.png"
              darkModeSrc="/img/others/img-2-dark.png"
              alt="No product found!"
            />
            <h3 className="mt-8">No product found!</h3>
          </div>
        ))}
    </>
  );
};

export default ProductEdit;
