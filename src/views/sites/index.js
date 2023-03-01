import React, { useMemo } from "react";
import reducer from "../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../TableView/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSites,
  deleteSite,
  getNewSites,
} from "../../services/siteService";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge } from "components/ui";
import ProductTableTools from "../TableView/TableTools";
import ItemDeleteConfirmation from "../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import CustomerStatistic from "../TableView/Statistic";
import { Tabs, Button } from "components/ui";
import BreadCrumb from "../vehicles/breadCrumb";
import { HiDownload, HiPlusCircle } from "react-icons/hi";
injectReducer("dataList", reducer);

const ProductColumn = ({ row }) => {
  const { textTheme } = useThemeClass();

  const avatar = true ? (
    <Avatar
      size="10"
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
      <span className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}>
        {row.name}
      </span>
      {/* <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span> */}
    </div>
  );
};
const ProductList = () => {
  const companyId = useSelector((state) => state.auth.company._id);
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
      Header: "Address",
      accessor: "address",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.address}</span>;
      },
    },
    {
      Header: "Site Manager",
      accessor: "siteManagerName",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.siteManagerName}</span>;
      },
    },
    {
      Header: "Site Manager Email",
      accessor: "siteManagerEmail",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.siteManagerEmail}</span>;
      },
    },
    // {
    //   Header: "Checklist",
    //   accessor: "checklist",
    //   sortable: true,
    //   Cell: (props) => {
    //     const row = props.row.original;
    //     return <span className="capitalize">{row.checklist}</span>;
    //   },
    // },
    {
      Header: "Status",
      accessor: "status",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.status}</span>;
      },
    },

    {
      Header: "Created At",
      accessor: "reviewer",
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row.createdAt.slice(0, 19)}</span>;
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
  ]);

  console.log();
  return (
    <>
      {" "}
      <CustomerStatistic />
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="lg:flex items-center justify-between mb-4">
          <h3 className="mb-4 lg:mb-0">Sites</h3>

          <ProductTableTools
            addNewItemButton={
              <>
                <Link
                  className="block lg:inline-block md:mb-0 mb-4"
                  to="/system/sites/new-site"
                >
                  <Button
                    block
                    variant="solid"
                    size="sm"
                    icon={<HiPlusCircle />}
                  >
                    Add Site
                  </Button>
                </Link>
              </>
            }
            search
            deleteMethod={deleteSites}
            dataMethod={getNewSites}
          />
        </div>
        <ProductTable
          filter={`company=${companyId}`}
          editRoute={"/system/sites/edit"}
          showSelect={false}
          newColumns={columns}
          dataMethod={getNewSites}
          deleteMethod={deleteSite}
        />
        <ItemDeleteConfirmation
          filter={`company=${companyId}`}
          deleteMethod={deleteSite}
          dataMethod={getNewSites}
        />
      </AdaptableCard>
    </>
  );
};

export default ProductList;
