import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import AllEvents from "./pages/AllEvents";
import CreateEvent from "./pages/CreateEvent";
import UserProfile from "./pages/UserProfile";
import EventDetails from "./pages/EventDetails";
import Auth from "./pages/Auth";
import Groups from "./pages/Groups";
import Group from "./pages/Group";

const isAuthenticated = () => !!localStorage.getItem("token");

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  return isAuthenticated() ? children : null;
};

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  return !isAuthenticated() ? children : null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Auth />
          </PublicRoute>
        ),
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-events",
        element: (
          <PrivateRoute>
            <AllEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "/create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/user-profile/:username",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/event/:eventId",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/groups",
        element: (
          <PrivateRoute>
            <Groups />
          </PrivateRoute>
        ),
      },
      {
        path: "/group/:groupId",
        element: (
          <PrivateRoute>
            <Group />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
