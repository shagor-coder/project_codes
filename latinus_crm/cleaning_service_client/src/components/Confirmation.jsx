// src/components/Confirmation.js
import React from "react";

const Confirmation = ({ nextStep, prevStep, values }) => {
  return (
    <div className="formStep">
      <h2>Step 3: Confirmation</h2>
      <div className="previewInfo">
        {Object.entries(values).map(([key, value]) => (
          <p className="info" key={key}>
            {key}: {value}
          </p>
        ))}
      </div>
      <div className="formButtonCon">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Confirm</button>
      </div>
    </div>
  );
};

export default Confirmation;
