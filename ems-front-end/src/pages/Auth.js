import React, { useState } from "react";
import "../styles/Auth.css";

const Auth = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="authContainer">
      <div
        className={`authFormWrapper ${
          showLoginForm ? "loginForm" : "registerForm"
        }`}
      >
        <h3>{showLoginForm ? "Login" : "Register"}</h3>
        <form>
          <div className="formGroup">
            <input
              type="email"
              className="formControl"
              placeholder="Email Address"
            />
          </div>
          <div className="formGroup">
            <input
              type="password"
              className="formControl"
              placeholder="Password"
            />
          </div>
          {showLoginForm || (
            <div className="formGroup">
              <input
                type="text"
                className="formControl"
                placeholder="Username"
              />
            </div>
          )}
          <div className="formGroup">
            <button type="submit" className="authSubmitButton">
              {showLoginForm ? "Login" : "Register"}
            </button>
          </div>
        </form>
        <p>
          {showLoginForm
            ? "Don't have an account? "
            : "Already have an account? "}
          <span className="toggleAuthForm" onClick={toggleForm}>
            {showLoginForm ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
