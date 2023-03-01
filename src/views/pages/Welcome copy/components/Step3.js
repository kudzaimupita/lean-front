import React from "react";
import { FormItem, FormContainer, Segment, Button } from "components/ui";
import { Field, Form, Formik } from "formik";
import { SegmentItemOption } from "components/shared";
import {
  HiOutlineCode,
  HiOutlineCube,
  HiOutlinePencil,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
  HiArrowSmLeft,
} from "react-icons/hi";
import {
  MdOutlineLocalHospital
} from "react-icons/md";
import {
  RiGovernmentFill,
  RiComputerFill
} from "react-icons/ri";
import {
  BiHotel
} from "react-icons/bi";
import {
  IoMdConstruct
} from "react-icons/io";
const roles = [
  { value: "IT/ Software", label: "IT/ Software", icon: <RiComputerFill /> },
  { value: "Government", label: "Government", icon: <RiGovernmentFill/> },
  { value: "Education", label: "Education", icon: <HiOutlinePencil /> },
  { value: "Healthcare", label: "Healthcare", icon: <MdOutlineLocalHospital /> },
  { value: "Non-Profit", label: "Non-Profit", icon: <HiOutlineShieldCheck /> },
  { value: "Construction", label: "Construction", icon: <IoMdConstruct /> },
  { value: "Hospitality", label: "Hospitality", icon: <BiHotel /> },
  { value: "Others", label: "Others", icon: <HiOutlineSparkles /> },
];

const Step3 = ({ onNext, onBack }) => {
  const onSetFieldValue = (form, field, val) => {
    form.setFieldValue(field.name, val[0]);
    const obj={}
    obj[field.name]=val[0]
    console.log(obj)
    onNext?.(obj);
  };

  const formBuilder = () => {};
  return (
    <div className="text-center">
      <h3 className="mb-2">What is your role in the organization?</h3>
      <div className="mt-8 max-w-[600px] lg:min-w-[600px] mx-auto">
        <Formik
          initialValues={{
            industry: "",
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
                    <Field name="industry">
                      {({ field, form }) => (
                        <Segment
                          value={[field.value]}
                          onChange={(val) => onSetFieldValue(form, field, val)}
                        >
                          <div className="grid grid-cols-2 gap-4 w-full">
                            {roles.map((item) => (
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
                                  return (
                                    <SegmentItemOption
                                      hoverable
                                      ref={ref}
                                      active={active}
                                      disabled={disabled}
                                      onSegmentItemClick={onSegmentItemClick}
                                      className="bg-white dark:bg-gray-800"
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="text-2xl">
                                          {item.icon}
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
  );
};

export default Step3;
