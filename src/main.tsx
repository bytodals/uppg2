import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { TaskProvider } from "./context/TaskContext";

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>
);