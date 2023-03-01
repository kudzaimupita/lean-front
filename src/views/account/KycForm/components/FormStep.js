import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "components/ui";
import { HiCheckCircle, HiLockClosed, HiDocument } from "react-icons/hi";
import useThemeClass from "utils/hooks/useThemeClass";
import { setCurrentStep } from "../store/stateSlice";
import { setStepStatus } from "../store/dataSlice";

const steps = [
  { label: "Asset Details", value: 0 },
  { label: "Media", value: 1 },
  { label: "Status", value: 2 },
  //   { label: "Financial Information", value: 3 },
];

const FormStep = ({ currentStep, currentStepStatus, stepStatus }) => {
  const { textTheme } = useThemeClass();
  const dispatch = useDispatch();
  const newSteps = useSelector(
    (state) => state.accountDetailForm.data.stepStatus
  );
  const onStepChange = (step) => {
    const selectedStepStatus = stepStatus[step].status;

    if (selectedStepStatus === "complete" || selectedStepStatus === "current") {
      dispatch(setCurrentStep(step));
      return;
    }

    if (step !== currentStep && step < currentStep) {
      if (currentStepStatus === "pending") {
        dispatch(setStepStatus("complete"));
      }
      dispatch(setCurrentStep(step));
    }
  };

  return (
    <Menu variant="transparent" className="px-2">
      {steps.map((step) => (
        <Menu.MenuItem
          key={step.value}
          eventKey={step.value.toString()}
          className={`mb-2`}
          onClick={() => {
            if (
              newSteps[2].status == "current" &&
              newSteps[1].status == "pending"
            ) {
              return;
            }

            onStepChange(step.value);
          }}
          isActive={currentStep === step.value}
        >
          <span className="text-2xl ltr:mr-2 rtl:ml-2">
            {stepStatus[step.value].status === "complete" && (
              <HiCheckCircle className={textTheme} />
            )}
            {stepStatus[step.value].status === "current" && (
              <HiCheckCircle className="text-gray-600" />
            )}
            {stepStatus[step.value].status === "pending" &&
              currentStep === step.value && (
                <HiCheckCircle className="text-gray-600" />
              )}
            {stepStatus[step.value].status === "pending" &&
              currentStep !== step.value && (
                <HiLockClosed className="text-gray-600" />
              )}
            {stepStatus[step.value].status === "invalid" && (
              <HiCheckCircle className="text-gray-600" />
            )}
          </span>
          <span>{step.label}</span>
        </Menu.MenuItem>
      ))}
    </Menu>
  );
};

export default FormStep;
