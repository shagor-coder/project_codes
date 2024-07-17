// src/components/ServiceDetails.js
import React from "react";

const ServiceDetails = ({ nextStep, prevStep, handleChange, values }) => {
  const { serviceType, roomNumberAndSize } = values;

  const extraOptions = [
    { id: "windows", label: "Windows", quantityBased: true, isChecked: false },
    { id: "moveInMoveOut", label: "Move In / Move Out" },
    { id: "loadOfLaundry", label: "Load of Laundry" },
    { id: "pets", label: "Pets" },
    { id: "kitchenCleaning", label: "Kitchen cleaning" },
    { id: "fridgeCleaning", label: "Fridge cleaning" },
    {
      id: "eachCabinet",
      label: "Each cabinet",
      quantityBased: true,
      isChecked: false,
    },
    { id: "wallsCleaning", label: "Walls cleaning" },
    {
      id: "additionalRoom",
      label: "Additional Room",
      quantityBased: true,
      isChecked: false,
    },
    {
      id: "additionalBathRoom",
      label: "Additional Bathroom",
      quantityBased: true,
      isChecked: false,
    },
    { id: "hepa", label: "Post Construction Equipment HEPA" },
  ];

  const handleCheckboxChange = (id) => (e) => {
    handleChange(id)({
      target: {
        name: id,
        value: e.target.checked ? "1" : null,
      },
    });
  };

  const handleQuantityChange = (id) => (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      handleChange(id)({
        target: {
          name: id,
          value: value,
        },
      });
    } else {
      handleChange(id)({
        target: {
          name: id,
          value: "",
        },
      });
    }
  };

  return (
    <div className="formStep">
      <h2>Step 3: Service Details</h2>
      <div className="formInputCon">
        <select
          name="serviceType"
          value={serviceType}
          onChange={handleChange("serviceType")}
        >
          <option value="Regular Clean">Regular Clean</option>
          <option value="Deep Cleaning">Deep Cleaning</option>
          <option value="Professional Deep Clean">
            Professional Deep Clean
          </option>
          <option value="Cleaning Services Airbnb">
            Cleaning Services Airbnb
          </option>
          <option value="After Party Clean Up">After Party Clean Up</option>
          <option value="Balcony">Balcony</option>
        </select>
      </div>

      <div className="formInputCon">
        <select
          name="roomNumberAndSize"
          value={roomNumberAndSize}
          onChange={handleChange("roomNumberAndSize")}
        >
          <option value="600 sqft - 1 Room">600 sqft - 1 Room</option>
          <option value="601 - 800 sqft - 1 Room">
            601 - 800 sqft - 1 Room
          </option>
          <option value="601 - 1000 sqft - 1 Room">
            601 - 1000 sqft - 1 Room
          </option>
          <option value="1001 - 1200 sqft - 2 Room">
            1001 - 1200 sqft - 2 Room
          </option>
          <option value="1201 - 1500 sqft - 2 Room">
            1201 - 1500 sqft - 2 Room
          </option>
          <option value="1501 - 1800 sqft - 2 Room">
            1501 - 1800 sqft - 2 Room
          </option>
          <option value="1801 - 2000 sqft - 3 Room">
            1801 - 2000 sqft - 3 Room
          </option>
          <option value="2001 - 2500 sqft - 4 Room">
            2001 - 2500 sqft - 4 Room
          </option>
          <option value="2501 - 3000 sqft - 3 Room">
            2501 - 3000 sqft - 3 Room
          </option>
          <option value="3001 - 3500 sqft - 5 Room">
            3001 - 3500 sqft - 5 Room
          </option>
          <option value="3500 - 5000 sqft - 6 Room">
            3500 - 5000 sqft - 6 Room
          </option>
        </select>
      </div>

      <div className="formInputCon">
        {extraOptions.map((extra) => (
          <div className="extraOption" key={extra.id}>
            <input
              type="checkbox"
              checked={values[extra.id] || false}
              onChange={handleCheckboxChange(extra.id)}
            />
            <span className="optionText">{extra.label}</span>
            {extra.quantityBased && values[extra.id] && (
              <input
                type="number"
                value={values[`${extra.id}`] || "1"}
                onChange={handleQuantityChange(`${extra.id}`)}
                placeholder="Enter quantity"
                className="quantity-input"
                min="1"
                max="10"
              />
            )}
          </div>
        ))}
      </div>

      <div className="formButtonCon">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Confirm</button>
      </div>
    </div>
  );
};

export default ServiceDetails;
