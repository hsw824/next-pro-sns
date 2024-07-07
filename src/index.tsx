import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const app = createRoot(document.getElementById("app") as HTMLElement);
console.log("실행이 되나?");
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
