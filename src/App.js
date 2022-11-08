import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { initializeFirebase } from "./Firebase/config";
import env from "./Firebase/env.json";
import Routes from "./Routes/Routes";
import Footer from "./utils/Footer";

function App() {
  initializeFirebase(env);
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
