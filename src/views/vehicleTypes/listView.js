import React, { useMemo } from "react";
import reducer from "../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "./Table";
import {
  deleteVehicleType,
  deleteVehicleTypes,
  getNewVehicleTypes,
} from "../../services/vehicleTypeService";

import {
  deleteVehicleTypeCategories,
  deleteVehicleTypeCategory,
  getNewVehicleTypeCategories,
} from "../../services/vehicleTypeCategoryService";
import { Button } from "components/ui";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge } from "components/ui";
import ProductTableTools from "../TableView/TableTools";
import ItemDeleteConfirmation from "../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import CustomerStatistic from "../TableView/Statistic";
import { HiDownload, HiPlusCircle } from "react-icons/hi";

import { Tabs } from "components/ui";
import { HiOutlineHome, HiOutlineUser, HiOutlinePhone } from "react-icons/hi";

const { TabNav, TabList, TabContent } = Tabs;

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
      size={20}
      src={`https://baboon-images.s3.amazonaws.com/${row.imageCover}`}
    />
  ) : (
    <Avatar size={20} icon={<FiTruck />} />
  );

  return (
    <div className="flex items-center h-3">
      {avatar}
      <div
        className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
        // to={`/app/vehicleTypes/edit/${row._id}`}
      >
        {row.name}
      </div>
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
      Header: "Fields",
      accessor: "fields",
      // sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row?.fields?.length}</span>;
      },
    },

    {
      Header: "Assets",
      accessor: "Assets",
      // sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return <span className="capitalize">{row?.assets?.length}</span>;
      },
    },
  ]);

  console.log();
  return (
    <>
      <CustomerStatistic />
      <AdaptableCard className="h-full" bodyClass="h-full">
        <Tabs defaultValue="tab1">
          <TabList>
            <TabNav value="tab1" icon={<HiOutlineHome />}>
              Asset Types
            </TabNav>
            <TabNav value="tab2" icon={<HiOutlineUser />}>
              Custom Field Categories
            </TabNav>
            <TabNav value="tab3" icon={<HiOutlineUser />}>
              Expense Types
            </TabNav>
            <TabNav value="tab4" icon={<HiOutlineUser />}>
              Checklists
            </TabNav>
            <TabNav value="tab5" icon={<HiOutlineUser />}>
              Departments
            </TabNav>
            <TabNav value="tab6" icon={<HiOutlineUser />}>
              Sites
            </TabNav>
            <TabNav value="tab6" icon={<HiOutlineUser />}>
              Fluid UI
            </TabNav>
          </TabList>
          <div className="p-4">
            <TabContent value="tab1">
              <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Asset Types</h3>

                <ProductTableTools
                  addNewItemButton={
                    <>
                      {" "}
                      <Link
                        className="block lg:inline-block md:mb-0 mb-4"
                        to="/app/vehicleTypes/add"
                      >
                        <Button
                          block
                          variant="solid"
                          size="sm"
                          icon={<HiPlusCircle />}
                        >
                          Add Asset Type
                        </Button>
                      </Link>
                    </>
                  }
                  deleteMethod={deleteVehicleTypes}
                  dataMethod={getNewVehicleTypes}
                />
              </div>
              <ProductTable
                showSelect={false}
                newColumns={columns}
                dataMethod={getNewVehicleTypes}
                deleteMethod={deleteVehicleType}
              />
              <ItemDeleteConfirmation
                deleteMethod={deleteVehicleType}
                dataMethod={getNewVehicleTypes}
              />
            </TabContent>
            <TabContent value="tab2">
              <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Asset Type Categories</h3>

                <ProductTableTools
                  addNewItemButton={
                    <>
                      {" "}
                      <Link
                        className="block lg:inline-block md:mb-0 mb-4"
                        to="/app/vehicleTypes/add"
                      >
                        <Button
                          block
                          variant="solid"
                          size="sm"
                          icon={<HiPlusCircle />}
                        >
                          Add Category
                        </Button>
                      </Link>
                    </>
                  }
                  deleteMethod={deleteVehicleTypes}
                  dataMethod={getNewVehicleTypes}
                />
              </div>
              <ProductTable
                showSelect={false}
                newColumns={columns}
                dataMethod={getNewVehicleTypeCategories}
                deleteMethod={deleteVehicleTypeCategory}
              />
              <ItemDeleteConfirmation
                deleteMethod={deleteVehicleType}
                dataMethod={getNewVehicleTypes}
              />
            </TabContent>
          </div>
        </Tabs>{" "}
      </AdaptableCard>
    </>
  );
};

export default ProductList;
