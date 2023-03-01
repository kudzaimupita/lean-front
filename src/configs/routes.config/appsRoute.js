import React from "react";
import { APP_PREFIX_PATH } from "constants/route.constant";
import { ADMIN, USER } from "constants/roles.constant";

const appsRoute = [
  {
    key: "appsProject.dashboard",
    path: `${APP_PREFIX_PATH}/project/dashboard`,
    component: React.lazy(() => import("views/project/ProjectDashboard")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsProject.projectList",
    path: `${APP_PREFIX_PATH}/project/project-list`,
    component: React.lazy(() => import("views/project/ProjectList")),
    authority: [ADMIN, USER],
  },
  {
    key: "app.calender",
    path: `/app/calender`,
    component: React.lazy(() => import("views/crm/Calendar")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsProject.scrumBoard",
    path: `${APP_PREFIX_PATH}/project/scrum-board`,
    component: React.lazy(() => import("views/project/ScrumBoard")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "gutterless",
    },
  },
  {
    key: "appsProject.issue",
    path: `${APP_PREFIX_PATH}/project/issue`,
    component: React.lazy(() => import("views/project/Issue")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsCrm.dashboard",
    path: `${APP_PREFIX_PATH}/crm/dashboard`,
    component: React.lazy(() => import("views/crm/CrmDashboard")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsCrm.calendar",
    path: `${APP_PREFIX_PATH}/crm/calendar`,
    component: React.lazy(() => import("views/crm/Calendar")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsCrm.customers",
    path: `${APP_PREFIX_PATH}/crm/customers`,
    component: React.lazy(() => import("views/crm/Customers")),
    authority: [ADMIN, USER],
    meta: {
      header: "Customers",
    },
  },
  {
    key: "appsCrm.customerDetails",
    path: `${APP_PREFIX_PATH}/vehicles/view/:id`,
    component: React.lazy(() => import("views/crm/CustomerDetail")),
    authority: [ADMIN, USER],
    // meta: {
    //   header: "Vehicle",
    //   headerContainer: true,
    // },
  },
  {
    key: "appsCrm.mail",
    path: `${APP_PREFIX_PATH}/crm/mail`,
    component: React.lazy(() => import("views/crm/Mail")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "gutterless",
      footer: false,
    },
  },
  {
    key: "appsCrm.mail",
    path: `${APP_PREFIX_PATH}/crm/mail/:category`,
    component: React.lazy(() => import("views/crm/Mail")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "gutterless",
      footer: false,
    },
  },
  {
    key: "appsSales.dashboard",
    path: `${APP_PREFIX_PATH}/dashboard`,
    component: React.lazy(() => import("views/crypto/CryptoDashboard/index")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsSales.productList",
    path: `${APP_PREFIX_PATH}/vehicles`,
    component: React.lazy(() => import("views/vehicles/listViewPage.js")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsSales.issues",
    path: `${APP_PREFIX_PATH}/issues`,
    component: React.lazy(() => import("views/issues/index")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsSales.fuelEntry",
    path: `${APP_PREFIX_PATH}/fuel-entries`,
    component: React.lazy(() => import("views/fuelEntries/index")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsSales.vehicleTypes",
    path: `${APP_PREFIX_PATH}/vehicleTypes`,
    component: React.lazy(() => import("views/vehicleTypes/listView.js")),
    authority: [ADMIN, USER],
  },
  {
    key: "vehicles",
    path: `${APP_PREFIX_PATH}/vehicles`,
    component: React.lazy(() => import("views/vehicles/listViewPage")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsSales.inspections",
    path: `${APP_PREFIX_PATH}/inspections`,
    component: React.lazy(() => import("views/inspections/index.js")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsSales.expenseTypes",
    path: `${APP_PREFIX_PATH}/expense-types`,
    component: React.lazy(() => import("views/expenseTypes/index.js")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsSales.productList",
    path: `${APP_PREFIX_PATH}/vehicles/edit/:productId`,
    component: React.lazy(() => import("views/sales/ProductEdit")),
    authority: ["updateAssets"],
    meta: {
      header: "Edit Asset",
    },
  },
  {
    key: "appsSales.vehicleTypes",
    path: `${APP_PREFIX_PATH}/vehicleTypes/add`,
    component: React.lazy(() =>
      import("views/vehicleTypes/ProductEdit copy/index.js")
    ),
    authority: [ADMIN, USER],
    meta: {
      header: "Add Asset Type",
    },
  },
  {
    key: "appSales.permissions",
    path: `/permissions`,
    component: React.lazy(() => import("views/permissions/listViewPage.js")),
    authority: [],
    meta: {
      header: "Edit Permissions",
    },
  },
  {
    key: "appsSales.vehicleTypes",
    path: `${APP_PREFIX_PATH}/vehicleTypes/edit/:vehicleTypeId`,
    component: React.lazy(() =>
      import("views/vehicleTypes/ProductEdit copy/index.js")
    ),
    authority: [ADMIN, USER],
    meta: {
      header: "Edit Asset Type",
    },
  },
  {
    key: "appsSales.expenseTypeEdit",
    path: `${APP_PREFIX_PATH}/expenseTypes/edit/:expenseTypeId`,
    component: React.lazy(() =>
      import("views/expenseTypes/ProductEdit copy/index.js")
    ),
    authority: [ADMIN, USER],
    meta: {
      header: "Edit Expense Type",
    },
  },
  {
    key: "app.locations",
    path: `/app/locations/edit/:siteId`,
    component: React.lazy(() =>
      import("views/loactions/ProductEdit copy/index")
    ),
    authority: [ADMIN, USER],
    meta: {
      header: "Edit Location",
    },
  },
  {
    key: "system.sites",
    path: `/system/sites/edit/:siteId`,
    component: React.lazy(() => import("views/sites/ProductEdit copy/index")),
    authority: [ADMIN, USER],
    meta: {
      header: "Edit Site",
    },
  },
  {
    key: "appsSales.productNew",
    path: `${APP_PREFIX_PATH}/sales/product-new`,
    component: React.lazy(() => import("views/pages/Welcome")),
    authority: [ADMIN, USER],
    meta: {
      header: "Add New Asset",
    },
  },
  {
    key: "system.sites",
    path: `/system/sites/new-site`,
    component: React.lazy(() => import("views/sites/ProductEdit copy/index")),
    authority: [ADMIN, USER],
    meta: {
      header: "Add New Site",
    },
  },
  {
    key: "app.locations",
    path: `/app/locations/new-location`,
    component: React.lazy(() =>
      import("views/loactions/ProductEdit copy/index")
    ),
    authority: [ADMIN, USER],
    meta: {
      header: "Add New Location",
    },
  },
  {
    key: "system.sites",
    path: `system/sites`,
    component: React.lazy(() => import("views/sites/index")),
    authority: [ADMIN, USER],
  },
  {
    key: "app.locations",
    path: `app/locations`,
    component: React.lazy(() => import("views/loactions/index")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsSales.orderList",
    path: `${APP_PREFIX_PATH}/sales/order-list`,
    component: React.lazy(() => import("views/sales/OrderList")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsSales.assignments",
    path: `${APP_PREFIX_PATH}/assignments`,
    component: React.lazy(() => import("views/assignments/index")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsSales.reminders",
    path: `${APP_PREFIX_PATH}/reminders`,
    component: React.lazy(() => import("views/reminders/index")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsSales.orderDetails",
    path: `${APP_PREFIX_PATH}/sales/order-details/:orderId`,
    component: React.lazy(() => import("views/sales/OrderDetails")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsCrypto.dashboard",
    path: `${APP_PREFIX_PATH}/crypto/dashboard`,
    component: React.lazy(() => import("views/crypto/CryptoDashboard")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsCrypto.portfolio",
    path: `${APP_PREFIX_PATH}/crypto/portfolio`,
    component: React.lazy(() => import("views/crypto/Portfolio")),
    authority: [ADMIN, USER],
    meta: {
      header: "Portfolio",
    },
  },
  {
    key: "appsCrypto.market",
    path: `${APP_PREFIX_PATH}/crypto/market`,
    component: React.lazy(() => import("views/crypto/Market")),
    authority: [ADMIN, USER],
    meta: {
      header: "Market",
    },
  },
  {
    key: "appsCrypto.wallets",
    path: `${APP_PREFIX_PATH}/crypto/wallets`,
    component: React.lazy(() => import("views/crypto/Wallets")),
    authority: [ADMIN, USER],
    meta: {
      header: "Wallets",
    },
  },
  {
    key: "appsknowledgeBase.helpCenter",
    path: `${APP_PREFIX_PATH}/knowledge-base/help-center`,
    component: React.lazy(() => import("views/knowledge-base/HelpCenter")),
    authority: [ADMIN, USER],
    meta: {
      pageContainerType: "gutterless",
    },
  },
  {
    key: "appsknowledgeBase.article",
    path: `${APP_PREFIX_PATH}/knowledge-base/article`,
    component: React.lazy(() => import("views/knowledge-base/Article")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsknowledgeBase.manageArticles",
    path: `${APP_PREFIX_PATH}/knowledge-base/manage-articles`,
    component: React.lazy(() => import("views/knowledge-base/ManageArticles")),
    authority: [ADMIN, USER],
    meta: {
      header: "Manage Articles",
      extraHeader: React.lazy(() =>
        import("views/knowledge-base/ManageArticles/components/PanelHeader")
      ),
      headerContainer: true,
    },
  },
  {
    key: "appsknowledgeBase.editArticle",
    path: `${APP_PREFIX_PATH}/knowledge-base/edit-article`,
    component: React.lazy(() => import("views/knowledge-base/EditArticle")),
    authority: [ADMIN, USER],
  },
  {
    key: "system.preferences",
    path: `system/preferences/:tab`,
    component: React.lazy(() => import("views/account/Settings")),
    authority: ["system.preferences"],
    // meta: {
    //   header: "Preferences",
    //   headerContainer: true,
    // },
  },
  {
    key: "appsAccount.invoice",
    path: `${APP_PREFIX_PATH}/account/invoice/:id`,
    component: React.lazy(() => import("views/account/Invoice")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsAccount.activityLog",
    path: `/activity-logs`,
    component: React.lazy(() => import("views/account/ActivityLog")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsAccount.kycForm",
    path: `${APP_PREFIX_PATH}/account/kyc-form`,
    component: React.lazy(() => import("views/account/KycForm")),
    authority: [ADMIN, USER],
  },
];

export default appsRoute;
