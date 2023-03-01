import React, { useMemo } from "react";
import reducer from "../../../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../../../TableView/Table";
import {
  // deleteIssues,
  // deleteIssue,
  getNewInspections,
} from "../../../../services/inspectionService";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge } from "components/ui";
import ProductTableTools from "../../../TableView/TableTools";
import ItemDeleteConfirmation from "../../../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
// import CustomerStatistic from "./Statistic";
import Activities from "./Activities";
import SalesReport from "../../../sales/SalesDashboard/components/SalesReport";
injectReducer("dataList", reducer);

const salesReportData = {
  series: [
    {
      name: "Online Sales",
      data: [24, 33, 29, 36, 34, 43, 40, 47, 45, 48, 46, 55],
    },
    {
      name: "Marketing Sales",
      data: [20, 26, 23, 24, 22, 29, 27, 36, 32, 35, 32, 38],
    },
  ],
  categories: [
    "01 Jan",
    "02 Jan",
    "03 Jan",
    "04 Jan",
    "05 Jan",
    "06 Jan",
    "07 Jan",
    "08 Jan",
    "09 Jan",
    "10 Jan",
    "11 Jan",
    "12 Jan",
  ],
};
const activitiesData = [
  {
    type: "UPDATE-TICKET",
    dateTime: 1646580000,
    ticket: "PD-979",
    status: 0,
    userName: "Carolyn Perkins",
    userImg: "",
  },
  {
    type: "COMMENT",
    dateTime: 1646578417,
    userName: "Ron Vargas",
    userImg: "/img/avatars/thumb-3.jpg",
    comment: `Fine, Java MIGHT be a good example of what a programming language should be like. But Java applications are good examples of what applications SHOULDN'T be like.`,
  },
  {
    type: "ADD-TAGS-TO-TICKET",
    dateTime: 1646574027,
    userName: "Joyce Freeman",
    tags: ["Live Issue", "Backend"],
  },
  {
    type: "ADD-FILES-TO-TICKET",
    dateTime: 1646569123,
    userName: "Luke Cook",
    files: ["document.csv"],
    ticket: "PD-1092",
  },
];
const ProductColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const avatar = true ? (
    <Avatar
      size="sm"
      icon={<FiTruck />}
      //   src={
      //     "https://images.unsplash.com/photo-1631744591853-998c4308bbb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
      //   }
    />
  ) : (
    <Avatar icon={<FiTruck />} />
  );

  return (
    <div className="flex items-center h-3">
      {avatar}
      <Link
        className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
        to={`/app/vehicles/view/${row?.id}`}
      >
        {row?.name}
      </Link>
      {/* <span className={`ml-2 rtl:mr-2 font-semibold`}>{row?.name}</span> */}
    </div>
  );
};
const ProductList = () => {
  const columns = useMemo(() => [
    // {
    //   Header: "Vehicle",
    //   accessor: "vehiclse",
    //   sortable: true,
    //   Cell: (props) => {
    //     const row = props.row?.original;
    //     return <ProductColumn row={row} />;
    //   },
    // },

    {
      Header: "Location",
      accessor: "location",
      sortable: true,
      Cell: (props) => {
        const row = props.row?.original;
        return <span className="capitalize">{row?.location}</span>;
      },
    },
    // {
    //   Header: "Fuel",
    //   accessor: "fuelType",
    //   sortable: true,
    //   Cell: (props) => {
    //     const row = props.row?.original;
    //     return <span className="capitalize">{row?.fuelType}</span>;
    //   },
    // },
    {
      Header: "assignedTo",
      accessor: "assignedTo",
      sortable: true,
      Cell: (props) => {
        const row = props.row?.original;
        return <span className="capitalize">{row?.assignedTo}</span>;
      },
    },
    {
      Header: "Status",
      accessor: "status",
      sortable: true,
      Cell: (props) => {
        const row = props.row?.original;
        return <span className="capitalize">{row?.status}</span>;
      },
    },
    {
      Header: "Signed Off",
      accessor: "signedOff",
      sortable: true,
      Cell: (props) => {
        const row = props.row?.original;
        return <span className="capitalize">{row?.signedOff}</span>;
      },
    },
    {
      Header: "Reviewer",
      accessor: "reviewer",
      sortable: true,
      Cell: (props) => {
        const row = props.row?.original;
        return <span className="capitalize">{row?.reviewer}</span>;
      },
    },
    // {
    //   Header: "Status",
    //   accessor: "status",
    //   sortable: true,
    //   Cell: (props) => {
    //     const status = props.row?.original.status;
    //     return (
    //       <div className="flex items-center gap-2">
    //         <Badge className={inventoryStatusColor[status]?.dotClass} />
    //         <span
    //           className={`capitalize font-semibold ${inventoryStatusColor[status]?.textClass}`}
    //         >
    //           {inventoryStatusColor[status]?.label}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
  ]);

  console.log();
  return (
    <>
      {" "}
      {/* <CustomerStatistic /> */}
      {/* <ProductTableTools
        search
        deleteMethod={deleteIssues}
        dataMethod={getNewIssues}
      /> */}
      <ProductTable
        editRoute
        // filter={`vehicle=${props.vehicleId}`}
        showSelect={false}
        newColumns={columns}
        dataMethod={getNewInspections}
        // deleteMethod={deleteIssue}
      />
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SalesReport data={salesReportData} className="col-span-" />
        <Activities data={activitiesData} />

      </div> */}
    </>
  );
};

export default ProductList;
