import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const rootDefault = document.getElementById("root");

if (rootDefault) {
  createRoot(rootDefault).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Press F to pay respects");
}
