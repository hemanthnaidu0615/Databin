import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import "../public/themes/nova/theme.css";
// import "primereact/resources/themes/vela-blue/theme.css";
// import "primereact/resources/themes/viva-light/theme.css";
import "primereact/resources/themes/lara-light-green/theme.css";
// import "primereact/resources/themes/saga-purple/theme.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
