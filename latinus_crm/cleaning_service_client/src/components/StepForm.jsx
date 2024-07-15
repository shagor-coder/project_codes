// src/components/StepForm.js
import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo.jsx";
import ServiceDetails from "./ServiceDetail.jsx";
import Confirmation from "./Confirmation.jsx";
import Calendar from "./Calendar.jsx";

const StepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "",
    date: null,
    time: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  switch (step) {
    case 1:
      return (
        <PersonalInfo
          nextStep={nextStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 2:
      return (
        <ServiceDetails
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 3:
      return (
        <Confirmation
          nextStep={nextStep}
          prevStep={prevStep}
          values={formData}
        />
      );
    case 4:
      return <Calendar prevStep={prevStep} values={formData} />;
    default:
      return null;
  }
};

export default StepForm;
