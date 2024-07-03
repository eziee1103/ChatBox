import { useState } from "react";

import "./App.css";
import Form from "./modules/Form/Index";
import DashBoard from "./modules/Dashboard/Index";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const ProtectedRoutes = ({ children }) => {
    const isloggedIn = localStorage.getItem("user:token") !== null;
    // if (!isloggedIn) {
    //   return <Navigate to={"/signup"} />;
    // }
    return children;
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <DashBoard />
            </ProtectedRoutes>
          }
        ></Route>
        <Route path="/signin" element={<Form isSignInPage />}></Route>
        <Route path="/signup" element={<Form />}></Route>
      </Routes>
      {/* <div className="flex justify-center items-center bg-[#e1edff] h-screen"> */}
      {/* <Form /> */}
      {/* <DashBoard /> */}
      {/* </div> */}
    </>
  );
}

export default App;
