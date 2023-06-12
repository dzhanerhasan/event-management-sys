import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/actions/userActions";
import NavItem from "./NavItem";

const SideBar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log(user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  if (!user) {
    return <div>Loading...</div>; // Or some loading spinner
  }

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
            Hello, {user.username}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column justify-content-between">
          <div>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <NavItem text="Home" linkTo="/" />
              <NavItem text="All Events" linkTo="/all-events" />
              <NavItem
                text="My Events"
                linkTo={`/user-profile/${user.username}`}
              />
              <NavItem text="Create an Event" linkTo="/create-event" />
            </ul>
          </div>
          <button onClick={handleLogout} className="btn mt-3 w-100">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
