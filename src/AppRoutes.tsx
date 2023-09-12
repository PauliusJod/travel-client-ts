import { Home } from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
// import OldProfile from "./components/OldProfile";
import Profile from "./components/Profile";
const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  // {
  //   path: "/oldprofile",
  //   element: <OldProfile />,
  // },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default AppRoutes;
