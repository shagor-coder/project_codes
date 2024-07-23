// src/components/PersonalInfo.js
import React from "react";

const PersonalInfo = ({ nextStep, handleChange, values }) => {
  const { firstName, lastName, email, phone } = values;

  const isFilled = !firstName || !lastName || !email || !phone;

  return (
    <div className="formStep">
      <h2>Step 1: Personal Information</h2>
      <div className="formInputCon">
        <input
          required
          type="text"
          placeholder="enter your first name"
          value={firstName}
          onChange={handleChange("firstName")}
        />
      </div>
      <div className="formInputCon">
        <input
          required
          type="text"
          placeholder="enter your last name"
          value={lastName}
          onChange={handleChange("lastName")}
        />
      </div>
      <div className="formInputCon">
        <input
          required
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={handleChange("email")}
        />
      </div>
      <div className="formInputCon">
        <input
          required
          type="text"
          placeholder="enter your phone with code"
          value={phone}
          onChange={handleChange("phone")}
        />
      </div>
      <div className="formButtonCon">
        <button disabled={isFilled} onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
