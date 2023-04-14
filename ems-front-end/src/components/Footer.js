import "../styles/Footer.css";

import React from "react";

const Footer = () => {
  return (
    <footer
      className="footer mt-auto py-3"
      style={{ backgroundColor: "#1e293b" }}
    >
      <div className="container">
        <span className="text-white">
          ©2023 Event Planning System for PU Exam created by Dzhaner Hasan. All
          Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
