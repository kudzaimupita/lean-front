import React from "react";
import { AdaptableCard } from "components/shared";
import { Input, FormItem } from "components/ui";
import NumberFormat from "react-number-format";
import { Field } from "formik";

const PriceInput = (props) => {
  return <Input {...props} value={props.field.value} prefix="$" />;
};

const NumberInput = (props) => {
  return <Input {...props} value={props.field.value} />;
};

const TaxRateInput = (props) => {
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

const PricingFields = (props) => {
  const { touched, errors } = props;

  return (
    <AdaptableCard className="mb-4" divider>
      <h5>Engine</h5>
      <p className="mb-6">Engine Spec</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <FormItem
            label="Roof Load"
            // invalid={errors.stock && touched.stock}
            // errorMessage={errors.stock}
          >
            <Field name="roofLoad">
              {({ field, form }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="Roof Load"
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
        <div className="col-span-1">
          <FormItem
            label="Cargo Volume"
            // invalid={errors.price && touched.price}
            // errorMessage={errors.price}
          >
            <Field name="cargoVolume">
              {({ field, form }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="cargoVolume"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <FormItem
            label="seatingCapacity"
            // invalid={errors.bulkDiscountPrice && touched.bulkDiscountPrice}
            // errorMessage={errors.bulkDiscountPrice}
          >
            <Field name="seatingCapacity">
              {({ field, form }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="seatingCapacity"
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
        <div className="col-span-1">
          <FormItem
            label="monthlyInsurance"
            invalid={errors.taxRate && touched.taxRate}
            errorMessage={errors.taxRate}
          >
            <Field name="monthlyInsurance">
              {({ field, form }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="monthlyInsurance"
                    customInput={NumberInput}
                    // isAllowed={({ floatValue }) => floatValue <= 100}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <FormItem
            label="co2Emissions"
            // invalid={errors.bulkDiscountPrice && touched.bulkDiscountPrice}
            // errorMessage={errors.bulkDiscountPrice}
          >
            <Field name="co2Emissions">
              {({ field, form }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="co2Emissions"
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
        <div className="col-span-1">
          <FormItem
            label="fuelTankCapacity"
            invalid={errors.taxRate && touched.taxRate}
            errorMessage={errors.taxRate}
          >
            <Field name="fuelTankCapacity">
              {({ field, form }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="fuelTankCapacity"
                    customInput={NumberInput}
                    // isAllowed={({ floatValue }) => floatValue <= 100}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <FormItem
            label="fuelEfficiency"
            // invalid={errors.bulkDiscountPrice && touched.bulkDiscountPrice}
            // errorMessage={errors.bulkDiscountPrice}
          >
            <Field name="fuelEfficiency">
              {({ field, form }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="fuelEfficiency"
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
        <div className="col-span-1">
          <FormItem
            label="odometerUnit"
            invalid={errors.taxRate && touched.taxRate}
            errorMessage={errors.taxRate}
          >
            <Field name="odometerUnit">
              {({ field, form }) => {
                return (
                  <NumberFormatInput
                    form={form}
                    field={field}
                    placeholder="odometerUnit"
                    customInput={NumberInput}
                    // isAllowed={({ floatValue }) => floatValue <= 100}
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
    </AdaptableCard>
  );
};

export default PricingFields;
