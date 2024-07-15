// src/components/ServiceDetails.js
import React from "react";

const ServiceDetails = ({ nextStep, prevStep, handleChange, values }) => {
  const { serviceType } = values;

  return (
    <div>
      <h2>Step 2: Service Details</h2>
      <label>
        Service Type:
        <input
          type="text"
          value={serviceType}
          onChange={handleChange("serviceType")}
        />
      </label>
      <br />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default ServiceDetails;
