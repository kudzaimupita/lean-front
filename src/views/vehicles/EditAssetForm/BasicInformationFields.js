import React from "react";
import { AdaptableCard, RichTextEditor } from "components/shared";
import { Input, FormItem, Select, Avatar, Upload } from "components/ui";
import { Field } from "formik";
import NumberFormat from "react-number-format";
// import { Field } from 'formik'
import { HiTruck, HiOutlineGlobeAlt } from "react-icons/hi";

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
    form.setFieldValue(field.name, file[0]);
  };
  console.log(values.fields);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 justify-center">
          <Field name="imageCover">
            {({ field, form }) => {
              const avatarProps = field.value ? generateImage(field.value) : {};
              return (
                <Upload
                  className="cursor-pointer"
                  onChange={(files) => onSetFormFile(form, field, files)}
                  onFileRemove={(files) => onSetFormFile(form, field, files)}
                  showList={false}
                  uploadLimit={1}
                >
                  <Avatar
                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                    size={100}
                    shape="rounded"
                    icon={<HiTruck />}
                    {...avatarProps}
                  />
                </Upload>
              );
            }}
          </Field>
        </div>
        <div className="col-span-1">
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
        </div>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {values.fields?.map((field) => (
          <div className="col-span-1">
            <FormItem
              label={field?.customField?.name}
              invalid={errors.bulkDiscountPrice && touched.bulkDiscountPrice}
              errorMessage={errors.bulkDiscountPrice}
            >
              <Field
                type="text"
                autoComplete="off"
                name={field?.customField?.name}
                placeholder={field?.customField?.name}
                component={Input}
              />
            </FormItem>
          </div>
        ))}

    
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="col-span-1">
          <FormItem
            label="License Plate"
            invalid={errors.bulkDiscountPrice && touched.bulkDiscountPrice}
            errorMessage={errors.bulkDiscountPrice}
          >
            <Field
              type="text"
              autoComplete="off"
              name="licensePlate"
              placeholder="Licence Plate"
              component={Input}
            />
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem label="Status" component={Select}>
            <Field name="status">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={categories}
                  value={categories.filter(
                    (category) => category.value === values.status
                  )}
                  onChange={(option) => {
                    console.log(field.status, option.value);
                    form.setFieldValue("status", option.value);
                  }}
                />
              )}
            </Field>
          </FormItem>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <FormItem label="Transmission" component={Select}>
            <Field name="transmission">
              {({ field, form }) => (
                <Select
                  field={field}
                  form={form}
                  options={transmissions}
                  value={transmissions.filter(
                    (category) => category.value === values.transmission
                  )}
                  onChange={(option) => {
                    form.setFieldValue("transmission", option.value);
                  }}
                />
              )}
            </Field>
          </FormItem>
        </div>
        <div className="col-span-1">
          <FormItem
            label="Asset Value"
            invalid={errors.taxRate && touched.taxRate}
            errorMessage={errors.taxRate}
          >
            <Field name="currentMarketValue" required={true}>
              {({ field, form }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="Asset Value"
                    customInput={NumberInput}
                    onValueChange={(e) => {
                      form.setFieldValue(field.name, e.value);
                    }}
                  />
                );
              }}
            </Field>
          </FormItem>
        </div>
      </div>
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
