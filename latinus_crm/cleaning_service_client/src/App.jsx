// src/App.js
import React from "react";
import StepForm from "./components/StepForm.jsx";
import { Route, Routes } from "react-router-dom";
import Confirmation from "./components/Confirmation.jsx";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StepForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  );
};

export default App;
