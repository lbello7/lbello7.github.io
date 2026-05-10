import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Spec from "./sections/Spec";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/globals.css";

function GlobalFallback() {
  return (
    <div className="min-h-screen bg-ivory text-obsidian flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="font-mono text-[11px] tracking-eyebrow uppercase text-brass-deep mb-4">
          ● KODA · 01
        </div>
        <h1 className="display-md text-[28px] mb-4">Something went wrong.</h1>
        <p className="text-warmgrey">
          The prototype hit an error while rendering. Try a hard refresh
          (<span className="font-mono">Cmd+Shift+R</span>) or open the page on a
          desktop browser. Open the browser console for the underlying error.
        </p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<GlobalFallback />}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/spec" element={<Spec />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
