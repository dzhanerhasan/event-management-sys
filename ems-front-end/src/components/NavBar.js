import flowerLogo from "../images/flower-logo.png";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar" style={{ backgroundColor: "#1e293b" }}>
      <div className="container-md">
        <a class="navbar-brand">
          <Link to="/">
            <img src={flowerLogo} alt="Daisy Pic" width="40vh" />
          </Link>
        </a>
        <SideBar />
      </div>
    </nav>
  );
};

export default NavBar;
