import React from "react";

const InputField = ({
  type,
  id,
  label,
  value,
  onChange,
  invalidFeedback,
  validation,
}) => {
  return (
    <div className={`mb-3 ${validation ? "has-validation" : ""}`}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={`form-control ${validation ? "is-invalid" : ""}`}
        id={id}
        value={value}
        onChange={onChange}
      />
      {validation && <div className="invalid-feedback">{invalidFeedback}</div>}
    </div>
  );
};

export default InputField;
