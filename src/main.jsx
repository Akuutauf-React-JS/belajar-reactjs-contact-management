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
import ContactList from "./components/Contact/ContactList";
import ContactEdit from "./components/Contact/ContactEdit";
import ContactDetail from "./components/Contact/ContactDetail";
import AddressCreate from "./components/Address/AddressCreate";
import AddressEdit from "./components/Address/AddressEdit";

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
            <Route index element={<ContactList />}></Route>
            <Route path="create" element={<ContactCreate />}></Route>

            {/* route nested contact detail */}
            <Route path=":id">
              <Route index element={<ContactDetail />}></Route>
              <Route path="edit" element={<ContactEdit />}></Route>

              {/* route nested address */}
              <Route path="addresses">
                <Route path="create" element={<AddressCreate />}></Route>

                {/* kita gunakan alias id yang baru, karena sebelumnya sudah menggunakan route alias "id" */}
                <Route path=":addressId/edit" element={<AddressEdit />}></Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
