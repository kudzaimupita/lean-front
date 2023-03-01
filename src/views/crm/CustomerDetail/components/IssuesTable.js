import React, { useMemo } from "react";
import reducer from "../../../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../../../TableView/Table";
import {
  deleteIssues,
  deleteIssue,
  getNewIssues,
} from "../../../../services/issueService";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge } from "components/ui";
import ProductTableTools from "../../../TableView/TableTools";
import ItemDeleteConfirmation from "../../../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
// import CustomerStatistic from "./Statistic";

injectReducer("dataList", reducer);

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

    // {
    //   Header: "User",
    //   accessor: "transmission",
    //   sortable: true,
    //   Cell: (props) => {
    //     const row = props.row?.original;
    //     return <span className="capitalize">{row?.transmission}</span>;
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
        dataMethod={getNewIssues}
        deleteMethod={deleteIssue}
      />
    </>
  );
};

export default ProductList;
