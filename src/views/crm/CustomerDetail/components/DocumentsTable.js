import React, { useMemo } from "react";
import reducer from "../../../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../../../TableView/Table";
import {
  //   deleteIssues,
  //   deleteIssue,
  deleteDocument,
  getNewDocuments,
} from "../../../../services/DocumentService";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge } from "components/ui";
import ProductTableTools from "../../../TableView/TableTools";
import ItemDeleteConfirmation from "../../../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
// import CustomerStatistic from "./Statistic";
// import useThemeClass from "utils/hooks/useThemeClass";
import { HiVideoCamera, HiDocumentText, HiChatAlt2 } from "react-icons/hi";
import { AiFillFileExcel, AiFillFilePdf, AiFillFileWord } from "react-icons/ai";
import classNames from "classnames";

injectReducer("dataList", reducer);

const EventIcon = (type) => {
  console.log(type);
  const baseClass =
    "rounded-lg h-5 w-5 text-lg flex items-center justify-center";

  switch (type) {
    case "csv":
      return (
        <div
          className={classNames(
            baseClass,
            "text-emerald-600 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-500/20"
          )}
        >
          <AiFillFileExcel />
        </div>
      );
    case "docx":
      return (
        <div
          className={classNames(
            baseClass,
            "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
          )}
        >
          <AiFillFileWord />
        </div>
      );
    case "pdf":
      return (
        <div
          className={classNames(
            baseClass,
            "text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20"
          )}
        >
          <AiFillFilePdf />
        </div>
      );
    default:
      return null;
  }
};

const ProductColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  console.log(row);
  const path = row?.imageCover?.substring(
    row?.imageCover?.lastIndexOf(".") + 1
  );
  console.log(path);
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
      {EventIcon(path)}
      <a
        className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
        href={`https://baboon-images.s3.amazonaws.com/${row?.imageCover}`}
      >
        {row?.name}
      </a>
      {/* <span className={`ml-2 rtl:mr-2 font-semibold`}>{row?.name}</span> */}
    </div>
  );
};
const ProductList = () => {
  const columns = useMemo(() => [
    {
      Header: "Name",
      accessor: "name",
      sortable: true,
      Cell: (props) => {
        const row = props.row?.original;
        return <ProductColumn row={row} />;
      },
    },

    {
      Header: "Description",
      accessor: "description",
      sortable: true,
      Cell: (props) => {
        const row = props.row?.original;
        return <span className="capitalize">{row?.description}</span>;
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
    // {
    //   Header: "assignedTo",
    //   accessor: "assignedTo",
    //   sortable: true,
    //   Cell: (props) => {
    //     const row = props.row?.original;
    //     return <span className="capitalize">{row?.assignedTo}</span>;
    //   },
    // },

    {
      Header: "Type",
      accessor: "type",
      sortable: true,
      Cell: (props) => {
        const row = props.row?.original;
        return <span className="capitalize">{row?.type}</span>;
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
        dataMethod={getNewDocuments}
      /> */}
      <ProductTable
        editRoute
        // filter={`vehicle=${props.vehicleId}`}
        showSelect={false}
        newColumns={columns}
        dataMethod={getNewDocuments}
        deleteMethod={deleteDocument}
      />
      <ItemDeleteConfirmation
        deleteMethod={deleteDocument}
        dataMethod={getNewDocuments}
      />
    </>
  );
};

export default ProductList;
