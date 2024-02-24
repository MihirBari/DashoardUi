import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";




const root = document.getElementById("root") || document.createElement("div");
const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>

    <App />
 
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);