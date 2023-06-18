import "../styles/RootLayout.css";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFriends } from "../redux/actions/userActions";

const RootLayout = () => {
  const username = useSelector((state) => state?.user?.user.username);
  const friends = useSelector((state) => state.user.friends);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFriends(username));
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div className="main-content">
        <Outlet />
      </div>
      <Chat username={username} friends={friends} />
      <Footer />
    </>
  );
};

export default RootLayout;
