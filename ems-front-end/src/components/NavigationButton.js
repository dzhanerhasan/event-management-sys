import React from "react";

const NavigationButton = ({ direction, onClick, disabled }) => {
  return (
    <button
      className="btn mx-2 arrow-btn"
      style={{ backgroundColor: "#fcd34d" }}
      onClick={onClick}
      disabled={disabled}
    >
      {direction === "prev" ? "← Previous" : "Next →"}
    </button>
  );
};

export default NavigationButton;
