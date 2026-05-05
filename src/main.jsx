import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import UserRegister from "./components/User/UserRegister";
import UserLogin from "./components/User/UserLogin";
import DashboardLayout from "./components/DashboardLayout";
import UserProfile from "./components/User/UserProfile";
import UserLogout from "./components/User/UserLogout";
import ContactCreate from "./components/Contact/ContactCreate";

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
          <Route path="/login" element={<UserLogin />}></Route>
        </Route>

        {/* route auth */}
        {/* route auth diawali dengan path '/dashboard' */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* route khusus users */}
          <Route path="users">
            <Route path="profile" element={<UserProfile />}></Route>
            <Route path="logout" element={<UserLogout />}></Route>
          </Route>

          {/* route khusus contacts */}
          <Route path="contacts">
            <Route index element={<div>Contact</div>}></Route>
            <Route path="create" element={<ContactCreate />}></Route>
          </Route>
          
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
