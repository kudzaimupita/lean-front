import React, { useCallback, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import get from "lodash/get";
import { countryList } from "constants/countries.constant";
import * as Yup from "yup";
import { Segment } from "components/ui";
import { HiCheckCircle, HiPlusCircle, HiEye } from "react-icons/hi";
import isLastChild from "utils/isLastChild";
import classNames from "classnames";
import { Avatar } from "components/ui";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { setCurrentStep } from "../store/stateSlice";
import { useDispatch, useSelector } from "react-redux";
// import { setCurrentStep } from "../store/stateSlice";
import { setStepStatus, clearSteps, clearForm } from "../store/dataSlice";

const segmentSelections = [
  {
    value: "View Asset",
    desc: "Viewand edit the newl saved asset",
    disabled: false,
  },
  { value: "Add Another Asset", desc: "Add multiple assets", disabled: false },
  //   { value: "Business", desc: "Talk to us for business plan.", disabled: true },
];
const AddressInfomation = ({
  data,
  onNextChange,
  onBackChange,
  handleBackBack,
  currentStepStatus,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onNext = (item) => {
    if (item.value === "View Asset") {
      navigate(`/app/vehicles/view/${data?.identification?._id}`);
      dispatch(setCurrentStep(0));
      dispatch(clearSteps("pending"));
    } else {
      navigate("/app/sales/product-new");
      dispatch(setCurrentStep(0));
      handleBackBack();
      dispatch(clearSteps("pending"));
    }
  };

  const onCheck = (value, field, form) => {
    form.setFieldValue(field.name, value);
  };

  useEffect(() => {
    dispatch(clearForm());
    return () => {
      //   dispatch(setCurrentStep(0));
      //   dispatch(clearSteps("pending"));
      //   handleBackBack();
    };
  }, []);

  return (
    <>
      <div className="mb-8">
        <Avatar
          className="mr-4 bg-white h-20 w-20"
          icon={
            <MdOutlineLibraryAddCheck className="text-green-500 h-20 w-20" />
          }
        />{" "}
        <h3 className="mb-2">Asset Saved</h3>
      </div>

      <Segment
        defaultValue={["Team"]}
        className="gap-2 md:flex-row flex-col mt-6 mb-6"
      >
        {segmentSelections.map((item, index) => (
          <Segment.Item
            value={item.value}
            key={item.value}
            disabled={item.disabled}
            // onClick={() => }
          >
            {({ ref, active, value, onSegmentItemClick, disabled }) => {
              return (
                <div
                  ref={ref}
                  className={classNames(
                    "flex",
                    "ring-1",
                    "justify-between",
                    "border",
                    "rounded-md ",
                    "border-gray-300",
                    "py-5 px-4",
                    "cursor-pointer",
                    "select-none",
                    "w-100",
                    "md:w-[260px]",
                    active
                      ? "ring-indigo-500 border-indigo-500"
                      : "ring-transparent",
                    disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:ring-indigo-500 hover:border-indigo-500"
                  )}
                  onClick={() => {
                    onNext(item);
                  }}
                >
                  <div>
                    {" "}
                    <h6>
                      <span>
                        <HiEye className="text-indigo-600 h-10 w-10" />
                      </span>
                      {value}
                    </h6>
                    {/* <p>{item.desc}</p> */}
                  </div>
                  {active && (
                    <HiCheckCircle className="text-indigo-500 text-xl" />
                  )}
                </div>
              );
            }}
          </Segment.Item>
        ))}
      </Segment>
      {/* <button
        type="button"
        className="relative mb-6 block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <div className="mx-auto h-30 w-30 text-gray-400">
          <Avatar
            className="mr-4 bg-white h-24 w-24"
            icon={<VscSmiley className="text-green-700 h-20 w-20" />}
          />
        </div>

        <span className="mt-2 block text-sm font-medium text-gray-900">
          Asset Successfully stored{" "}
        </span>
      </button> */}
      {/* <ReactJson
        // collapsed={true}
        theme={"apathy"}
        iconStyle={"circle"}
        src={data?.identification}
      /> */}
    </>
  );
};

export default AddressInfomation;
