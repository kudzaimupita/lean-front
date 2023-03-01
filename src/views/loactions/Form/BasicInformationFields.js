import React from "react";
import { AdaptableCard, RichTextEditor } from "components/shared";
import { Input, FormItem, Select, Avatar, Upload } from "components/ui";
import { Field } from "formik";
import NumberFormat from "react-number-format";
// import { Field } from 'formik'
import {
  HiOutlineUserCircle,
  HiOutlineMail,
  HiOutlineBriefcase,
  HiOutlineUser,
  HiCheck,
  HiTruck,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { storeVehicle } from "../../../services/vehicleService";
import { toast, Notification } from "components/ui";
const PriceInput = (props) => {
  return <Input {...props} value={props.field.value} prefix="$" />;
};

const NumberInput = (props) => {
  return <Input {...props} value={props.field.value} />;
};

const NumberFormatInput = ({ onValueChange, ...rest }) => {
  return (
    <NumberFormat
      customInput={Input}
      type="text"
      onValueChange={onValueChange}
      autoComplete="off"
      {...rest}
    />
  );
};

export const categories = [
  { label: "Active", value: "active" },
  { label: "inActive", value: "inActive" },
  { label: "Service", value: "service" },
];

export const transmissions = [
  { label: "Automatic", value: "automatic" },
  { label: "Manual", value: "manual" },
  { label: "Semi Automatic", value: "semiAutomatic" },
  { label: "Continuously Variable", value: "continuouslyVariable" },
];

const BasicInformationFields = (props) => {
  const { touched, errors, values } = props;

  const onSetFormFile = (form, field, file) => {
    console.log(`data:image/b`);
    form.setFieldValue(field.name, file[0]);

    // consoil
    // storeVehicle({...form})
  };

  const generateImage = (field) => {
    console.log(typeof field !== "object");
    if (typeof field !== "object") {
      return {
        src: `https://baboon-images.s3.amazonaws.com/${field}`,
      };
    } else {
      return { src: URL.createObjectURL(field) };
    }
  };
  return (
    <AdaptableCard className="mb-4" divider>
      <h5 className="mb-2">Basic Information</h5>
      {/* <p className="mb-6">Section to config basic product information</p> */}
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <FormItem
            label="Vehicle Name/Alias"
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="name"
              placeholder="Name"
              component={Input}
            />
          </FormItem>
          <FormItem
            label="Site Manager Name"
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="siteManagerName"
              placeholder="Site Manager Name..."
              component={Input}
            />
          </FormItem>
        </div>
        <div className="col-span-2">
          <FormItem
            label="Address"
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="address"
              placeholder="Address...."
              component={Input}
            />
          </FormItem>
          <FormItem
            label="Site Manager Email"
            invalid={errors.name && touched.name}
            errorMessage={errors.name}
          >
            <Field
              type="text"
              autoComplete="off"
              name="siteManagerEmail"
              placeholder="Site Manager Email...."
              component={Input}
            />
          </FormItem>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <FormItem
            label="Make"
            invalid={errors.bulkDiscountPrice && touched.bulkDiscountPrice}
            errorMessage={errors.bulkDiscountPrice}
          >
            <Field
              type="text"
              autoComplete="off"
              name="make"
              placeholder="make"
              component={Input}
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Model"
            invalid={errors.taxRate && touched.taxRate}
            errorMessage={errors.taxRate}
          >
            <Field
              type="text"
              autoComplete="off"
              name="model"
              placeholder="model"
              component={Input}
            />
          </FormItem>
        </div>
      </div> */}

      {/* <FormItem
        label="Code"
        invalid={errors.productCode && touched.productCode}
        errorMessage={errors.productCode}
      >
        <Field
          type="text"
          autoComplete="off"
          name="productCode"
          placeholder="Code"
          component={Input}
        />
      </FormItem> */}
      <FormItem
        label="Description"
        labelClass="!justify-start"
        invalid={errors.description && touched.description}
        errorMessage={errors.description}
      >
        <Field name="description">
          {({ field, form }) => (
            <RichTextEditor
              value={field.value}
              onChange={(val) => form.setFieldValue(field.name, val)}
            />
          )}
        </Field>
      </FormItem>
    </AdaptableCard>
  );
};

export default BasicInformationFields;
