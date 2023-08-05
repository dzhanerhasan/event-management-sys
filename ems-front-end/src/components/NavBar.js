import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import flowerLogo from "../images/flower-logo.png";
import SideBar from "./SideBar";
import FriendRequests from "./FriendRequests";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar" style={{ backgroundColor: "#1e293b" }}>
      <div className="container-md">
        <a className="navbar-brand">
          <Link to="/">
            <img src={flowerLogo} alt="Daisy Pic" width="40vh" />
          </Link>
        </a>
        <div style={{ display: "flex", alignItems: "center" }}>
          {location.pathname !== "/login" && (
            <Link to="/groups">
              <FontAwesomeIcon
                icon={faUsers}
                color="white"
                size="2x"
                style={{ marginRight: "20px" }}
              />
            </Link>
          )}
          {location.pathname !== "/login" && <FriendRequests />}
          {location.pathname !== "/login" && <SideBar />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
