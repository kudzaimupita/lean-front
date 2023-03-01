import React, { useEffect, useState } from "react";
import { Loading, DoubleSidedImage } from "components/shared";
import { toast, Notification } from "components/ui";
import reducer from "./store";
import { injectReducer } from "store/index";
import { useLocation, useNavigate } from "react-router-dom";
// import { getProduct, updateProduct, deleteProduct } from "./store/dataSlice";
import { getSite } from "../../../services/siteService";
import ProductForm from "../Form/index";
import isEmpty from "lodash/isEmpty";
import { useDispatch, useSelector } from "react-redux";
const ProductEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const [vehicle, setSite] = useState({});
  // const [refresh, setRefresh] = useState(false);
  const path = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  useEffect(() => {
    if (path === "add") {
      setSite({});
    }
    // const rquestParam = new URLSearchParams(location.pathname);
    // console.log(location.pathname.split("/"));
    path !== "new-site" && setLoading(true);
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
    path !== "new-site" &&
      getSite(path)
        .then((data) => {
          console.log(data);
          setSite(data);
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
        {(!isEmpty(vehicle) || path === "new-site") && (
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
