import React, { useMemo } from "react";
import reducer from "../../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../../TableView/Table";
import { useDispatch, useSelector } from "react-redux";
import { getData, setTableData } from "../../TableView/store/dataSlice";
import {
  // deleteIssues,
  // deleteIssue,
  deleteCustomFields,
  getNewCustomFieldss,
} from "../../../services/customFieldService";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge } from "components/ui";
import ProductTableTools from "../../TableView/TableTools";
import ItemDeleteConfirmation from "../../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
// import CustomerStatistic from "./Statistic";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
// import useThemeClass from "utils/hooks/useThemeClass";
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
        to={`/app/vehicles/view/${row.id}`}
      >
        {row.name}
      </Link>
      {/* <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span> */}
    </div>
  );
};
const ProductList = ({ onDialogClose, assetTypeId }) => {
  console.log(onDialogClose);
  const { textTheme } = useThemeClass();
  const columns = useMemo(() => [
    // {
    //   Header: "Vehicle",
    //   accessor: "vehiclse",
    //   sortable: true,
    //   Cell: (props) => {
    //     const row = props.row.original;
    //     return <ProductColumn row={row} />;
    //   },
    // },

    {
      Header: "Name",
      accessor: "name",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.name}</span>;
      },
    },
    {
      Header: "Category",
      accessor: "category",
      // sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.fuelType}</span>;
      },
    },
    {
      Header: "isRequired",
      accessor: "isRequired",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.isRequired}</span>;
      },
    },

    {
      Header: "fieldType",
      accessor: "fieldType",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.fieldType}</span>;
      },
    },
    {
      Header: "Category",
      accessor: "category",
      // sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.fieldType}</span>;
      },
    },
    // {
    //   Header: "Status",
    //   accessor: "status",
    //   sortable: true,
    //   Cell: (props) => {
    //     const status = props.row.original.status;
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

    {
      Header: "Edit",
      accessor: "transm",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return (
          <span
            className={`cursor-pointer text-sm hover:${textTheme}`}
            onClick={() => onDialogClose(props.row.original)}
          >
            <HiOutlinePencil />
          </span>
        );
      },
    },
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
      showDate={false}
        // editRoute
        filter={`vehicleType=${assetTypeId}`}
        showSelect={false}
        newColumns={columns}
        dataMethod={getNewCustomFieldss}
        deleteMethod={deleteCustomFields}
        showEdit={false}
      />
      <ItemDeleteConfirmation
    
        filter={`vehicleType=${assetTypeId}`}
        deleteMethod={deleteCustomFields}
        dataMethod={getNewCustomFieldss}
      />
    </>
  );
};

export default ProductList;
