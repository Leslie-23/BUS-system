import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
// import App from './App.jsx'
import Login from "./pages/Login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <App /> */}
        <Login />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
