import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { userDetail } from "../../lib/api/UserApi";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  // sebagai global session protection untuk user yang belum login, maupun token expired
  // menyiapkan data
  const [token, setToken] = useLocalStorage("token", "");

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  // membuat use effect
  useEffect(() => {
    // membuat async function
    // untuk memvalidasi sesi user
    async function validateSession() {
      // mengecek kalau token kosong
      if (!token) {
        // jika tidak ada token, maka set loading menjadi false
        setLoading(false);
        return; // keluar dari function
      }

      // kalau token ditemukan, kemudian lakukan validasi ke backend dengan get data user current
      const response = await userDetail(token);

      // mengecek apakah request berhasil
      if (response.ok) {
        // jika berhasil, maka user berarti sudah login
        setIsAuth(true);
      } else {
        // jika token ada, namun user tidak valid, maka hapus isi token yang expired
        setToken("");
      }

      // ubah loading menjadi false, karena proses pengecekan session sudah selesai
      setLoading(false);
    }

    // panggil function validasi sebelumnya
    validateSession();

    // [] : validate cukup di panggil sekali dalam setiap halaman sebagai pengecekan
  }, []);

  // loading terlebih dahulu untuk menunggu proses pengecekan session user
  if (loading) {
    return <div>Loading ....</div>;
  }

  // melakukan pengecekan kembali, untuk kasus jika user belum login
  if (!isAuth) {
    // menggunakan replace, agar tidak bisa kembali ke halaman tertentu (tetap di halaman login)
    return <Navigate to="/login" replace />;
  }

  // kalau login berhasil, maka dilanjutkan dengan menampilkan isi dari content child
  return <Outlet></Outlet>;
}
