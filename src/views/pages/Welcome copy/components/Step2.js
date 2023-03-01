import React from "react";
import { Button, FormItem, FormContainer, Select, Input } from "components/ui";
import { Field, Form, Formik } from "formik";
import { HiArrowSmLeft } from "react-icons/hi";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Organization name is required"),
  assetCatalogueEstimate: Yup.string().required(
    "Please select your organization assets estimate"
  ),
});


const sizes = [
  // { label: "Solo", value: "solo" },
  { label: "10 ~ 500 assets", value: "10 ~ 500 assets" },
  { label: "500 ~ 2500 assets", value: "500 ~ 2500 assets" },
  { label: "2500 ~ 5000 assets", value: "2500 ~ 5000 assets" },
  { label: "5000 and Over", value: "5000 and Over" },
];

const Step2 = ({ onNext, onBack }) => {
  return (
    <div className="text-center">
      <h3 className="mb-2">Tell us about your organization</h3>
      <div className="mt-8 max-w-[600px] lg:min-w-[600px] mx-auto">
        <Formik
          initialValues={{
            assetCatalogueEstimate: "",
            name: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onNext?.(values);
          }}
        >
          {({ values, touched, errors }) => {
            return (
              <Form>
                <FormContainer>
                 
                  <FormItem
                    label="Name of your organization"
                    invalid={
                      errors.name && touched.name
                    }
                    errorMessage={errors.name}
                  >
                    <Field
                      type="text"
                      autoComplete="off"
                      name="name"
                      placeholder="Organization Name..."
                      component={Input}
                    />
                  </FormItem>
                  <FormItem
                    label="Size of your assets"
                    invalid={
                      errors.assetCatalogueEstimate && touched.assetCatalogueEstimate
                    }
                    errorMessage={errors.assetCatalogueEstimate}
                  >
                    <Field name="assetCatalogueEstimate">
                      {({ field, form }) => (
                        <Select
                          placeholder="Assets Estimate..."
                          field={field}
                          form={form}
                          options={sizes}
                          value={sizes.filter(
                            (size) => size.value === values.assetCatalogueEstimate
                          )}
                          onChange={(size) =>
                            form.setFieldValue(field.name, size.value)
                          }
                        />
                      )}
                    </Field>
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
