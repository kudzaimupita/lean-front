import React from "react";
import Simple from "./Simple";
import SignUp from "../../../views/auth/SignUp/index";
import {useLocation} from 'react-router-dom'
import View from "views";
import { useSelector } from "react-redux";
import { LAYOUT_TYPE_BLANK } from "constants/theme.constant";

const AuthLayout = (props) => {
  const location=useLocation()
  const layoutType = useSelector((state) => state.theme.layout.type);
  const path = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
console.log(path)
  return (
    <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
  fghjkhgjk
        <Simple>
          <SignUp/>
        </Simple>
    </div>
  );
};

export default AuthLayout;
