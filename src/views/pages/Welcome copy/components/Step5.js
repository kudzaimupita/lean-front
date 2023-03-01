import React from "react";
import { Button, FormItem, FormContainer, Select, Input } from "components/ui";
import { Field, Form, Formik } from "formik";
import { HiArrowSmLeft } from "react-icons/hi";
import * as Yup from "yup";
import { countryList } from 'constants/countries.constant'

const validationSchema = Yup.object().shape({
  country: Yup.string().required("Organization country is required"),
  // assetCatalogueEstimate: Yup.string().required(
  //   "Please select your organization assets estimate"
  // ),
});

const sizes = [
  // { label: "Solo", value: "solo" },
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const Step2 = ({ onNext, onBack }) => {
  return (
    <div className="text-center">
      <h3 className="mb-2">Help Us setup your account</h3>
      <div className="mt-8 max-w-[600px] lg:min-w-[600px] mx-auto">
        <Formik
         validationSchema={validationSchema}
          initialValues={{
            country: "",
            // name: "",
          }}
          // validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values)
            onNext?.(values);
          }}
        >
          {({ values, touched, errors }) => {
            return (
              <Form>
                <FormContainer>
                  <FormItem
                    label="Country"
                    invalid={
                      errors.country && touched.country
                    }
                    errorMessage={errors.country}
                  >
                      <Field name="country">
                      {({ field, form }) => (
                        <Select
                          placeholder="Country..."
                          field={field}
                          form={form}
                          options={countryList}
                          value={countryList.filter(
                            (size) => size.label === values.country
                          )}
                          onChange={(size) =>
                            form.setFieldValue(field.name, size.label)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                  <FormItem
                    label="Has multiple sites/facilities?"
                    invalid={
                      errors.multipleSites && touched.multipleSites
                    }
                    errorMessage={errors.multipleSites}
                  >
                      <Field name="multipleSites">
                      {({ field, form }) => (
                        <Select
                          placeholder="Multiple facilities..."
                          field={field}
                          form={form}
                          options={sizes}
                          value={sizes.filter(
                            (size) => size.label === values.multipleSites
                          )}
                          onChange={(size) =>
                            form.setFieldValue(field.name, size.label)
                          }
                        />
                      )}
                    </Field>
                  </FormItem>
                 
                  <FormItem
                    label="Phone"
                    invalid={
                      errors.phone && touched.phone
                    }
                    errorMessage={errors.phone}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="phone"
                      placeholder="Phone..."
                      component={Input}
                    />
                  </FormItem>
              
                  <FormItem>
                    <Button block variant="solid" type="submit">
                      Continue
                    </Button>
                    <Button
                      className="mt-4"
                      variant="plain"
                      onClick={onBack}
                      type="button"
                      icon={<HiArrowSmLeft />}
                      block
                    >
                      Back
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
