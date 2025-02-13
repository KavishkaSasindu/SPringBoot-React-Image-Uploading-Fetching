import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateVehicle from "./pages/CreateVehicle";
import Navbar from "./components/Navbar";
import AllData from "./pages/AllData";
import ViewOneData from "./pages/ViewOneData";
import UpdateData from "./pages/UpdateData";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateVehicle />} />
          <Route path="/allData" element={<AllData />} />
          <Route path="/vehicleOne/:id" element={<ViewOneData />} />
          <Route path="/update/:id" element={<UpdateData />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
