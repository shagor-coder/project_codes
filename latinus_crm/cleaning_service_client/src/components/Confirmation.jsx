// src/components/Confirmation.js
import React from "react";

const Confirmation = ({ nextStep, prevStep, values }) => {
  const { name, email, serviceType } = values;

  return (
    <div>
      <h2>Step 3: Confirmation</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Service Type: {serviceType}</p>
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Confirm</button>
    </div>
  );
};

export default Confirmation;
