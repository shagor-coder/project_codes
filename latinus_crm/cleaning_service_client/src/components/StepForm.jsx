// src/components/StepForm.js
import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo.jsx";
import ServiceDetails from "./ServiceDetail.jsx";
import Calendar from "./Calendar.jsx";
import Address from "./Address.jsx";
import { Progressbar } from "./Progressbar.jsx";

const StepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    serviceType: "",
    roomNumberAndSize: "",
    windows: "",
    moveInMoveOut: "",
    loadOfLaundry: "",
    pets: "",
    kitchenCleaning: "",
    fridgeCleaning: "",
    eachCabinet: "",
    additionalRoom: "",
    additionalBathRoom: "",
    hepa: "",
    wallsCleaning: "",
    totalPrice: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  switch (step) {
    case 1:
      return (
        <>
          <Progressbar step={step} />
          <PersonalInfo
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
          />
        </>
      );
    case 2:
      return (
        <>
          <Progressbar step={step} />

          <Address
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={formData}
          />
        </>
      );
    case 3:
      return (
        <>
          <Progressbar step={step} />

          <ServiceDetails
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            values={formData}
          />
        </>
      );
    case 4:
      return (
        <>
          <Progressbar step={step} />
          <Calendar prevStep={prevStep} values={formData} />
        </>
      );
    default:
      return null;
  }
};

export default StepForm;
