import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import SearchContextProvider from "./context/SearchContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </React.StrictMode>
);
