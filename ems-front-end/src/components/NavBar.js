import { useLocation } from "react-router-dom";
import flowerLogo from "../images/flower-logo.png";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import FriendRequests from "./FriendRequests";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar" style={{ backgroundColor: "#1e293b" }}>
      <div className="container-md">
        <div className="d-flex align-items-center">
          <a className="navbar-brand">
            <Link to="/">
              <img src={flowerLogo} alt="Daisy Pic" width="40vh" />
            </Link>
          </a>
          <form className="d-flex ms-2 me-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {location.pathname !== "/login" && <FriendRequests />}
          {location.pathname !== "/login" && <SideBar />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
