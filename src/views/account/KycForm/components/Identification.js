import React, { useState } from "react";
import {
  Button,
  Upload,
  Badge,
  Segment,
  FormItem,
  FormContainer,
  Avatar,
} from "components/ui";
import {
  SvgIcon,
  DoubleSidedImage,
  SegmentItemOption,
} from "components/shared";
// import { HiOutlineCloudUpload } from "react-icons/hi";
// import { FcImageFile } from "react-icons/fc";

import { useDispatch, useSelector } from "react-redux";
import { HiOutlinePlus } from "react-icons/hi";

import { DriversLicenseSvg, PassportSvg, NationalIdSvg } from "assets/svg";
import classNames from "classnames";
import { Field, Form, Formik } from "formik";
import useThemeClass from "utils/hooks/useThemeClass";
import { storeVehicle } from "../../../../services/vehicleService";
import { storeDataEntry } from "../../../../services/dataEntry.service";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { FcImageFile } from "react-icons/fc";
import {
  popNotificationError,
  popNotification,
} from "../../../vehicles/EditAssetForm/index";
import { setCurrentStep } from "../store/stateSlice";

const validationSchema = Yup.object().shape({});

const documentTypes = [
  { value: "passport", label: "Upload Images", desc: "" },
  //   { value: "nationalId", label: "More Images", desc: "" },
  //   { value: "driversLicense", label: "Documents", desc: "" },
];

const documentUploadDescription = {
  passport: [
    "Upload PNG and JPEG formats only",
    "Please make sure the pictures are clear and cropped to size",
  ],
  nationalId: [
    "Uploaded ID image must be clearly visible",
    "ID image must in valid period",
    "Provided ID must included your full name, date of birth & your photo",
  ],
  driversLicense: [
    "Uploaded driver license image must be clearly visible",
    "Driver license must in valid period",
    "Uploaded driver license image must be clearly visible",
  ],
};

const DocumentTypeIcon = ({ type }) => {
  switch (type) {
    case "passport":
      return <NationalIdSvg />;
    case "nationalId":
      return <NationalIdSvg />;
    case "driversLicense":
      return <DriversLicenseSvg />;
    default:
      return null;
  }
};

const DocumentUploadField = (props) => {
  const { label, name, children, touched, errors } = props;

  const onSetFormFile = (form, field, file) => {
    form.setFieldValue(field.name, URL.createObjectURL(file[0]));
  };

  return (
    <FormItem
      label={label}
      invalid={errors[name] && touched[name]}
      errorMessage={errors[name]}
    >
      <Field name={name}>
        {({ field, form }) => (
          <Upload
            draggable
            className="cursor-pointer h-[300px]"
            onChange={(files) => onSetFormFile(form, field, files)}
            onFileRemove={(files) => onSetFormFile(form, field, files)}
            showList={false}
            uploadLimit={1}
          >
            {field.value ? (
              <img className="p-3 max-h-[300px]" src={field.value} alt="" />
            ) : (
              <div className="text-center">
                {children}
                <p className="font-semibold">
                  <span className="text-gray-800 dark:text-white">
                    Drop your image here, or{" "}
                  </span>
                  <span className="text-blue-500">browse</span>
                </p>
                <p className="mt-1 opacity-60 dark:text-white">
                  Support: jpeg, png
                </p>
              </div>
            )}
          </Upload>
        )}
      </Field>
    </FormItem>
  );
};

const Identification = ({
  data = {
    documentType: "passport",
    passportCover: "",
    passportDataPage: "",
    nationalIdFront: "",
    nationalIdBack: "",
    driversLicenseFront: "",
    driversLicenseBack: "",
  },
  onNextChange,
  onBackChange,
  currentStepStatus,
  asset,
}) => {
  const { textTheme, bgTheme } = useThemeClass();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onNext = (values, setSubmitting) => {
    onNextChange?.(values, "identification", setSubmitting);
  };
  const [avatarImg, setAvatarImg] = useState(null);
  const [avatarImgs, setAvatarImgs] = useState([]);

  const onFileUpload = (file) => {
    console.log(file[0]);
    setAvatarImg(file[0]);
  };
  const onFileUploadMultiple = (file) => {
    console.log(file, JSON.stringify(file.map((item) => ({ image: item }))));
    setAvatarImgs(file);
  };

  const onBack = () => {
    onBackChange?.();
  };
  function buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      //   console.log(parentKey, data);
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      console.log(parentKey, data);
      const value = data == null ? "" : data;

      formData.append(parentKey, value);
    }
  }

  function jsonToFormData(data) {
    const formData = new FormData();
    buildFormData(formData, data);
    if (avatarImgs.length > 0) {
      avatarImgs.map((img) => {
        formData.append("images", img);
      });
    }
    if (avatarImg) {
      formData.append("imageCover", avatarImg);
    }
    return formData;
  }
  return (
    <>
      <div className="mb-8">
        <h3 className="mb-2">Media</h3>
        {/* <p>Upload relevant document to verify your identity.</p> */}
      </div>
      <Formik
        initialValues={data}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          //   setSubmitting(true);
          const fields = Object.keys(asset?.customFields)
            .map((field, i) => {
              if (field?.split("-")[1]) {
                return {
                  id: field?.split("-")[1],
                  value: asset.customFields[field],
                };
              }
              return;
            })
            .filter((item) => item);

          //   console.log(
          //     jsonToFormData({
          //       ...asset.asset,
          //       imageCover: avatarImg,
          //       avatarImgs,
          //     })
          //   );
          console.log(asset);
          storeVehicle(
            jsonToFormData({
              ...asset.asset,
              description: asset.customFields.description,
              location: asset.customFields.location,
              department: asset.customFields.department,
            })
          ).then((data) => {
            dispatch(setCurrentStep(0));
            const obj = {
              fields,
              vehicle: data.data._id,
              vehicleType: asset.asset.vehicleType,
            };

            if (obj.fields.length > 0) {
              storeDataEntry(obj).then(() => {
                popNotification("Asset Saved");

                // navigate(`/app/vehicles/view/${data?.data?._id}`);
                setSubmitting(false);
                onNext(data?.data, setSubmitting);
              });
            } else {
              popNotification("Asset Saved");

              // navigate(`/app/vehicles/view/${data?.data?._id}`);
              setSubmitting(false);
              onNext(data?.data, setSubmitting);
            }
          });

          //   setSubmitting(true);
          //   setTimeout(() => {
          //     onNext(values, setSubmitting);
          //   }, 1000);
        }}
      >
        {({ values, touched, errors, isSubmitting }) => {
          const validatedProps = { touched, errors };
          return (
            <Form>
              <FormContainer>
                <FormItem
                  label="Select your media type"
                  //   invalid={errors.documentType && touched.documentType}
                  //   errorMessage={errors.documentType}
                >
                  <Field name="documentType">
                    {({ field, form }) => (
                      <Segment
                        className="flex xl:items-center flex-col xl:flex-row gap-4"
                        value={["passport"]}
                        onChange={(val) =>
                          form.setFieldValue(field.name, val[0])
                        }
                      >
                        <>
                          {documentTypes.map((item, index) => (
                            <Segment.Item
                              value={item.value}
                              key={item.value}
                              disabled={item.disabled}
                            >
                              {({
                                ref,
                                active,
                                value,
                                onSegmentItemClick,
                                disabled,
                              }) => {
                                return (
                                  <SegmentItemOption
                                    ref={ref}
                                    active={active}
                                    disabled={disabled}
                                    className="w-full xl:w-[260px]"
                                    onSegmentItemClick={onSegmentItemClick}
                                  >
                                    <div className="flex items-center">
                                      <SvgIcon
                                        className={classNames(
                                          "text-4xl ltr:mr-3 rtl:ml-3",
                                          active && textTheme
                                        )}
                                      >
                                        <DocumentTypeIcon type={value} />
                                      </SvgIcon>
                                      <h6>{item.label}</h6>
                                    </div>
                                  </SegmentItemOption>
                                );
                              }}
                            </Segment.Item>
                          ))}
                        </>
                      </Segment>
                    )}
                  </Field>
                </FormItem>
                <div className="mb-6">
                  <h6>Tips</h6>
                  <ul className="mt-4">
                    {documentUploadDescription[values?.documentType]?.map(
                      (desc, index) => (
                        <li
                          className="mb-2 flex items-center"
                          key={desc + index}
                        >
                          <Badge
                            className="rtl:ml-3 ltr:mr-3"
                            innerClass={bgTheme}
                          />
                          <span>{desc}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="grid xl:grid-cols-2 gap-4">
                  {values.documentType === "passport" && (
                    <>
                      {/* <div>
                        <Upload
                          className="cursor-pointer"
                          onChange={onFileUpload}
                          showList={false}
                          uploadLimit={1}
                          //   beforeUpload={beforeUpload}
                        >
                          <Avatar
                            size={200}
                            src={avatarImg}
                            icon={<HiOutlinePlus />}
                          />
                        </Upload>
                      </div> */}
                      <div>
                        <div>
                          <Upload
                            uploadLimit={1}
                            // draggable
                            onChange={onFileUpload}
                          >
                            <Button
                              type="button"
                              variant="solid"
                              icon={<HiOutlineCloudUpload />}
                            >
                              Choose Asset Cover Image
                            </Button>
                          </Upload>
                        </div>
                      </div>

                      <div>
                        <div>
                          <Upload
                            onChange={onFileUploadMultiple}
                            // draggable
                          >
                            {" "}
                            <Button
                              type="button"
                              variant="solid"
                              icon={<HiOutlineCloudUpload />}
                            >
                              Upload other images
                            </Button>
                          </Upload>
                        </div>
                      </div>

                      {/* <DocumentUploadField
                        name="passportCover"
                        label="Profile Image"
                        {...validatedProps}
                      >
                        <DoubleSidedImage
                          className="mx-auto mb-3"
                          src="/img/thumbs/passport.png"
                          darkModeSrc="/img/thumbs/passport-dark.png"
                          alt=""
                        />
                      </DocumentUploadField>
                      <DocumentUploadField
                        name="passportDataPage"
                        label="Other Images"
                        {...validatedProps}
                      >
                        <DoubleSidedImage
                          className="mx-auto mb-3"
                          src="/img/thumbs/passport-data.png"
                          darkModeSrc="/img/thumbs/passport-data-dark.png"
                          alt=""
                        />
                      </DocumentUploadField> */}
                    </>
                  )}
                  {values.documentType === "nationalId" && (
                    <>
                      <DocumentUploadField
                        name="nationalIdFront"
                        label="National Id Front"
                        {...validatedProps}
                      >
                        <DoubleSidedImage
                          className="mx-auto mb-3"
                          src="/img/thumbs/id-card-front.png"
                          darkModeSrc="/img/thumbs/id-card-front-dark.png"
                          alt=""
                        />
                      </DocumentUploadField>
                      <DocumentUploadField
                        name="nationalIdBack"
                        label="National Id Back"
                        {...validatedProps}
                      >
                        <DoubleSidedImage
                          className="mx-auto mb-3"
                          src="/img/thumbs/id-card-back.png"
                          darkModeSrc="/img/thumbs/id-card-back-dark.png"
                          alt=""
                        />
                      </DocumentUploadField>
                    </>
                  )}
                  {values.documentType === "driversLicense" && (
                    <>
                      <DocumentUploadField
                        name="driversLicenseFront"
                        label="Drivers License Front"
                        {...validatedProps}
                      >
                        <DoubleSidedImage
                          className="mx-auto mb-3"
                          src="/img/thumbs/drivers-license-front.png"
                          darkModeSrc="/img/thumbs/drivers-license-front-dark.png"
                          alt=""
                        />
                      </DocumentUploadField>
                      <DocumentUploadField
                        name="driversLicenseBack"
                        label="Drivers License Back"
                        {...validatedProps}
                      >
                        <DoubleSidedImage
                          className="mx-auto mb-3"
                          src="/img/thumbs/drivers-license-back.png"
                          darkModeSrc="/img/thumbs/drivers-license-back-dark.png"
                          alt=""
                        />
                      </DocumentUploadField>
                    </>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" onClick={onBack}>
                    Back
                  </Button>
                  <Button loading={isSubmitting} variant="solid" type="submit">
                    Save
                  </Button>
                </div>
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Identification;
