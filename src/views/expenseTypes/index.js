import React, { useMemo } from "react";
import reducer from "../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../TableView/Table";
import {
  deleteExpenseType,
  deleteExpenseTypes,
  getNewExpenseTypes,
} from "../../services/expenseTypeService";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge } from "components/ui";
import ProductTableTools from "../TableView/TableTools";
import ItemDeleteConfirmation from "../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import CustomerStatistic from "../TableView/Statistic";

const inventoryStatusColor = {
  active: {
    label: "Active",
    dotClass: "bg-emerald-600",
    textClass: "text-emerald-600",
  },
  inActive: {
    label: "Inactive",
    dotClass: "bg-amber-600",
    textClass: "text-amber-600",
  },
  service: {
    label: "Service",
    dotClass: "bg-red-600",
    textClass: "text-red-600",
  },
};

injectReducer("dataList", reducer);

const ProductColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const avatar = row.imageCover ? (
    <Avatar
      size="sm"
      src={`https://baboon-images.s3.amazonaws.com/${row.imageCover}`}
    />
  ) : (
    <Avatar size="sm" icon={<FiTruck />} />
  );

  return (
    <div className="flex items-center h-3">
      {avatar}
      <Link
        className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
        to={`/app/expenseTypes/edit/${row._id}`}
      >
        {row.name}
      </Link>
      {/* <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span> */}
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
        const row = props.row.original;
        return <ProductColumn row={row} />;
      },
    },
    {
      Header: "Type",
      accessor: "type",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">Default</span>;
      },
    },
    {
      Header: "Labels",
      accessor: "label",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.transmission}</span>;
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
      Header: "vehicles",
      accessor: "transmission",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.transmission}</span>;
      },
    },
  ]);

  console.log();
  return (
    <>
      {" "}
      <CustomerStatistic />
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="lg:flex items-center justify-between mb-4">
          <h3 className="mb-4 lg:mb-0">Expense Types</h3>

          <ProductTableTools
            deleteMethod={deleteExpenseTypes}
            dataMethod={getNewExpenseTypes}
          />
        </div>
        <ProductTable
          showSelect={false}
          newColumns={columns}
          dataMethod={getNewExpenseTypes}
          deleteMethod={deleteExpenseType}
        />
        <ItemDeleteConfirmation
          deleteMethod={deleteExpenseType}
          dataMethod={getNewExpenseTypes}
        />
      </AdaptableCard>
    </>
  );
};

export default ProductList;
