import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { FinishLogin } from "./pages/FinishLogin";
import { Teams } from "./pages/Teams";
import { Events } from "./pages/Events";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/finishlogin" element={<FinishLogin />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </>
  );
}

export default App;
