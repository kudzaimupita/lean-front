import React from "react";
import Side from "./Side";
import Cover from "./Cover";
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
      {layoutType === LAYOUT_TYPE_BLANK ? (
        <View {...props} />
      ) : path ==='welcome'?(
      
          <View {...props} />
      
      ):(
        <Cover>
          <View {...props} />
        </Cover>)}
    </div>
  );
};

export default AuthLayout;
