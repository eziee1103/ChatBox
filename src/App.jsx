import { useState } from "react";

import "./App.css";
import Form from "./modules/Form/Index";
import DashBoard from "./modules/Dashboard/Index";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const ProtectedRoutes = ({ children, auth = false }) => {
    const isloggedIn = localStorage.getItem("user:token") !== null || false;
    if (!isloggedIn && auth) {
      return <Navigate to={"/signup"} />;
    } else if (
      isloggedIn &&
      ["/signin", "/signup"].includes(window.location.pathname)
    ) {
      console.log("<<object");
      return <Navigate to={"/"} />;
    }

    return children;
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes auth={true}>
              <DashBoard />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <ProtectedRoutes>
              <Form isSignInPage={true} />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <ProtectedRoutes>
              <Form />
            </ProtectedRoutes>
          }
        ></Route>
      </Routes>
      {/* <div className="flex justify-center items-center bg-[#e1edff] h-screen"> */}
      {/* <Form /> */}
      {/* <DashBoard /> */}
      {/* </div> */}
    </>
  );
}

export default App;
