// src/components/Address.js
import React from "react";

const Address = ({ nextStep, handleChange, values, prevStep }) => {
  const { address, city, state, zip } = values;
  const isFilled = !address || !city || !state || !zip;

  return (
    <div className="formStep">
      <h2>Step 2: Your Address</h2>
      <div className="formInputCon">
        <input
          type="text"
          placeholder="enter your address"
          value={address}
          required
          onChange={handleChange("address")}
        />
      </div>
      <div className="formInputCon">
        <input
          type="text"
          placeholder="enter your city"
          value={city}
          required
          onChange={handleChange("city")}
        />
      </div>
      <div className="formInputCon">
        <input
          type="text"
          placeholder="enter your state"
          value={state}
          required
          onChange={handleChange("state")}
        />
      </div>
      <div className="formInputCon">
        <input
          type="text"
          placeholder="enter your zip"
          value={zip}
          required
          onChange={handleChange("zip")}
        />
      </div>
      <div className="formButtonCon">
        <button onClick={prevStep}>Back</button>
        <button disabled={isFilled} onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Address;
