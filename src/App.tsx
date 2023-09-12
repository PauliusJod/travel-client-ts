import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AppRoutes from "./AppRoutes";
// import Profile from "./components/Profile";
import { Layout } from "./components/Layout";
import "./custom.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
function App() {
  const Home = lazy(() =>
    import("./components/Home").then((module) => ({ default: module.Home }))
  );
  const Profile = lazy(() =>
    import("./components/Profile").then((module) => ({
      default: module.default,
    }))
  );
  const Login = lazy(() =>
    import("./components/Login").then((module) => ({ default: module.default }))
  );
  const Register = lazy(() =>
    import("./components/Register").then((module) => ({
      default: module.default,
    }))
  );
  return (
    <div style={{ minHeight: "95vh" }}>
      <Router>
        <Layout>
          <Suspense
            fallback={
              <div className="d-flex justify-content-md-center">
                <div className="hourglassBackground">
                  <div className="hourglassContainer">
                    <div className="hourglassCurves"></div>
                    <div className="hourglassCapTop"></div>
                    <div className="hourglassGlassTop"></div>
                    <div className="hourglassSand"></div>
                    <div className="hourglassSandStream"></div>
                    <div className="hourglassCapBottom"></div>
                    <div className="hourglassGlass"></div>
                  </div>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

{
  /* {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })} */
}
