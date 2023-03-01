import React, { useEffect, useState } from "react";
import {
  FormItem,
  FormContainer,
  Segment,
  Button,
  Avatar,
} from "components/ui";
import { Field, Form, Formik } from "formik";
import { SegmentItemOption, Loading } from "components/shared";
import { getNewVehicleTypes } from "../../../../services/vehicleTypeService";
import {
  HiOutlineCode,
  HiOutlineCube,
  HiOutlinePencil,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
  HiArrowSmLeft,
} from "react-icons/hi";

const Step3 = ({ onNext, onBack, setVehicleTypeId }) => {
  const [loading, setLoading] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  useEffect(() => {
    setLoading(true);
    getNewVehicleTypes().then((data) => {
      setLoading(false);
      console.log(data.data.results);
      setVehicleTypes(
        data.data.results.map((vehicle) => {
          return {
            value: vehicle?._id,
            label: vehicle?.name,
            icon: <HiOutlineCode />,
            image: vehicle?.imageCover,
          };
        })
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSetFieldValue = (form, field, val) => {
    console.log(field, val);
    form.setFieldValue(field.name, val[0]);
    setVehicleTypeId(val[0]);
    onNext?.({ vehicleType: val[0] });
  };

  return (
    <Loading loading={loading}>
      <div className="text-center">
        <h3 className="mb-2">Choose Asset Type</h3>
        <div className="mt-8 max-w-[600px] lg:min-w-[600px] mx-auto">
          <Formik
            initialValues={{
              role: "",
            }}
          >
            {({ touched, errors }) => {
              return (
                <Form>
                  <FormContainer>
                    <FormItem
                      invalid={errors.role && touched.role}
                      errorMessage={errors.role}
                    >
                      <Field name="vehicleType">
                        {({ field, form }) => (
                          <Segment
                            value={field.value}
                            onChange={(val) => {
                              console.log(val);
                              onSetFieldValue(form, field, val);
                            }}
                          >
                            <div className="grid grid-cols-2 gap-4 w-full">
                              {vehicleTypes?.map((item) => (
                                <Segment.Item
                                  value={item.value}
                                  key={item.value}
                                  disabled={item.disabled}
                                >
                                  {({
                                    ref,
                                    active,
                                    onSegmentItemClick,
                                    disabled,
                                  }) => {
                                    console.log(item);
                                    return (
                                      <SegmentItemOption
                                        hoverable
                                        ref={ref}
                                        // active={active}
                                        disabled={disabled}
                                        onSegmentItemClick={onSegmentItemClick}
                                        className="bg-white dark:bg-gray-800"
                                      >
                                        <div className="flex items-center gap-3">
                                          <span className="text-2xl">
                                            <Avatar
                                              size={40}
                                              shape="rounded"
                                              src={`https://baboon-images.s3.amazonaws.com/${item?.image}`}
                                            />
                                          </span>
                                          <h6>{item.label}</h6>
                                        </div>
                                      </SegmentItemOption>
                                    );
                                  }}
                                </Segment.Item>
                              ))}
                            </div>
                          </Segment>
                        )}
                      </Field>
                    </FormItem>
                    <Button
                      variant="plain"
                      onClick={onBack}
                      type="button"
                      icon={<HiArrowSmLeft />}
                      block
                    >
                      Back
                    </Button>
                  </FormContainer>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Loading>
  );
};

export default Step3;
