import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Auth = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      navigate("/");
    }
  }, [navigate]);

  const validateForm = () => {
    const errors = [];

    if (!username.trim()) {
      errors.push("Username cannot be empty");
    }

    if (!showLoginForm && password !== passwordConfirm) {
      errors.push("Passwords do not match");
    }

    if (errors.length) {
      setErrorMessage(errors.join("\n"));
      return false;
    }

    return true;
  };

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
    setErrorMessage("");
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setFirstName("");
    setLastName("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    const url = showLoginForm
      ? "http://localhost:8000/api/auth/token/"
      : "http://localhost:8000/api/auth/register/";

    try {
      const response = await axios.post(
        url,
        showLoginForm
          ? { username, password }
          : { username, password, firstName, lastName }
      );
      localStorage.setItem("token", response.data.access);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);
      } else if (error.response) {
        let message = "";
        const errorData = error.response.data;
        for (const field in errorData) {
          if (Object.prototype.hasOwnProperty.call(errorData, field)) {
            message += `${field}: ${errorData[field].join()}\n`;
          }
        }
        setErrorMessage(message);
      }
    }
  };

  return (
    <div className="authContainer">
      <div
        className={`authFormWrapper ${
          showLoginForm ? "loginForm" : "registerForm"
        }`}
      >
        <h3>{showLoginForm ? "Login" : "Register"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <input
              type="text"
              className="formControl"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <input
              type="password"
              className="formControl"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!showLoginForm && (
            <div className="formGroup">
              <input
                type="password"
                className="formControl"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
          )}
          {!showLoginForm && (
            <div className="formGroup">
              <input
                type="text"
                className="formControl"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          )}
          {!showLoginForm && (
            <div className="formGroup">
              <input
                type="text"
                className="formControl"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          )}
          <div className="formGroup">
            <button type="submit" className="authSubmitButton">
              {showLoginForm ? "Login" : "Register"}
            </button>
          </div>
        </form>
        {errorMessage && (
          <div className="errorCard">
            {errorMessage.split("\n").map((error, index) => (
              <p key={index}>&bull; {error}</p>
            ))}
          </div>
        )}
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
