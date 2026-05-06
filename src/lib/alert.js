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

export const alertConfirm = async (message) => {
  // memanggil sweet alert
  const result = await Swal.fire({
    icon: "question",
    title: "Are you sure?",
    text: message,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes",
    showCancelButton: true,
    cancelButtonText: "Cancel",
  });

  // return nya berupa boolean
  return result.isConfirmed;
};
