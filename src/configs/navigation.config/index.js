import appsNavigationConfig from "./assets.navigation.config";
import uiComponentNavigationConfig from "./hr.navigation.config";
import pagesNavigationConfig from "./userView.navigation.config";
import authNavigationConfig from "./auth.navigation.config";
import docNavigationConfig from "./doc.navigation.config";
import reportNavigationConfig from "./report.navigation.config copy";
import securityNavigationConfig from "./opsec.navigation.config";
import billingNavigationConfig from "./billing.navigation.config";

import crmNavigationConfig from "./crm.navigation.config";
import salesNavigationConfig from "./sales.navigation.config";
import financialsNavigationConfig from "./finacials.navigation.config";
import { APP_PREFIX_PATH } from "constants/route.constant";
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from "constants/navigation.constant";
import { ADMIN, USER } from "constants/roles.constant";
import { HiPencilAlt, HiOutlineTrash, HiArrowCircleLeft } from "react-icons/hi";
// import billingNavigationConfig from "./billing.navigation.config";
import store, { persistor } from "../../store";

const resources =store.getState().theme.resources
console.log(resources,appsNavigationConfig)
const navigationConfig = [
  // ...resources,
  // ...reportNavigationConfig,
  // ...pagesNavigationConfig,
  ...appsNavigationConfig,
  // ...uiComponentNavigationConfig,

  // ...authNavigationConfig,
  // ...docNavigationConfig,
  // ...reportNavigationConfig,

  // ...crmNavigationConfig,
  // ...salesNavigationConfig,
  // ...financialsNavigationConfig,
  // ...securityNavigationConfig,
  ...billingNavigationConfig,
];

export default navigationConfig;
