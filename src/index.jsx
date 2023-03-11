import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ExpensessContextProvider } from "./Context/ExpensessContext";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ExpensessContextProvider>
      <App />
    </ExpensessContextProvider>
  </React.StrictMode>
);
