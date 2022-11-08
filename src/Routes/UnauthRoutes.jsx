import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";
import SignUp from "../Pages/SignUp";

const UnauthRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/criarConta" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UnauthRoutes;
