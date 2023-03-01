import React from "react";
import appConfig from "configs/app.config";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "utils/hooks/useAuth";
import { useSelector } from "react-redux";

const { unAuthenticatedEntryPath } = appConfig;

const ProtectedRoute = () => {
  function negative(number) {
    return number < 0;
  }
  const company = useSelector((state) => state.auth.company);
  console.log(
    new Date(company?.trialStartDate).getTime() -
      new Date(company?.trialEndDate).getTime()
  );
  const diffTime = new Date(company?.trialEndDate).getTime() - Date.now();
  const trialExpired = negative(diffTime / 8.64e7);

  const { authenticated } = useAuth();

  const location = useLocation();

  if (!authenticated) {
    return (
      <Navigate
        to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
