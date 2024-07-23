import { useEffect, useState } from "react";

export const Progressbar = ({ step }) => {
  const [progress, setProgress] = useState(step);

  const calculateProgress = (currentStep) => {
    return parseFloat(currentStep / 4).toFixed(2) * 100;
  };

  useEffect(() => {
    setProgress(parseInt(calculateProgress(step)));
  }, [step]);

  return (
    <div className="progressBar">
      <div
        style={{ width: `${progress}%` }}
        data-progress={progress + "%"}
        className="progressColor"
      ></div>
    </div>
  );
};
