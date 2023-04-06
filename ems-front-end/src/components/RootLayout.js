import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles/RootLayout.css";

const RootLayout = () => {
  return (
    <>
      <NavBar />

      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
