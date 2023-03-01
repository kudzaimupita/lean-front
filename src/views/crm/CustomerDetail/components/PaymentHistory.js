import React from "react";
import { Table, Badge } from "components/ui";
import { useTable, useSortBy } from "react-table";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Tabs } from "components/ui";
import { HiOutlineHome, HiOutlineUser, HiOutlinePhone } from "react-icons/hi";
import { FcInspection, FcServices } from "react-icons/fc";
import { BiTrip } from "react-icons/bi";
import { AiOutlineRadiusSetting } from "react-icons/ai";
import IssuesTable from "./IssuesTable";
import Timeline from "./InspectionsTable";
import DocumentsTable from "./DocumentsTable";
import BOOT from "./SalesByCategories";
import Images from "../../../vehicles/EditAssetForm/ProductImages copy";
import Boot2 from "./SalesByCategories copy";
const { TabNav, TabList, TabContent } = Tabs;
const CustomerInfoField = ({ title, value }) => {
  return (
    <div>
      <span>{title}</span>
      <p className="text-gray-700 dark:text-gray-200 font-semibold">{value}</p>
    </div>
  );
};
const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const statusColor = {
  paid: "bg-emerald-500",
  pending: "bg-amber-400",
};

const columns = [
  {
    Header: "Reference",
    accessor: "id",
    Cell: (props) => {
      const row = props.row.original;
      return (
        <div>
          <span className="cursor-pointer">{row.id}</span>
        </div>
      );
    },
  },
  {
    Header: "Product",
    accessor: "item",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: (props) => {
      const row = props.row.original;
      return (
        <div className="flex items-center">
          <Badge className={statusColor[row.status]} />
          <span className="ml-2 rtl:mr-2 capitalize">{row.status}</span>
        </div>
      );
    },
  },
];

const PaymentHistory = ({ vehicle }) => {
  const data = useSelector(
    (state) => state.crmCustomerDetails.data.paymentHistoryData
  );
  console.log(vehicle);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div className="">
      <Tabs defaultValue="tab1">
        <TabList>
          <TabNav value="tab1" icon={<HiOutlineHome />}>
            Overview
          </TabNav>
          <TabNav value="tab6" icon={<HiOutlinePhone />}>
            Parts
          </TabNav>
          <TabNav value="tab2" icon={<AiOutlineRadiusSetting />}>
            Issues
          </TabNav>
          <TabNav value="tab3" icon={<FcServices />}>
            Service Logs
          </TabNav>
          <TabNav value="tab4" icon={<FcInspection />}>
            Inspections
          </TabNav>
          <TabNav value="tab5" icon={<BiTrip />}>
            Assignments
          </TabNav>
          <TabNav value="tab6" icon={<BiTrip />}>
            Costs
          </TabNav>
        </TabList>
        <div className="p-4">
          <TabContent value="tab1">
            <div className="grid grid-cols-1 lg:grid-cols-4 ">
              <div className="lg:col-span-2">
                {" "}
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 gap-y-2 gap-x-4">
                  {/* <div>
                    <span>Description</span>
                    <p className="text-gray-700 dark:text-gray-200 font-semibold">
                      {" "}
                      {ReactHtmlParser(vehicle?.description || "")}
                    </p>
                  </div> */}
                  <BOOT /> <Boot2 />
                  {/* <BOOT /> */}
                  {/* {vehicle?.fields.length > 0 &&
                    vehicle?.fields.map((field) => {
                      return (
                        <CustomerInfoField
                          title={field?.customField?.name || "field"}
                          value={field?.value}
                        />
                      );
                    })} */}
                </div>
              </div>
              <div className="lg:col-span-2">
                {vehicle?.images && <Images values={vehicle} />}
                {/* <BOOT /> */}
              </div>
            </div>
            <DocumentsTable />
          </TabContent>
          <TabContent value="tab2">
            <IssuesTable />
          </TabContent>
          <TabContent value="tab3">
            <Timeline />
          </TabContent>
          <TabContent value="tab4">
            <Timeline />
          </TabContent>
          <TabContent value="tab6">
            <DocumentsTable />
          </TabContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PaymentHistory;
