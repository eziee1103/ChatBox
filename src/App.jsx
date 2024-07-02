import { useState } from "react";

import "./App.css";
import Form from "./modules/Form/Index";
import DashBoard from "./modules/Dashboard/Index";

function App() {
  return (
    <>
      <div className="flex justify-center items-center bg-[#e1edff] h-screen">
        {/* <Form /> */}
        <DashBoard />
      </div>
    </>
  );
}

export default App;
