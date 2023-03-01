import { PAGES_PREFIX_PATH } from "constants/route.constant";
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_ITEM,
} from "constants/navigation.constant";
import { ADMIN, USER } from "constants/roles.constant";

const pagesNavigationConfig = [
  {
    key: "pasdre54sgeds",
    path: "",
    title: "Manufacturing",
    translateKey: "nav.pages.pages",
    icon: "dataDisplay",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ADMIN, USER],
    subMenu: [
      {
        key: "pages.wewrdelcome",
        // path: `${PAGES_PREFIX_PATH}/welcome`,
        title: "Home",
        // translateKey: 'nav.pages.welcome',
        icon: "dataDisplay",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "pages.cwerwdeeele34ecome",
        // path: `${PAGES_PREFIX_PATH}/welcome`,
        title: "Analytics",
        // translateKey: 'nav.pages.welcome',
        icon: "Analytics",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "appsAccount.activityLog",
        path: `/activity-logs`,
        title: "Activity Logs",
        // translateKey: 'nav.pages.welcome',
        icon: "report",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "pages.cwerweldrhjjree34ecome",
        // path: `${PAGES_PREFIX_PATH}/welcomej`,
        title: "Reports",
        // translateKey: 'nav.pages.welcome',
        icon: "Reports",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "pages.cwerwseldrhjjree34ecome",
        // path: `${PAGES_PREFIX_PATH}/welcomej`,
        title: "Organogram",
        // translateKey: 'nav.pages.welcome',
        icon: "Reports",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
    ],
  },
];

export default pagesNavigationConfig;
