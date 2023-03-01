import React, { useState, useCallback, Suspense, lazy } from "react";
import { Container } from "components/shared";

const Step1 = lazy(() => import("./components/Step1"));
const Step2 = lazy(() => import("./components/Step2"));
const Step3 = lazy(() => import("./components/Step3"));
const Step4 = lazy(() => import("./components/Step4"));
const QuickStart = lazy(() => import("./components/QuickStart"));

const Welcome = () => {
  const [surveyStep, setSurveyStep] = useState(0);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleTypeId, setVehicleTypeId] = useState("");
  const [fields, setFields] = useState([]);
  const [Asset, setAsset] = useState({});
  const handleNext = useCallback(() => {
    setSurveyStep(surveyStep + 1);
  }, [surveyStep]);

  const onNext = (values) => {
    // console.log({ ...values, ...Asset.asset });
    setAsset({ ...values, ...Asset.asset });
    handleNext();
  };

  const handleBack = useCallback(() => {
    setSurveyStep(surveyStep - 1);
  }, [surveyStep]);

  const handleBackBack = useCallback(() => {
    setSurveyStep(0);
  }, [surveyStep]);

  const handleSkip = () => {
    setSurveyStep(4);
  };

  return (
    <Container className="h-full">
      <div className="h-full flex flex-col items-center justify-center">
        <Suspense fallback={<></>}>
          {surveyStep === 0 && (
            <Step1
              setVehicleTypes={setVehicleTypes}
              onNext={onNext}
              onSkip={handleSkip}
            />
          )}
          {surveyStep === 1 && (
            <Step2
              onNext={onNext}
              setVehicleTypeId={setVehicleTypeId}
              vehicleTypes={vehicleTypes}
              onBack={handleBack}
            />
          )}
          {surveyStep === 2 && (
            <Step3
              handleBackBack={handleBackBack}
              asset={Asset}
              vehicleTypeId={vehicleTypeId}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {surveyStep === 3 && (
            <Step4 onNext={handleNext} onBack={handleBack} />
          )}
          {surveyStep === 4 && <QuickStart />}
        </Suspense>
      </div>
    </Container>
  );
};

export default Welcome;
