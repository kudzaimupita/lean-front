import { combineReducers } from "@reduxjs/toolkit";
import session from "./sessionSlice";
import user from "./userSlice";
import site from "./siteSlice";
import company from "./companySlice";

const reducer = combineReducers({
  session,
  user,
  company,
  site,
});

export default reducer;
