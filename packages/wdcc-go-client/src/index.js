import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { IndexPage } from "./pages/IndexPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { LoadingIcon } from "./components/LoadingIcon";
import { ClientDatastore } from "./adapters/client.datastore";

const Redirect = () => {
  const location = useLocation();

  useEffect(() => {
    ClientDatastore.getInstance()
      .getRedirects()
      .then((redirects) => {
        const key = location.pathname.replace("/", "").toLocaleLowerCase();
        window.location = redirects[key] ?? "/";
      });
  }, []);

  return (
    <div className="bg-wdcc-blue-100 h-screen flex items-center justify-center">
      <LoadingIcon />
    </div>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/*" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Router />);
