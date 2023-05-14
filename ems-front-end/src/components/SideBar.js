import React, { useState, useEffect } from "react";
import axios from "axios";
import NavItem from "./NavItem";

const SideBar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          "http://localhost:8000/current-user/",
          config
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon text-white"></span>
      </button>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Hello, {username}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <NavItem text="Home" linkTo="/" />
            <NavItem text="All Events" linkTo="/all-events" />
            <NavItem text="My Events" linkTo="/my-events" />
            <NavItem text="Create an Event" linkTo="/create-event" />
          </ul>
          <button onClick={handleLogout} className="btn btn-danger mt-3 w-100">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
