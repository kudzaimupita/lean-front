import React from "react";
import { Navigate } from "react-router-dom";
import useAuthority from "utils/hooks/useAuthority";
import { useSelector } from "react-redux";

const AuthorityGuard = (props) => {
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

  const { userAuthority = [], authority = [], children } = props;

  const roleMatched = useAuthority(userAuthority, authority);
  const view = () => {
    switch (trialExpired) {
      case true:
        return <Navigate to="/system/preferences/billing" />;

      default:
        return children;
    }
  };
  return roleMatched ? children : <Navigate to="/access-denied" />;
};

export default AuthorityGuard;
