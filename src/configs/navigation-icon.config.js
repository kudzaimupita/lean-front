import React from "react";
import {
  HiOutlineChartSquareBar,
  HiOutlineUserGroup,
  HiOutlineTrendingUp,
  HiOutlineUserCircle,
  HiOutlineBookOpen,
  HiOutlineCurrencyDollar,
  HiOutlineShieldCheck,
  HiOutlineColorSwatch,
  HiOutlineChatAlt,
  HiOutlineDesktopComputer,
  HiOutlinePaperAirplane,
  HiOutlineChartPie,
  HiOutlineUserAdd,
  HiOutlineKey,
  HiOutlineBan,
  HiOutlineHand,
  HiOutlineDocumentText,
  HiOutlineTemplate,
  HiOutlineLockClosed,
  HiOutlineDocumentDuplicate,
  HiOutlineViewGridAdd,
  HiOutlineShare,
  HiOutlineVariable,
  HiOutlineCode,
  HiPlusCircle,
  HiLocationMarker,
  HiChat,
} from "react-icons/hi";

import { AiOutlineIssuesClose } from "react-icons/ai";
import { GiPayMoney, GiOrganigram } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { FaPeopleArrows } from "react-icons/fa";
import { GrShieldSecurity } from "react-icons/gr";

import { FcInspection, FcDataConfiguration } from "react-icons/fc";
import {
  MdAssignmentInd,
  MdOutlineAddAlarm,
  MdOutlineSecurity,
} from "react-icons/md";
import {
  BsListTask,
  BsChatRightTextFill,
  BsClockHistory,
  BsFillPersonLinesFill,
} from "react-icons/bs";

const navigationIcon = {
  me: <BsFillPersonLinesFill />,
  logs: <BsClockHistory />,
  config: <FcDataConfiguration />,
  security: <MdOutlineSecurity />,
  partner: <FaPeopleArrows />,
  chat: <BsChatRightTextFill />,
  report: <TbReportAnalytics />,
  work: <BsListTask />,
  hr: <GiOrganigram />,
  expense: <GiPayMoney />,
  reminder: <MdOutlineAddAlarm />,
  issue: <AiOutlineIssuesClose />,
  assignment: <MdAssignmentInd />,
  inspection: <FcInspection />,
  // chat: <HiChat />,
  location: <HiLocationMarker />,
  add: <HiPlusCircle />,
  apps: <HiOutlineViewGridAdd />,
  project: <HiOutlineChartSquareBar />,
  crm: <HiOutlineUserGroup />,
  sales: <HiOutlineTrendingUp />,
  crypto: <HiOutlineCurrencyDollar />,
  knowledgeBase: <HiOutlineBookOpen />,
  account: <HiOutlineUserCircle />,
  uiComponents: <HiOutlineTemplate />,
  common: <HiOutlineColorSwatch />,
  feedback: <HiOutlineChatAlt />,
  dataDisplay: <HiOutlineDesktopComputer />,
  forms: <HiOutlineDocumentText />,
  navigation: <HiOutlinePaperAirplane />,
  graph: <HiOutlineChartPie />,
  authentication: <HiOutlineLockClosed />,
  signIn: <HiOutlineShieldCheck />,
  signUp: <HiOutlineUserAdd />,
  forgotPassword: <HiOutlineLockClosed />,
  resetPassword: <HiOutlineKey />,
  pages: <HiOutlineDocumentDuplicate />,
  welcome: <HiOutlineHand />,
  accessDenied: <HiOutlineBan />,
  guide: <HiOutlineBookOpen />,
  documentation: <HiOutlineDocumentText />,
  sharedComponentDoc: <HiOutlineShare />,
  utilsDoc: <HiOutlineVariable />,
  changeLog: <HiOutlineCode />,
};

export default navigationIcon;
