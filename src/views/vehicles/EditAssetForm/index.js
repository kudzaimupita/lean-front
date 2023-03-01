import React, { forwardRef, useState } from "react";
import { FormContainer, Button, hooks } from "components/ui";
import { StickyFooter, ConfirmDialog } from "components/shared";
import { Form, Formik, useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import BasicInformationFields from "./BasicInformationFields";
import PricingFields from "./PricingFields";
import OrganizationFields from "./OrganizationFields";
import ProductImages from "./ProductImages";
import Documents from "./Schedule";
import cloneDeep from "lodash/cloneDeep";
import { HiOutlineTrash } from "react-icons/hi";
import { AiOutlineSave } from "react-icons/ai";
import * as Yup from "yup";
import { storeVehicle } from "../../../services/vehicleService";
import { storeDataEntry } from "../../../services/dataEntry.service";
import { getNewCustomFieldss } from "../../../services/customFieldService";
import { toast, Notification } from "components/ui";
import { init } from "i18next";
// import Iframe from "react-iframe";
// import { values } from "lodash";
const { useUniqueId } = hooks;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product Name Required"),
  price: Yup.number().required("Price Required"),
  stock: Yup.number().required("SKU Required"),
  category: Yup.string().required("Category Required"),
});

const da = [
  {
    id: "0",
    time: "10:00am",
    eventName: "Sprint Planning",
    desciption: "via Zoom",
    type: "meeting",
  },
  {
    id: "1",
    time: "1:00pm",
    eventName: "Design discussion",
    desciption: "via Microsoft Teams",
    type: "meeting",
  },
  {
    id: "2",
    time: "3:00pm",
    eventName: "Create daily report",
    desciption: "Daily task",
    type: "task",
  },
  {
    id: "3",
    time: "4:00pm",
    eventName: "MySql online workshop",
    desciption: "Online workshop",
    type: "workshop",
  },
];
const DeleteProductButton = ({ onDelete }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const onConfirmDialogOpen = () => {
    setDialogOpen(true);
  };

  const onConfirmDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    onDelete?.(setDialogOpen);
  };

  return (
    <>
      <Button
        className="text-red-600"
        variant="plain"
        size="sm"
        icon={<HiOutlineTrash />}
        type="button"
        onClick={onConfirmDialogOpen}
      >
        Delete
      </Button>
      <ConfirmDialog
        isOpen={dialogOpen}
        onClose={onConfirmDialogClose}
        onRequestClose={onConfirmDialogClose}
        type="danger"
        title="Delete product"
        onCancel={onConfirmDialogClose}
        onConfirm={handleConfirm}
        confirmButtonColor="red-600"
      >
        <p>
          Are you sure you want to delete this product? All record related to
          this product will be deleted as well. This action cannot be undone.
        </p>
      </ConfirmDialog>
    </>
  );
};
export const popNotification = (keyword) => {
  toast.push(
    <Notification title={`Successfuly Saved`} type="success" duration={2500}>
      Successfuly Saved
    </Notification>,
    {
      placement: "top-center",
    }
  );
  // navigate("/app/sales/product-list");
};

export const popNotificationError = (keyword) => {
  toast.push(
    <Notification title={`Error saving`} type="danger" duration={2500}>
      {keyword}
    </Notification>,
    {
      placement: "top-center",
    }
  );
  // navigate("/app/sales/product-list");
};
const ProductForm = forwardRef((props, ref) => {
  // const {values}=useFormikContext()
  const [openDoc, setOpenDoc] = useState(false);
  const { type, initialData, onFormSubmit, onDiscard, onDelete } = props;
  console.log(initialData);

  // console.log(obj)
  const newId = useUniqueId("product-");
  const navigate = useNavigate();
  function buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? "" : data;
      formData.append(parentKey, value);
    }
  }

  function jsonToFormData(data) {
    const formData = new FormData();
    buildFormData(formData, data);
    return formData;
  }

  function groupItemBy(array, property) {
    var hash = {},
      props = property.split(".");
    for (var i = 0; i < array?.length; i++) {
      var key = props.reduce(function (acc, prop) {
        return acc && acc[prop];
      }, array[i]);
      if (!hash[key]) hash[key] = [];
      hash[key].push(array[i]);
    }
    return hash;
  }
  const newFields = Object.keys(
    groupItemBy(initialData.newVehicleType?.fields, "category.name")
  ).map((item) => {
    return {
      name: item,
      fields: groupItemBy(initialData.newVehicleType?.fields, "category.name")[
        item
      ],
    };
  });

  console.log(newFields);
  const docs = [
    {
      uri: "https://baboon-images.s3.amazonaws.com/vehicle-1673088466104-imageCover.jpeg",
    },
  ];
  return (
    <>
      {/* <IFrame
   id="msdoc-iframe"
   title="msdoc-iframe"
   src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
      values.d
   )}`}
   frameBorder="0"
/> */}
      {/* {openDoc && (
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          // style={{ height: 500 }}
        />
      )} */}

      <Formik
        innerRef={ref}
        initialValues={{
          ...initialData,

          tags: initialData?.tags
            ? initialData.tags.map((value) => ({ label: value, value }))
            : [],
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const formData = cloneDeep(values);
          const form = jsonToFormData(formData);
          console.log(values);
          const fields = Object.keys(values)
            .map((field, i) => {
              if (field?.split("-")[1]) {
                return {
                  id: field?.split("-")[1],
                  value: values[field],
                };
              }
              return;
            })
            .filter((item) => item);

          const obj = {
            fields,
            vehicle: values._id,
            vehicleType: values.vehicleType._id,
          };
          if (fields.length > 0) {
            storeDataEntry(obj).then(() => {
              popNotification("Asset Saved");

              // navigate(`/app/vehicles/view/${data?.data?._id}`);
              setSubmitting(false);
              // onNext(data?.data, setSubmitting);
            });
          } else {
            popNotification("Asset Saved");

            // navigate(`/app/vehicles/view/${data?.data?._id}`);
            setSubmitting(false);
            // onNext(data?.data, setSubmitting);
          }
          storeVehicle(form, values._id)
            .then((result) => {
              popNotification("updated");
              setSubmitting(false);
              console.log(result.data);
              if (!values.id) navigate(`/app/vehicles/edit/${result.data._id}`);
            })
            .catch((errors) =>
              errors.map(
                (error) => popNotificationError(error) & setSubmitting(false)
              )
            )
            .finally(setSubmitting(false));
          onFormSubmit?.(formData, setSubmitting);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <BasicInformationFields
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                  {newFields?.map((field) => (
                    <div className="col-span-1">
                      <PricingFields
                        touched={touched}
                        errors={errors}
                        values={values}
                        field={field}
                      />
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-1">
                  <ProductImages
                    setOpenDoc={setOpenDoc}
                    touched={touched}
                    errors={errors}
                    values={values}
                  />
                </div>
              </div>
              <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div>
                  {type === "edit" && (
                    <DeleteProductButton onDelete={onDelete} />
                  )}
                </div>
                <div className="md:flex items-center">
                  <Button
                    size="sm"
                    className="ltr:mr-3 rtl:ml-3"
                    onClick={() => onDiscard?.()}
                    type="button"
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    loading={isSubmitting}
                    icon={<AiOutlineSave />}
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
    </>
  );
});

ProductForm.defaultProps = {
  type: "edit",
  initialData: {
    id: "",
    name: "",
    productCode: "",
    img: "",
    imgList: [],
    category: "",
    price: 0,
    stock: 0,
    status: 0,
    costPerItem: 0,
    bulkDiscountPrice: 0,
    taxRate: 6,
    tags: [],
    brand: "",
    vendor: "",
    description: "",
  },
};

export default ProductForm;
