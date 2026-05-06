// membuat ajax api call untuk endpoint users

// call api untuk register user
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

// call api untuk login user
export const userLogin = async ({ username, password }) => {
  // memanggil endpoint untuk melakukan login oleh user
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

// call api untuk mendapatkan data user saat ini
// request body diberikan simbol : '{}'
// kalau token, langsung bisa di implementasikan seperti parameter
export const userDetail = async (token) => {
  // memanggil endpoint untuk mendapatkan data detail; user yang sedang login
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};

// call api untuk update user (hanya field name)
export const userUpdateProfile = async (token, { name }) => {
  // memanggil endpoint untuk update profil user
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    // request body optional untuk field name (sesuai spec backend)
    body: JSON.stringify({ name }),
  });
};

// call api untuk update user (hanya field password)
export const userUpdatePassword = async (token, { password }) => {
  // memanggil endpoint untuk update password user
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    // request body optional untuk field password (sesuai spec backend)
    body: JSON.stringify({ password }),
  });
};

// call api untuk logout user
export const userLogout = async (token) => {
  // memanggil endpoint untuk melakukan sign out oleh user
  return await fetch(`${import.meta.env.VITE_API_PATH}/users/logout`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};
