import { AUTH_PREFIX_PATH } from "constants/route.constant";
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from "constants/navigation.constant";
import { ADMIN, USER } from "constants/roles.constant";

const authNavigationConfig = [
  {
    key: "authentication",
    path: "",
    title: "System",
    // translateKey: "nav.authentication.authentication",
    icon: "security",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ADMIN, USER, "system.preferences"],
    subMenu: [
      {
        key: "system.preferences",
        path: "system/preferences/profile",
        title: "Preferences",
        // translateKey: "nav.authentication.signIn",
        icon: "settings",
        type: NAV_ITEM_TYPE_ITEM,
        authority: ["system.preferences"],
        subMenu: [],
      },
      {
        key: "system.sites",
        // path: "",
        title: "Sites",
        // translateKey: "nav.authentication.signIn",
        path: `system/sites`,
        icon: "site",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "authentication.signIn",
        path: "",
        title: "System Security",
        // translateKey: "nav.authentication.signIn",
        icon: "security",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      // {
      //   key: "authentication.sdignIn",
      //   path: "",
      //   title: "Billing",
      //   // translateKey: "nav.authentication.signIn",
      //   icon: "security",
      //   type: NAV_ITEM_TYPE_ITEM,
      //   authority: [ADMIN, USER],
      //   subMenu: [],
      // },
      {
        key: "docs.documentation",
        path: "/docs/documentation/introduction",
        title: "Help",
        // translateKey: "nav.authentication.signIn",
        icon: "help",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
    ],
  },
];

export default authNavigationConfig;
