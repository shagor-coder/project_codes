// src/components/PersonalInfo.js
import React from "react";

const PersonalInfo = ({ nextStep, handleChange, values }) => {
  const { firstName, lastName, email, phone } = values;

  return (
    <div>
      <h2>Step 1: Personal Information</h2>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={handleChange("firstName")}
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          value={lastName}
          onChange={handleChange("lastName")}
        />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={handleChange("email")} />
      </label>
      <label>
        Phone:
        <input type="text" value={phone} onChange={handleChange("phone")} />
      </label>
      <br />
      <button onClick={nextStep}>Proceed!</button>
    </div>
  );
};

export default PersonalInfo;
