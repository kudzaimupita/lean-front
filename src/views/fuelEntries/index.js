import React, { useMemo } from "react";
import reducer from "../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../TableView/Table";
import {
  deleteFuelEntries,
  deleteFuelEntry,
  getNewFuelEntries,
} from "../../services/fuelEntryService";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge } from "components/ui";
import ProductTableTools from "../TableView/TableTools";
import ItemDeleteConfirmation from "../TableView/DeleteConfirmation";
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
        to={`/app/vehicles/view/${row.id}`}
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
      Header: "Vehicle",
      accessor: "vehicle",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <ProductColumn row={row} />;
      },
    },
    {
      Header: "Garage",
      accessor: "garage",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.garage}</span>;
      },
    },
    {
      Header: "Location",
      accessor: "location",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.location}</span>;
      },
    },
    {
      Header: "Fuel",
      accessor: "fuelType",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.fuelType}</span>;
      },
    },
    {
      Header: "Location",
      accessor: "typeOfFillUp",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.typeOfFillUp}</span>;
      },
    },
    {
      Header: "Location",
      accessor: "amount",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.amount}</span>;
      },
    },
    {
      Header: "Labels",
      accessor: "labels",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <ProductColumn row={row} />;
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
      Header: "User",
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
      {/* <CustomerStatistic /> */}
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="lg:flex items-center justify-between mb-4">
          <h3 className="mb-4 lg:mb-0">Fuel Entry</h3>

          <ProductTableTools
            search
            deleteMethod={deleteFuelEntries}
            dataMethod={getNewFuelEntries}
          />
        </div>
        <ProductTable
          editRoute
          showSelect={false}
          newColumns={columns}
          dataMethod={getNewFuelEntries}
          deleteMethod={deleteFuelEntry}
        />
        <ItemDeleteConfirmation
          deleteMethod={deleteFuelEntry}
          dataMethod={getNewFuelEntries}
        />
      </AdaptableCard>
    </>
  );
};

export default ProductList;
