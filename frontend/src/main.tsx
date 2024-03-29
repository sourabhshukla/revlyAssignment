import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "./utils/CustomSnackbar.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate
    >
      <SnackbarUtilsConfigurator />
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
