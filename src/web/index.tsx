import { useAtom } from "jotai";
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import RecentFiles from "./routes/RecentFiles";
import Settings from "./routes/Settings";
import "@master/css";

createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/recent_files" element={<RecentFiles />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
