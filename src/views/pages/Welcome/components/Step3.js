import React, { useEffect, useState } from "react";
import { FormItem, FormContainer, Segment, Button } from "components/ui";
import { Field, Form, Formik } from "formik";
import { SegmentItemOption, Loading } from "components/shared";
import DataCapture from "../../../account/KycForm/index";
import {
  getNewVehicleTypes,
  getVehicleType,
} from "../../../../services/vehicleTypeService";
import {
  HiOutlineCode,
  HiOutlineCube,
  HiOutlinePencil,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
  HiArrowSmLeft,
} from "react-icons/hi";

const roles = [
  { value: "Vehicles", label: "Software Engineer", icon: <HiOutlineCode /> },
  { value: "Tractors", label: "Product Manager", icon: <HiOutlineCube /> },
  { value: "Hosiptal Beds", label: "Designer", icon: <HiOutlinePencil /> },
  { value: "qaTester", label: "QA Tester", icon: <HiOutlineShieldCheck /> },
  { value: "other", label: "Others", icon: <HiOutlineSparkles /> },
];

const Step3 = ({ onNext, onBack, vehicleTypeId, asset, handleBackBack }) => {
  const [loading, setLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState({});
  useEffect(() => {
    console.log(vehicleTypeId);
    setLoading(true);
    getVehicleType(vehicleTypeId).then((data) => {
      setLoading(false);
      console.log(data);
      setVehicleType(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSetFieldValue = (form, field, val) => {
    form.setFieldValue(field.name, val[0]);

    onNext?.();
  };

  return (
    <Loading loading={loading}>
      <DataCapture
        handleBackBack={handleBackBack}
        asset={asset}
        onBack={onBack}
        vehicleType={vehicleType}
      />
    </Loading>
  );
};

export default Step3;
