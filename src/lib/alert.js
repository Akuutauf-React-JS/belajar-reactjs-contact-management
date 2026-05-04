import Swal from "sweetalert2";

// library digunakan agar nanti bisa kita panggil langsung, tanpa harus mengulangi kode
// return dari function alert yang kita buat adalah promise, sehingga kita perlu menggunakan async
export const alertSuccess = async (message) => {
  // memanggil sweet alert
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
  });
};

export const alertError = async (message) => {
  // memanggil sweet alert
  return Swal.fire({
    icon: "error",
    title: "Ups",
    text: message,
  });
};
