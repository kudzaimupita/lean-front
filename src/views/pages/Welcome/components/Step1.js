import React, { useState } from "react";
import { Button, FormItem, FormContainer, Input } from "components/ui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import NumberFormat from "react-number-format";
const validationSchema = Yup.object().shape({
  // name: Yup.string().required("Asset name is required"),
  model: Yup.string().required("Model is required"),
  make: Yup.string().required("Make is required"),
  currentMarketValue: Yup.string().required("Asset Value is required"),
  // licensePlate: Yup.string().required("Unique identifier is required"),
});

const Step2 = ({ onNext, onBack }) => {
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

  const NumberInput = (props) => {
    return (
      <Input prefix="R" suffix=".00" {...props} value={props.field.value} />
    );
  };

  return (
    <div className="text-center">
      <h3 className="mb-2">Asset Details</h3>
      <div className="mt-4 max-w-[600px] lg:min-w-[600px] mx-auto">
        <Formik
          initialValues={{}}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            onNext?.({ asset: values });
          }}
        >
          {({ values, touched, errors }) => {
            return (
              <Form>
                <FormContainer>
                  {/* <FormItem
                    label="Asset Name"
                    invalid={errors.name && touched.name}
                    errorMessage={errors.name}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="name"
                      placeholder="Name..."
                      component={Input}
                      required={true}
                    />
                  </FormItem> */}
                  <FormItem
                    label="Make"
                    invalid={errors.make && touched.make}
                    errorMessage={errors.make}
                  >
                    <Field
                      size="sm"
                      type="text"
                      autoComplete="off"
                      name="make"
                      placeholder="Make..."
                      component={Input}
                      required={true}
                    />
                  </FormItem>
                  <FormItem
                    label="Model"
                    invalid={errors.model && touched.model}
                    errorMessage={errors.model}
                  >
                    <Field
                      size="sm"
                      type="text"
                      autoComplete="off"
                      name="model"
                      placeholder="model..."
                      component={Input}
                      required={true}
                    />
                  </FormItem>

                  {/* <FormItem
                    label="Unique ID"
                    invalid={errors.licensePlate && touched.licensePlate}
                    errorMessage={errors.licensePlate}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="licensePlate"
                      placeholder="Unique ID..."
                      component={Input}
                      required={true}
                    />
                  </FormItem> */}

                  {/* <FormItem
                    label="Location"
                    invalid={errors.licensePlate && touched.licensePlate}
                    errorMessage={errors.licensePlate}
                  >
                    <Field
                      size="sm"
                      type="text"
                      autoComplete="off"
                      name="location"
                      placeholder="Location..."
                      component={Input}
                      // required={true}
                    />
                  </FormItem>

                  <FormItem
                    label="Department"
                    invalid={errors.licensePlate && touched.licensePlate}
                    errorMessage={errors.licensePlate}
                  >
                    <Field
                      size="sm"
                      type="text"
                      autoComplete="off"
                      name="department"
                      placeholder="Department..."
                      component={Input}
                      // required={true}
                    />
                  </FormItem> */}
                  <FormItem
                    label="Asset Value"
                    invalid={
                      errors.currentMarketValue && touched.currentMarketValue
                    }
                    errorMessage={errors.currentMarketValue}
                  >
                    <Field name="currentMarketValue" required={true}>
                      {({ field, form }) => {
                        return (
                          <NumberFormatInput
                            size="sm"
                            form={form}
                            field={field}
                            required={true}
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

                  {/* <FormItem label="Type" component={Select}>
                    <Field name="type" size="sm">
                      {({ field, form }) => (
                        <Select
                          size="sm"
                          field={field}
                          form={form}
                          options={[
                            { label: "Asset", value: "asset" },
                            { label: "Part", value: "part" },
                          ]}
                          value={[
                            { label: "Asset", value: "asset" },
                            { label: "Part", value: "part" },
                          ].filter(
                            (category) => category.value === values.type
                          )}
                          onChange={(option) => {
                            console.log(values);
                            form.setFieldValue("type", option.value);
                          }}
                        />
                      )}
                    </Field>
                  </FormItem>

                  {values.type === "part" && (
                    <FormItem label="Linked Assets" component={Select}>
                      <Field name="type" size="sm">
                        {({ field, form }) => (
                          <Select
                            size="sm"
                            isMulti
                            field={field}
                            form={form}
                            options={[
                              { label: "Asset", value: "asset" },
                              { label: "Part", value: "part" },
                            ]}
                            value={values.type}
                            onChange={(option) => {
                              // console.log(field.status, option.value);
                              form.setFieldValue("tyrpe", option.value);
                            }}
                          />
                        )}
                      </Field>
                    </FormItem>
                  )} */}
                  {/* <FormItem
                    label="Brand"
                    // invalid={
                    //   errors.organizationSize && touched.organizationSize
                    // }
                    // errorMessage={errors.organizationSize}
                  >
                    <Field name="brand">
                      {({ field, form }) => (
                        <Select
                          placeholder="Brand"
                          field={field}
                          form={form}
                          options={sizes}
                          value={sizes.filter(
                            (size) => size.value === values.organizationSize
                          )}
                          onChange={(size) =>
                            form.setFieldValue(field.name, size.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                  <FormItem
                    label="Model"
                    // invalid={
                    //   errors.organizationSize && touched.organizationSize
                    // }
                    // errorMessage={errors.organizationSize}
                  >
                    <Field name="model">
                      {({ field, form }) => (
                        <Select
                          placeholder="Model"
                          field={field}
                          form={form}
                          options={sizes}
                          value={sizes.filter(
                            (size) => size.value === values.organizationSize
                          )}
                          onChange={(size) =>
                            form.setFieldValue(field.name, size.value)
                          }
                        />
                      )}
                    </Field>
                  </FormItem> */}
                  <FormItem>
                    <Button block variant="solid" type="submit">
                      Continue
                    </Button>
                  </FormItem>
                </FormContainer>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Step2;
