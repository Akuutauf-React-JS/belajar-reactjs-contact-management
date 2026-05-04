// membuat ajax api call
// membutuhkan parameter sesuai dengan kebutuhan API (POST /api/users)
export const userRegister = async ({ username, password, name }) => {
  // untuk fetch endpoint API, disarankan menggunakan file environtment (.env)
  // agar ketika endpoint/url backend berubah, kita cukup ganti di file .env saja

  // memanggil endpoint untuk generate user baru
  return await fetch(`${import.meta.env.VITE_API_PATH}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password, name }),
  });
};
