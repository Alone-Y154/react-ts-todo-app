import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Todoprovider } from "./context/TodoContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Todoprovider>
        <App />
      </Todoprovider>
    </BrowserRouter>
  </React.StrictMode>
);
