import React, { useMemo } from "react";
import reducer from "../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../TableView/Table";
import { Form, Formik } from "formik";
import { Input, FormItem } from "components/ui";
import { Field } from "formik";
import { getDataEntries } from "../../services/eventService";
import { StickyFooter, ConfirmDialog } from "components/shared";
import { useLocation, useNavigate } from "react-router-dom";
import { FormContainer, Button, hooks } from "components/ui";
import { storeEventDataEntry } from "../../services/eventService";
// import { Button } from "components/ui";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge } from "components/ui";
import TableTools from "../TableView/TableTools";
import ItemDeleteConfirmation from "../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import CustomerStatistic from "../TableView/Statistic";
import { HiDownload, HiPlusCircle } from "react-icons/hi";

import { Tabs } from "components/ui";
import { HiOutlineHome, HiOutlineUser, HiOutlinePhone } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

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
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  console.log(path);

  const dispatch = useDispatch();
  const collections = useSelector((state) => state.auth.company.collections);
  const currentCollection = collections.find(
    (collection) => collection.name === path
  );
  const newColumns = Object.keys(currentCollection.schema).map((item, i) => {
    return {
      Header: Object.keys(currentCollection.schema)[i],
      accessor: Object.keys(currentCollection.schema)[i],
      sortable: true,
      Cell: (props) => {
        const row = props.row.original;
        return (
          <span className="capitalize">
            {row[Object.keys(currentCollection.schema)[i]]}
          </span>
        );
      },
    };
  });

  console.log(currentCollection);
  const columns = useMemo(() => [...newColumns]);

  console.log(columns);
  return (
    <>
      <CustomerStatistic />
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
            {/* <BreadCrumb /> */}
            <h3 className="mb-4 lg:mb-0">{currentCollection.title}</h3>
            <TableTools
              addNewItemButton={
                <>
                  <Link
                    className="block lg:inline-block md:mb-0 mb-4"
                    to={`/app/add/${path}`}
                  >
                    <Button
                      block
                      variant="solid"
                      size="sm"
                      icon={<HiPlusCircle />}
                    >
                      Add New
                    </Button>
                  </Link>
                </>
              }
              // deleteMethod={deleteVehicles}
              // dataMethod={getNewVehicles}
            />
          </div>
          <ProductTable
            editRoute={`/app/add/${path}`}
            showSelect={false}
            resource={"vehicles"}
            filter={`collectionName=${path}`}
            newColumns={columns}
            dataMethod={getDataEntries}
            // deleteMethod={deleteVehicle}
          />
          {/* <ItemDeleteConfirmation
            deleteMethod={deleteVehicle}
            dataMethod={getNewVehicles}
          /> */}
          {/* </TabContent> */}
          {/* <TabContent value="tab2"> */}

          {/* </TabContent> */}
        </div>
        {/* </Tabs>{" "} */}
      </AdaptableCard>
    </>
  );
};

export default ProductList;
