import { useNavigate } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { userLogout } from "../../lib/api/UserApi";
import { alertError } from "../../lib/alert";

export default function UserLogout() {
  // halaman logout berfungsi sebagai, hapus data token, lalu redirect ke halaman login
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();

  // membuat async function
  async function handleLogout() {
    const response = await userLogout(token);

    // simpan dan tampilkan response body ke console browser
    const responseBody = await response.json();
    console.log(responseBody);

    // mengecek jika tidak terjadi error
    if (response.ok) {
      // lalu set token dari local storage menjadi kosong (menghapus token)
      setToken("");

      // kemudian lakukan redirect ke halaman login
      await navigate({
        pathname: "/login",
      });
    } else {
      await alertError(responseBody.errors);
    }
  }

  // karena komponen user logout tidak memiliki halaman, maka event handler dijalankan dengan use effect
  useEffectOnce(() => {
    // memanggil handle logout (dengan promise)
    handleLogout().then(() => console.log("User logged out successfully"));
  });

  return <></>;
}
