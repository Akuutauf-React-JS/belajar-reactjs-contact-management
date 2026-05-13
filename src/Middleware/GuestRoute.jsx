import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { userDetail } from "../lib/api/UserApi";
import { Navigate, Outlet } from "react-router";

export default function GuestRoute() {
  // untuk melakukan pengecekan session bagi user yang sudah login
  // menyiapkan data
  const [token, setToken] = useLocalStorage("token", "");

  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // menggunakan use effect
  useEffect(() => {
    // membuat async funtion
    // untuk mengecek validasi session user
    async function validateSession() {
      // mengecek kalau tidak ada token (guest)
      if (!token) {
        // ubah data setloading jadi false (proses belum selesai)
        setLoading(false);

        return; // keluar dari pengecekan, lanjutkan kode dibawah
      }

      // jika token ada, cek user yang valid
      const response = await userDetail(token);

      // mengecek jika respose berhasil
      if (response.ok) {
        // berarti ada user yang aktif
        console.log("sudah login");
        setIsAuth(true);
      } else {
        // belum ada user aktif
        setToken(""); // hapus value token yang expired
      }

      // menyelesaikan loading, karena proses validasi sudah selesai
      setLoading(false);
    }

    // panggil fungi validate session
    validateSession();

    // [] : menjalankan pengecekan validasi session user sekali saat halaman di render
  }, []);

  // mengecek jika proses validasi sudah selesai
  if (loading) {
    return <div>Loading ....</div>;
  }

  // kalau sudah login
  if (isAuth) {
    // redirect ke halaman dashboard
    return <Navigate to="/dashboard/contacts" replace />;
  }

  // kalau belum login (guest)
  // diperbolehkan dan menampilkan content dari child
  return <Outlet></Outlet>;
}
