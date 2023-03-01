import React, { useEffect, useState } from "react";
import {
  AdaptableCard,
  Loading,
  Container,
  DoubleSidedImage,
} from "components/shared";
import CustomerProfile from "./components/CustomerProfile";
import PaymentHistory from "./components/PaymentHistory";
import CurrentSubscription from "./components/CurrentSubscription";
import PaymentMethods from "./components/PaymentMethods";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "./store/dataSlice";
import reducer from "./store";
import { injectReducer } from "store/index";
import isEmpty from "lodash/isEmpty";
import useQuery from "utils/hooks/useQuery";
import { getVehicle } from "../../../services/vehicleService";
import { useLocation, useNavigate } from "react-router-dom";
injectReducer("crmCustomerDetails", reducer);

const CustomerDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery();

  const data = useSelector(
    (state) => state.crmCustomerDetails.data.profileData
  );
  // const loading = useSelector((state) => state.crmCustomerDetails.data.loading);
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    fetchData();
    console.log(path);
    setLoading(true);
    getVehicle(path).then((data) => {
      setVehicle(data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    const id = query.get("id");
    if (id) {
      dispatch(getCustomer({ id }));
      console.log(id);
    }
  };

  return (
    <Container className="h-full">
      <Loading loading={loading}>
        {!isEmpty(vehicle) && (
          <div className="flex flex-col xl:flex-row gap-4">
            <div>
              <CustomerProfile data={vehicle} />
            </div>
            <div className="w-full">
              <AdaptableCard>
                <CurrentSubscription />
                <PaymentHistory vehicle={vehicle} />
                <PaymentMethods data={data?.paymentMethod} />
              </AdaptableCard>
            </div>
          </div>
        )}
      </Loading>
      {!loading && isEmpty(vehicle) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="Record not found!"
          />
          <h3 className="mt-8">Record not found!</h3>
        </div>
      )}
    </Container>
  );
};

export default CustomerDetail;
