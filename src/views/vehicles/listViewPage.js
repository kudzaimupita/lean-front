import React, { useMemo } from "react";
import reducer from "../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../TableView/Table";
import {
  deleteVehicle,
  deleteVehicles,
  getNewVehicles,
} from "../../services/vehicleService";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge } from "components/ui";
import TableTools from "../TableView/TableTools";
import ItemDeleteConfirmation from "../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import StatisticCard from "../TableView/Statistic";

import { Tabs, Button } from "components/ui";
import BreadCrumb from "./breadCrumb";
import { HiDownload, HiPlusCircle } from "react-icons/hi";
import { BiUserPlus } from "react-icons/bi";
import { FaFileUpload } from "react-icons/fa";

const statusColor = {
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
const { TabNav, TabList, TabContent } = Tabs;
const NameColumn = ({ row }) => {
  const { textTheme } = useThemeClass();
  const avatar = row?.imageCover ? (
    <Avatar
      size={20}
      src={`https://baboon-images.s3.amazonaws.com/${row?.imageCover}`}
    />
  ) : (
    <Avatar size={20} icon={<FiTruck />} />
  );

  return (
    <div className="flex items-center h-3">
      {avatar}
      <Link
        className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
        to={`/app/vehicles/view/${row?._id}`}
      >
        {row?.name}
      </Link>
    </div>
  );
};
const AssetsListView = () => {
  const { textTheme } = useThemeClass();

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        sortable: true,
        Cell: (props) => {
          const row = props.row?.original;
          return <NameColumn row={row} />;
        },
      },
      {
        Header: "Type",
        accessor: "vehicleType",
        sortable: true,
        Cell: (props) => {
          const row = props.row?.original;
          return <span className="capitalize">{row?.vehicleType?.name}</span>;
        },
      },
      {
        Header: "Location",
        accessor: "Location",
        sortable: true,
        Cell: (props) => {
          const row = props.row?.original;
          return <span className="capitalize">{row?.location}</span>;
        },
      },
      {
        Header: "Site",
        accessor: "addedBy",
        Cell: (props) => {
          const row = props.row?.original;
          return (
            <Link
              className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
              to={`/app/vehicles/view/${row?.addedBy?.name}`}
            >
              {row?.addedBy?.name}
            </Link>
          );
        },
      },
      {
        Header: "Assignee",
        accessor: "adfrdedBy",
        Cell: (props) => {
          const row = props.row?.original;
          return (
            <Link
              className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
              to={`/app/vehicles/view/${row?.addedBy?.name}`}
            >
              {row?.addedBy?.name}
            </Link>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        sortable: true,
        Cell: (props) => {
          const row = props.row.original;
          return (
            <span className="capitalize">{row?.createdAt?.slice(0, 16)}</span>
          );
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
              <Badge className={statusColor[status]?.dotClass} />
              <span
                className={`capitalize font-semibold ${statusColor[status]?.textClass}`}
              >
                {statusColor[status]?.label}
              </span>
            </div>
          );
        },
      },
      {
        Header: "Value",
        accessor: "currentMarketValue",
        sortable: true,
        Cell: (props) => {
          const row = props.row?.original;
          return (
            <span className="capitalize">
              {"R "}
              {row?.currentMarketValue}
            </span>
          );
        },
      },
      {
        Header: "",
        id: "actrion",
        accessor: (row) => row,
        Cell: (props) => (
          <div className="flex justify-end text-lg">
            {" "}
            <span
              className={`cursor-pointer pr-3 hover:${textTheme}`}
              // onClick={onEdit}
            >
              <FaFileUpload />
              {/* <FcUpload /> */}
            </span>
            <span
            // className={` pr-3 hover:${textTheme}`}
            // onClick={onEdit}
            >
              <BiUserPlus />
              {/* <FcUpload /> */}
            </span>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <>
        <StatisticCard />
        <AdaptableCard className="h-full" bodyClass="h-full">
          {/* <Tabs defaultValue="tab1">
            <TabList>
              <TabNav value="tab1" icon={<HiOutlineHome />}>
                Assets
              </TabNav>
              <TabNav value="tab2" icon={<HiOutlineUser />}>
                Parts
              </TabNav>
            </TabList> */}
          <div className="p-4">
            {/* <TabContent value="tab1"> */}
            <div className="lg:flex items-center justify-between mb-4">
              <BreadCrumb />
              {/* <h3 className="mb-4 lg:mb-0">Assets</h3> */}
              <TableTools
                addNewItemButton={
                  <>
                    <Link
                      className="block lg:inline-block md:mb-0 mb-4"
                      to="/app/sales/product-new"
                    >
                      <Button
                        block
                        variant="solid"
                        size="sm"
                        icon={<HiPlusCircle />}
                      >
                        Add Asset
                      </Button>
                    </Link>
                  </>
                }
                deleteMethod={deleteVehicles}
                dataMethod={getNewVehicles}
              />
            </div>
            <ProductTable
              editRoute={"/app/vehicles/edit"}
              showSelect={false}
              resource={"vehicles"}
              newColumns={columns}
              dataMethod={getNewVehicles}
              deleteMethod={deleteVehicle}
            />
            <ItemDeleteConfirmation
              deleteMethod={deleteVehicle}
              dataMethod={getNewVehicles}
            />
            {/* </TabContent> */}
            {/* <TabContent value="tab2"> */}

            {/* </TabContent> */}
          </div>
          {/* </Tabs>{" "} */}
        </AdaptableCard>
      </>
    </>
  );
};

export default AssetsListView;
