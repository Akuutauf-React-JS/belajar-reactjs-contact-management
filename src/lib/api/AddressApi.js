// membuat ajax api call untuk endpoint address

// call api untuk mendapatkan data list address, berdasarkan id (contact id)
export const addressList = async (token, id) => {
  // endpoint api untuk get data list address
  const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`);

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

// call api untuk mengambil data address berdasarkan contactId, dan addressId
export const addressDetail = async (token, contactId, addressId) => {
  // memanggil endpoint untuk menghapus data contact berdasarkan id
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}/addresses/:${addressId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};

// call api untuk create address, berdasarkan id
export const addressCreate = async (token, id, { street, city, province, country, postal_code }) => {
  // memanggil endpoint untuk create address baru
  return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ street, city, province, country, postal_code }),
  });
};
