import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "react-use";
import { userDetail } from "../lib/api/UserApi";

export default function Home() {
  // menambahkan logic untuk melakukan pengecekan untuk user yang belum login
  // baik yang token expired atau pun user yang belum login sama sekali

  // menyiapkan data
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  // menggunakan use effect, untuk mengecek ketika terjadi perubahan pada suatu data
  useEffect(() => {
    // membuat async function
    // untuk mengecek apakah user sudah login
    async function checkLogin() {
      // mengecek kalau tidak ada token
      if (!token) {
        navigate({
          pathname: "/login",
        });
      }

      // jika token ada, cek token valid atau tidak (dengan menggunakan api untuk get data user)
      const response = await userDetail(token);

      // mengecek jika request berhasil
      if (response.ok) {
        // jika user valid, langsung redirect ke halaman dashboard
        navigate({
          pathname: "/dashboard/contacts",
        });
      } else {
        // jika user tidak valid, alias token sudah expired
        // maka hapus isi token di local storage
        setToken("");

        // dan redirect user untuk melakukan login kembali ke halaman login
        navigate({
          pathname: "/login",
        });
      }
    }

    // memanggil function checkLogin()
    checkLogin();
    // [] : digunakan agar react tidak merender ulang (agar tidak looping)
  }, []);

  return null;
}
