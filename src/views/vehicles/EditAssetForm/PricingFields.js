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
  const { touched, errors ,field,values} = props;
console.log(values)
  return (
    <AdaptableCard className="mb-4" divider>
      <h5>{field.name}</h5>
      {/* <p className="mb-6">Engine Spec</p> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {field.fields?.map((field) => (
        <div className="col-span-1">
      
          <div className="col-span-1">
            <FormItem
              label={field?.name}
              invalid={errors.bulkDiscountPrice && touched.bulkDiscountPrice}
              errorMessage={errors.bulkDiscountPrice}
            >
              <Field
              size='sm'
                type="text"
                autoComplete="off"
                name={`customField-${field?._id}`}
                placeholder={field?.name}
                component={Input}
              />
            </FormItem>
          </div>
      
        
        </div>
         ))}
      </div>
 

   
    </AdaptableCard>
  );
};

export default PricingFields;
