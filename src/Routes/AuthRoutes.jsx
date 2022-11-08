import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";

const AuthRoute = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoute;
