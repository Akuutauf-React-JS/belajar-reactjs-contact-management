import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import UserRegister from "./components/User/UserRegister";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* implementasi react router */}
    <BrowserRouter>
      <Routes>
        {/* routing dibagi menjadi 2 kelompok, user guest dan user auth */}
        {/* route guest */}

        {/* menambahkan layouting / template untuk guest */}
        <Route element={<Layout />}>
          <Route path="/register" element={<UserRegister />}></Route>
        </Route>

        {/* route auth */}
        {/* route auth diawali dengan path '/dashboard' */}
        <Route path="/dashboard"></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
