import { Link } from "react-router-dom";

const NavItem = ({ text, linkTo }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={linkTo}>
        {text}
      </Link>
    </li>
  );
};

export default NavItem;
