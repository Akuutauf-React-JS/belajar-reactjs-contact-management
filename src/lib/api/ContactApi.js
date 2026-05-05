// membuat ajax api call untuk endpoint contacts

// call api untuk create contact
export const contactCreate = async (token, { first_name, last_name, email, phone }) => {
  // memanggil endpoint untuk generate user baru
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
