import React, { useMemo, useState } from "react";
import reducer from "../TableView/store";
import { injectReducer } from "store/index";
import { AdaptableCard } from "components/shared";
import ProductTable from "../TableView/Table";
import { Form, Formik } from "formik";
import { Input, FormItem } from "components/ui";
import { Field } from "formik";
import { DatePicker, Radio } from "components/ui";
import { Drawer } from "components/ui";
import { getDataEntries } from "../../services/eventService";
import {
  deleteVehicleType,
  deleteVehicleTypes,
  getNewVehicleTypes,
} from "../../services/vehicleTypeService";
import PaginatedSelectTable from "../../views/PaginatedSelectTable/Table";
import { StickyFooter, ConfirmDialog } from "components/shared";
import { useLocation, useNavigate } from "react-router-dom";
import { FormContainer, Button, hooks, Select } from "components/ui";
import { storeEventDataEntry } from "../../services/eventService";
// import { Button } from "components/ui";
import useThemeClass from "utils/hooks/useThemeClass";
import { Avatar, Badge, InputGroup } from "components/ui";
import ProductTableTools from "../TableView/TableTools";
import ItemDeleteConfirmation from "../TableView/DeleteConfirmation";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import CustomerStatistic from "../TableView/Statistic";
import { HiDownload, HiPlusCircle } from "react-icons/hi";
import selectReducer from "../PaginatedSelectTable/store/index";
// import { injectReducer } from "store/index";
import { Tabs } from "components/ui";
import { HiOutlineHome, HiOutlineUser, HiOutlinePhone } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
injectReducer("paginatedSelect", selectReducer);
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
  const path = location.pathname.split("/")[3];
  console.log(path);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({});
  const [currentItem, setCurrentItem] = useState("");
  const openDrawer = () => {
    setIsOpen(true);
  };
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.auth.company.collections);
  const currentCollection = collections.find(
    (collection) => collection.name === path
  );
  const onDrawerClose = (e) => {
    console.log("onDrawerClose", e);
    setIsOpen(false);
  };
  console.log(currentCollection);
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

  const [currentRef, setCurrentRef] = useState("");
  const handleSelect = (id) => {
    form.setFieldValue(currentRef, id);
    // setSelectedItem(id);

    console.log(currentRef, id);
  };
  const selectColumns = useMemo(() => [
    {
      Header: "Name",
      id: "action",
      accessor: (row) => row,
      Cell: (props) => {
        const row = props.row.original;
        return (
          <a href="#" onClick={() => handleSelect(row._id)}>
            {" "}
            <span className="capitalize">{row.name || row._id}</span>
          </a>
        );
      },
    },
    {
      Header: "EMail",
      id: "email",
      accessor: (row) => row,
      Cell: (props) => {
        const row = props.row.original;
        return (
          <a href="#" onClick={() => console.log(row._id)}>
            {" "}
            <span className="capitalize">{row.email || row._id}</span>
          </a>
        );
      },
    },
  ]);

  const { DateTimepicker } = DatePicker;
  console.log();
  return (
    <>
      <CustomerStatistic />
      <AdaptableCard className="h-full" bodyClass="h-full">
        {/* {JSON.stringify(currentCollection)} */}
        <Drawer
          title=" Select Category"
          isOpen={isOpen}
          onClose={onDrawerClose}
          onRequestClose={onDrawerClose}
        >
          dvcdfv
          <PaginatedSelectTable
            filter={`collectionName=${currentItem}`}
            // showSelect={false}
            newColumns={selectColumns}
            dataMethod={getDataEntries}
            // deleteMethod={}
          />
        </Drawer>
        ;
        <Formik
          // innerRef={ref}
          initialValues={{}}
          onSubmit={(values, {}) => {
            // setSubmitting(false);
            storeEventDataEntry(values, path).then(() => {});
            // window.location.alert("yey");
          }}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <Form>
              <FormContainer>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.keys(currentCollection.schema).map((item, i) => {
                    console.log(currentCollection.schema[item]);
                    return (
                      <div className="col-span-1">
                        <FormItem
                          asterisk={currentCollection.schema[item]?.required}
                          label={Object.keys(currentCollection.schema)[i]}
                          // invalid={errors.name && touched.name}
                          // errorMessage={errors.name}
                        >
                          <Field
                            name={Object.keys(currentCollection.schema)[i]}
                          >
                            {({ field, form }) => {
                              // console.log(typeof field.value);
                              if (
                                currentCollection.schema[item].type === "date"
                              ) {
                                return (
                                  <DateTimepicker
                                    placeholder="Pick date & time"
                                    onChange={(e) => {
                                      form.setFieldValue(field.name, e);
                                    }}
                                    // placeholder="Pick a date"
                                  />
                                );
                              } else if (
                                currentCollection.schema[item].type === "select"
                              ) {
                                return (
                                  <Select
                                    field={field}
                                    form={form}
                                    options={currentCollection.schema[
                                      item
                                    ]?.options.map((item) => ({
                                      label: item,
                                      value: item,
                                    }))}
                                    value={currentCollection.schema[
                                      item
                                    ]?.options.find(
                                      (item) =>
                                        item ===
                                        values[
                                          Object.keys(currentCollection.schema)[
                                            i
                                          ]
                                        ]
                                    )}
                                    onChange={(option) => {
                                      console.log(values);
                                      form.setFieldValue(
                                        field.name,
                                        option.value
                                      );
                                    }}
                                  />
                                );
                              } else if (
                                currentCollection.schema[item].type === "radio"
                              ) {
                                return (
                                  <>
                                    {" "}
                                    {currentCollection?.schema[
                                      item
                                    ]?.options.map((item) => {
                                      return (
                                        <Radio
                                          value={item}
                                          className="mr-4"
                                          onChange={(option) => {
                                            console.log(option);
                                            form.setFieldValue(
                                              field.name,
                                              option
                                            );
                                          }}
                                        >
                                          {item}
                                        </Radio>
                                      );
                                    })}
                                  </>
                                );
                              } else if (
                                currentCollection.schema[item].type ===
                                "objectId"
                              ) {
                                return (
                                  <>
                                    <Button
                                      onClick={(e) => {
                                        setCurrentRef(
                                          Object.keys(currentCollection.schema)[
                                            i
                                          ]
                                        );
                                        console.log("df");
                                        setCurrentItem(
                                          currentCollection.schema[item].ref
                                        );

                                        setForm(form);
                                        openDrawer();
                                      }}
                                    >
                                      {values?.category?.name || "Select Item"}
                                    </Button>
                                  </>
                                );
                              } else {
                                return (
                                  <>
                                    {" "}
                                    <Field
                                      type="text"
                                      autoComplete="off"
                                      name={
                                        Object.keys(currentCollection.schema)[i]
                                      }
                                      placeholder={
                                        Object.keys(currentCollection.schema)[i]
                                      }
                                      component={Input}
                                    />
                                    {/* <Radio
                                    value={'Yes'}
                                      defaultChecked
                                      name={Object.keys(currentCollection.schema)[i]}
                                    >
                                      Checked Radio
                                    </Radio> */}
                                  </>
                                );
                              }
                              // return <DatePicker placeholder="Pick a date" />;
                            }}
                          </Field>
                        </FormItem>

                        {/* */}
                      </div>
                    );
                  })}

                  <div className="lg:col-span-2">
                    {/* <ProductImages
                      setOpenDoc={setOpenDoc}
                      touched={touched}
                      errors={errors}
                      values={values}
                    /> */}
                  </div>
                </div>
                <StickyFooter
                  className="-mx-8 px-8 flex items-center justify-between py-4"
                  stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <div>
                    {/* {type === "edit" && (
                      <DeleteProductButton onDelete={onDelete} />
                    )} */}
                  </div>
                  <div className="md:flex items-center">
                    <Button
                      size="sm"
                      className="ltr:mr-3 rtl:ml-3"
                      // onClick={() => onDiscard?.()}
                      type="button"
                    >
                      Discard
                    </Button>
                    <Button
                      size="sm"
                      variant="solid"
                      //   loading={isSubmitting}
                      // icon={<AiOutlineSave />}
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>
                </StickyFooter>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </AdaptableCard>
    </>
  );
};

export default ProductList;
