import { useLocation } from "react-router-dom";
import flowerLogo from "../images/flower-logo.png";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar" style={{ backgroundColor: "#1e293b" }}>
      <div className="container-md">
        <a class="navbar-brand">
          <Link to="/">
            <img src={flowerLogo} alt="Daisy Pic" width="40vh" />
          </Link>
        </a>
        {location.pathname !== "/login" && <SideBar />}
      </div>
    </nav>
  );
};

export default NavBar;
