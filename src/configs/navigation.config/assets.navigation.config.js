import { APP_PREFIX_PATH } from "constants/route.constant";
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from "constants/navigation.constant";
import { ADMIN, USER } from "constants/roles.constant";
import { HiPencilAlt, HiOutlineTrash, HiArrowCircleLeft } from "react-icons/hi";
import store, { persistor } from "../../store";

const resources = store
  .getState()
  ?.auth?.company?.collections?.map((resource) => {
    if (resource.title) {
      return {
        key: resource.name,
        path: `/app/${resource.name}`,
        title: resource.title,
        // translateKey: "nav.appsSales.fuelEntry",
        icon: resource.icon,
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      };
    }
  });

const appsNavigationConfig = [
  {
    key: "apps",
    path: "",
    title: "Assets",
    translateKey: "nav.apps",
    icon: "work",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [ADMIN, USER],
    subMenu: [
      ...resources,
      {
        key: "appsSales.dashboard",
        path: `${APP_PREFIX_PATH}/dashboard`,
        title: "Dashboard",
        // translateKey: "nav.appsSales.fuelEntry",
        icon: "apps",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "appsSales.productNew",
        path: `${APP_PREFIX_PATH}/sales/product-new`,
        title: "New Asset",
        // translateKey: "nav.appsSales.productNew",
        icon: "add",
        type: NAV_ITEM_TYPE_ITEM,
        authority: ["createAssets", "createAssets"],
        subMenu: [],
        // newIcon: <HiArrowCircleLeft />,
      },

      {
        key: "appsSales.productList",
        path: `${APP_PREFIX_PATH}/vehicles`,
        title: "Assets",
        // translateKey: "nav.appsSales.productList",
        icon: "documentation",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, "createAssets"],
        subMenu: [],
      },

      // {
      //   key: "appsSales.producstList",
      //   path: `${APP_PREFIX_PATH}/vehicsles`,
      //   title: "Issues",
      //   // translateKey: "nav.appsSales.productList",
      //   icon: "documentation",
      //   type: NAV_ITEM_TYPE_ITEM,
      //   authority: [ADMIN, "createAssets"],
      //   subMenu: [],
      // },

      {
        key: "appsSales.assignments",
        path: `${APP_PREFIX_PATH}/assignments`,
        title: "Assignments",
        // translateKey: "nav.appsSales.fuelEntry",
        icon: "assignment",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "appsSales.inspections",
        path: `${APP_PREFIX_PATH}/inspections`,
        title: "Inspections",
        // translateKey: "nav.appsSales.inspection",
        icon: "inspection",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "appsSales.issues",
        path: `${APP_PREFIX_PATH}/issues`,
        title: "Partners",
        translateKey: "nav.appsSales.issues",
        icon: "issue",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "app.locations",
        path: `app/locations`,
        title: "Locations",
        // translateKey: "nav.appsSales.issues",
        icon: "location",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "app.departments",
        path: `app/departments`,
        title: "Departments",
        // translateKey: "nav.appsSales.issues",
        icon: "location",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "app.calender",
        path: `app/calender`,
        title: "Calender",
        // translateKey: "nav.appsSales.fuelEntry",
        icon: "calendar",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "appsSales.reminders",
        path: `${APP_PREFIX_PATH}/reminders`,
        title: "Reminders",
        // translateKey: "nav.appsSales.reminders",
        icon: "reminder",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },

      {
        key: "appsSales.vehicleTypsesdd",
        path: `${APP_PREFIX_PATH}/vehicleTypes`,
        title: "Personnel",
        // translateKey: "nav.appsSales.workOrders",
        icon: "expense",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      // {
      //   key: "appsSales.downtime",
      //   path: `${APP_PREFIX_PATH}/downtime`,
      //   title: "Downtime",
      //   // translateKey: "nav.appsSales.fuelEntry",
      //   icon: "apps",
      //   type: NAV_ITEM_TYPE_ITEM,
      //   authority: [ADMIN, USER],
      //   subMenu: [],
      // },
      {
        key: "appsSales.service",
        path: `${APP_PREFIX_PATH}/service
        `,
        title: "Events",
        // translateKey: "nav.appsSales.fuelEntry",
        icon: "apps",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        subMenu: [...resources],
      },
      {
        key: "appsSales.reprts",
        path: `${APP_PREFIX_PATH}/metsers`,
        title: "Audits/Reports",
        // translateKey: "nav.appsSales.fuelEntry",
        icon: "report",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "appsSales.vehicleTypes",
        path: `${APP_PREFIX_PATH}/vehicleTypes`,
        title: "Configuration",
        translateKey: "nav.appsSales.vehicleType",
        icon: "config",
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
    ],
  },
];

export default appsNavigationConfig;
