import React from "react";
import { BreadCrumb } from "../../../components";
import "react-data-table-component-extensions/dist/index.css";
import { Step, Stepper } from 'react-form-stepper';
import Step1 from "./step1";
import Step2 from "./step2";

function SetKomponenBiayaHarga() {
  const item = ["Home", "Referensi", "Komponen Biaya", "Set Harga Komponen Biaya"];
  const [activeStep, setActiveStep] = React.useState(1);

  const stepperStyleConfig = {
    activeBgColor: "#1A6EBA",
    activeTextColor: "#FFFFFF", completedBgColor: "#1A6EBA", completedTextColor: "#ffffff",
    borderRadius: "50%",
    circleFontSize: "1rem",
    fontWeight: "500", inactiveBgColor: "#e0e0e0", inactiveTextColor: "#ffffff", labelFontSize: "0.875rem", size: "2em"
  }

  const nextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const prevStep = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <>
      <BreadCrumb data={item} title={item[item.length - 1]} />
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        <div>
          <Stepper activeStep={activeStep} >
            <Step label="Export Data" disabled onClick={() => { setActiveStep(1) }} styleConfig={stepperStyleConfig} />
            <Step label="Import Data" disabled onClick={() => { setActiveStep(2) }} styleConfig={stepperStyleConfig} />
          </Stepper>
        </div>
      </div>
      <div className="m-5 p-5 bg-white shadow-sm rounded-sm">
        {activeStep === 1 ? (
          <Step1 nextStep={nextStep} />
        ) : activeStep === 2 ? <Step2 nextStep={nextStep} prevStep={prevStep} /> 
            : (null)}
      </div>
    </>
  );
}

export default SetKomponenBiayaHarga;
