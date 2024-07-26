// src/components/Confirmation.js
import axios from "axios";
import React, { useState } from "react";

const Confirmation = () => {
  const data = JSON.parse(localStorage.getItem("user_data"));
  const { firstName, lastName, email, phone, totalPrice, serviceType } = data;
  const [loading, setLoading] = useState(false);

  const createSession = () => {
    setLoading(true);
    axios
      .post("http://localhost:3000/api/session", {
        firstName,
        lastName,
        email,
        phone,
        totalPrice,
      })
      .then((response) => {
        setLoading(true);
        const { url } = response.data.data;
        window.open(url, "_self");
      })
      .catch((err) => console.log(err), setLoading(false));
  };

  return (
    <div className="formStep">
      <h2>Step 3: Confirmation</h2>
      <div className="previewInfo">
        <p className="info">
          Name: {firstName} {lastName}
        </p>
        <p className="info">Email: {email}</p>
        <p className="info">Service: {serviceType}</p>
        <p className="info">Amount To Pay: ${totalPrice}</p>
      </div>
      <div className="formButtonCon">
        <button disabled={loading} onClick={createSession}>
          {!loading ? `Proceed to pay $${totalPrice}` : `Please wait...`}
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
