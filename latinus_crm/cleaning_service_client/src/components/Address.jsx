// src/components/Address.js
import React from "react";

const Address = ({ nextStep, handleChange, values }) => {
  const { address, city, state, zip } = values;

  return (
    <div>
      <h2>Step 1: Your Address</h2>
      <label>
        Address:
        <input type="text" value={address} onChange={handleChange("address")} />
      </label>
      <label>
        City:
        <input type="text" value={city} onChange={handleChange("city")} />
      </label>
      <br />
      <label>
        State:
        <input type="text" value={state} onChange={handleChange("state")} />
      </label>
      <label>
        Zip:
        <input type="text" value={zip} onChange={handleChange("zip")} />
      </label>
      <br />
      <button onClick={nextStep}>Proceed!</button>
    </div>
  );
};

export default Address;
