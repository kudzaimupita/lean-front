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

const ProductList = ({ onDialogClose, assetTypeId }) => {
  console.log(onDialogClose);
  const { textTheme } = useThemeClass();
  const columns = useMemo(() => [
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
        return <span className="capitalize">{row?.category?.name}</span>;
      },
    },
    {
      Header: "",
      accessor: "transm",

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
      <ProductTable
        editRoute
        filter={`vehicleType=${assetTypeId}`}
        showSelect={false}
        newColumns={columns}
        dataMethod={getNewCustomFieldss}
        deleteMethod={deleteCustomFields}
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
