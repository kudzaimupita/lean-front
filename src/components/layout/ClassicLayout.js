import React, { useEffect } from "react";
import Header from "components/template/Header";
import SideNavToggle from "components/template/SideNavToggle";
import Search from "components/template/Search";
import { setUser } from "store/auth/userSlice";
import Notification from "components/template/Notification";
import SidePanel from "components/template/SidePanel";
import MobileNav from "components/template/MobileNav";
import UserDropdown from "components/template/UserDropdown";
import SideNav from "components/template/SideNav";
import { Alert } from "components/ui";
import View from "views";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const HeaderActionsStart = () => {
  return (
    <>
      <MobileNav />
      <SideNavToggle />
      <Search />
    </>
  );
};

const HeaderActionsEnd = () => {
  return (
    <>
      {/* <LanguageSelector /> */}
      <Notification />
      <SidePanel />
      <UserDropdown hoverable={false} />
    </>
  );
};

const ClassicLayout = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function negative(number) {
    return number < 0;
  }
  const company = useSelector((state) => state?.auth?.company);
  const paymentStatus = useSelector(
    (state) => state?.auth?.company?.paymentStatus
  );
  const user = useSelector((state) => state?.auth?.user);
  const newUSer = { ...user, authority: ["system.preferences"] };

  const diffTime = new Date(company?.trialEndDate).getTime() - Date.now();
  const trialExpired = negative(diffTime / 8.64e7);

  useEffect(() => {
    if (trialExpired && paymentStatus !== "paid") {
      // <Navigate to="/system/preferences/billing" />;
      navigate("/system/preferences/billing");
      dispatch(setUser(newUSer));
    }
  }, []);

  const daysLeftOnTrial = Math.floor(diffTime / 8.64e7);
  return (
    <div className="app-layout-classic flex flex-auto flex-col">
      <div className="flex flex-auto min-w-0">
        <SideNav />

        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
          <Alert closable={true} className="" type="danger" showIcon>
            {trialExpired
              ? "Your trial is expired. Please upgrade to continue"
              : `Thank you for using Baboon. You have ${daysLeftOnTrial} days left on
            your trial !`}
            <span className="underline font-bold"> Upgrade your plan</span>
          </Alert>
          <Header
            className="shadow dark:shadow-2xl"
            headerStart={<HeaderActionsStart />}
            headerEnd={<HeaderActionsEnd />}
          />
          <div className="h-full flex flex-auto flex-col">
            <View {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicLayout;
