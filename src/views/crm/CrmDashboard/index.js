import React, { useEffect } from "react";
import reducer from "./store";
import { injectReducer } from "store/index";
import { getCrmDashboardData } from "./store/dataSlice";
import { Loading } from "components/shared";
import Statistic from "./components/Statistic";
import LeadByCountries from "./components/LeadByCountries";
import EmailSent from "./components/EmailSent";
import Leads from "./components/Leads";
import { useDispatch, useSelector } from "react-redux";
// import { render } from 'react-dom';

import Map from "./Map";

const center = {
  lat: 47.6062095,
  lng: -122.3320708,
};
// injectReducer("crmDashboard", reducer);

const CrmDashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-4 h-full">
      <Map
        app_id="YOUR_APP_ID"
        app_code="YOUR_APP_CODE"
        center={center}
        zoom={14}
      />
    </div>
  );
};

export default CrmDashboard;
