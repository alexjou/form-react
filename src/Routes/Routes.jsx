import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";

import UnauthRoutes from "./UnauthRoutes";
import AuthRoutes from "./AuthRoutes";

const Routes = () => {
  const { signed } = useContext(AuthContext);
  return <>{signed ? <AuthRoutes /> : <UnauthRoutes />}</>;
};

export default Routes;
