// membuat ajax api call untuk endpoint contacts

// call api untuk create contact
export const contactCreate = async (token, { first_name, last_name, email, phone }) => {
  // memanggil endpoint untuk create contact baru
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ first_name, last_name, email, phone }),
  });
};

// call api untuk mendapatkan data list contact
export const contactList = async (token, { name, email, phone, page }) => {
  // karena query parameter (name, email, phone) bersifat optional, maka perlu dibuatkan url yang dinamis
  const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts`);

  // melakukan pengecekan
  // jika query parameter memiliki isi dari 4 optional tadi, maka akan menambahkan search parameter di url sebelumnya
  if (name) url.searchParams.append("name", name);
  if (email) url.searchParams.append("email", email);
  if (phone) url.searchParams.append("phone", phone);
  if (page) url.searchParams.append("page", page);

  // memanggil endpoint untuk mendapatkan list data contact, berdasarkan query parameter
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
  });
};

// call api untuk mengambil data contact berdasarkan id
export const contactDetail = async (token, id) => {
  // memanggil endpoint untuk mengambil data contact berdasarkan id
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};

// call api untuk mengubah data contact
export const contactUpdate = async (token, { id, first_name, last_name, email, phone }) => {
  // memanggil endpoint untuk update contact
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ first_name, last_name, email, phone }),
  });
};

// call api untuk hapus data contact
export const contactDelete = async (token, { id }) => {
  // memanggil endpoint untuk menghapus data contact berdasarkan id
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};
