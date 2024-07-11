import React, { FC, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PizzaPage from "./pages/PizzaPage";

import "./App.css";

const App: FC = () => {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pizza/:id" element={<PizzaPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
