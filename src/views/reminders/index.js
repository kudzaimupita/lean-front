import React, { useMemo } from "react";
import reducer from "../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../TableView/Table";
import {
  deleteReminders,
  deleteReminder,
  getNewReminders,
} from "../../services/reminderService";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge } from "components/ui";
import ProductTableTools from "../TableView/TableTools";
import ItemDeleteConfirmation from "../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import CustomerStatistic from "../TableView/Statistic";

injectReducer("dataList", reducer);
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
      Header: "ID",
      accessor: "vehicle",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row?.name}</span>;
      },
    },

    {
      Header: "Authorized By",
      accessor: "authorizedBy.name",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row?.authorizedBy?.name}</span>;
      },
    },
    {
      Header: "Recipient",
      accessor: "recipient.name",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row?.recipient?.name}</span>;
      },
    },
    {
      Header: "Status",
      accessor: "status",
      sortable: true,
      Cell: (props) => {
        const status = props.row?.original.status;
        return (
          <div className="flex items-center gap-2">
            <Badge className={inventoryStatusColor[status]?.dotClass} />
            <span
              className={`capitalize font-semibold ${inventoryStatusColor[status]?.textClass}`}
            >
              {inventoryStatusColor[status]?.label}
            </span>
          </div>
        );
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
        return (
          <Avatar.Group
            chained
            maxCount={4}
            omittedAvatarProps={{ shape: "circle", size: 20 }}
            omittedAvatarTooltip
            onOmittedAvatarClick={() => console.log("Omitted Avatar Clicked")}
          >
            <Avatar size={20} shape="circle" src="/img/avatars/thumb-1.jpg" />
            <Avatar size={20} shape="circle" src="/img/avatars/thumb-2.jpg" />
            <Avatar size={20} shape="circle" src="/img/avatars/thumb-3.jpg" />
            <Avatar size={20} shape="circle" src="/img/avatars/thumb-4.jpg" />
            <Avatar size={25} shape="circle" src="/img/avatars/thumb-5.jpg" />
            <Avatar size={25} shape="circle" src="/img/avatars/thumb-6.jpg" />
          </Avatar.Group>
        );
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
      Header: "Due Date",
      accessor: "dueBy",
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
          <h3 className="mb-4 lg:mb-0">Assignments</h3>

          <ProductTableTools
            search
            deleteMethod={deleteReminders}
            dataMethod={getNewReminders}
          />
        </div>
        <ProductTable
          editRoute
          showSelect={false}
          newColumns={columns}
          dataMethod={getNewReminders}
          deleteMethod={deleteReminder}
        />
        <ItemDeleteConfirmation
          deleteMethod={deleteReminder}
          dataMethod={getNewReminders}
        />
      </AdaptableCard>
    </>
  );
};

export default ProductList;
