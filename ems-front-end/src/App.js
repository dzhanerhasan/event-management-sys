import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventProvider } from "./contexts/EventContext";

import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import AllEvents from "./pages/AllEvents";
import CreateEvent from "./pages/CreateEvent";
import MyEvents from "./pages/MyEvents";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/all-events", element: <AllEvents /> },
      { path: "/create-event", element: <CreateEvent /> },
      { path: "/my-events", element: <MyEvents /> },
    ],
  },
]);

const App = () => {
  return (
    <EventProvider>
      <RouterProvider router={router} />
    </EventProvider>
  );
};

export default App;
