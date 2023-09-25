import React from "react";
import ReactDOM from "react-dom/client";
import ImageState from "./context/ImageState.jsx";
import UserStates from "./context/User/userStates.jsx";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserStates>
        <ImageState>
          <App />
        </ImageState>
      </UserStates>
    </BrowserRouter>
  </React.StrictMode>
);
