// src/components/PersonalInfo.js
import React from "react";

const PersonalInfo = ({ nextStep, handleChange, values }) => {
  const { name, email } = values;

  return (
    <div>
      <h2>Step 1: Personal Information</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange("name")} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={handleChange("email")} />
      </label>
      <br />
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default PersonalInfo;
