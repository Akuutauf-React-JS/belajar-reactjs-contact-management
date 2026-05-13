import { useEffect, useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDelete, contactList } from "../../lib/api/ContactApi";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";
import { Link } from "react-router";
import ContactPagination from "./ui/ContactPagination";
import SearchContactForm from "./ui/SearchContactForm";

export default function ContactList() {
  // menyiapkan data state yang diperlukan
  const [token] = useLocalStorage("token", "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // untuk pagination
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1); // total page diperoleh dari backend
  const [reload, setReload] = useState(false); // untuk menangani pagination yang telat reload data state nya

  // untuk menyimpan data hasil pencarian kontak
  const [contacts, setContacts] = useState([]);

  // membuat event handler untuk pagination
  function getPages() {
    const pages = [];

    // melakukan perulangan sejumlah banyaknya data total page (dari data state)
    // misalnya total page dari data state adalah 3, maka otomatis pagination nya terdapat 3 halaman
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // membuat async funtion
  // untuk search form
  async function handleSearchContacts(e) {
    // mencegah agar tidak terjadi reload
    e.preventDefault();

    // ketika terjadi aksi pencarian data berdasarkan query parameter, maka semua nya dijadikan 1 halaman
    setPage(1);

    // cukup memanggil function fetch contacts
    await fetchContacts();
  }

  // untuk next dan previous dari pagination
  async function handlePageChange(page) {
    setPage(page); // mengubah page sesuai dengan page baru, yang dipilih oleh pengguna
    setReload(!reload); // yang artinya, ketika terjadi perubahan halaman, maka akan otomatis mengubah data contacts dengan use Effect
  }

  // untuk mendapatkan data contact pada saat halaman di render (meskipun terjadi perubahan data state)
  async function fetchContacts() {
    // mendapatkan response dari api
    const response = await contactList(token, { name, email, phone, page });

    // mendapatkan response body
    const responseBody = await response.json();
    console.log(responseBody);

    // melakukan pengecekan, jika api berhasi
    if (response.ok) {
      // jika berhasil ubah data state contacts
      setContacts(responseBody.data); // array
      setTotalPage(responseBody.paging.total_page); // set total page sesuai dari response backend
    } else {
      await alertError(responseBody.errors);
    }
  }

  // untuk melakukan delete contact
  async function handleContactDelete(id) {
    // melakukan pengecekan
    if (!(await alertConfirm("Are you sure, you want to delete this contact?"))) {
      // kalau tidak jadi, maka kembali
      return;
    }

    // memanggil api delete
    const response = await contactDelete(token, { id });

    // mendapatkan response body
    const responseBody = await response.json();
    console.log(responseBody);

    // mengecek jika berhasi
    if (response.ok) {
      // menampilkan alert sukses untuk hapus data contact
      await alertSuccess("Contact deleted successfully");
      setReload(!reload); // mereload seluruh data list contact
    } else {
      await alertError(responseBody.errors);
    }
  }

  // menggunakan useEffect
  useEffect(() => {
    // untuk mendapatkan data contact, ketika terjadi perubahan pada search form
    fetchContacts().then(() => console.log("Contacts fetched"));
    // [] : hanya jalan sekali pada saat pertama kali di render
    // reload, use effect akan dijalankan, kalau data state reload berubah
  }, [reload]);

  // menggunakan use effect once, untuk menjalankan kode javascript saat halaman pertama kali di render
  useEffectOnce(() => {
    // sehingga tidak perlu lagi menggunakan DOM Content loaded
    const toggleButton = document.getElementById("toggleSearchForm");
    const searchFormContent = document.getElementById("searchFormContent");
    const toggleIcon = document.getElementById("toggleSearchIcon");

    // Add transition for smooth animation
    searchFormContent.style.transition = "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
    searchFormContent.style.overflow = "hidden";
    searchFormContent.style.maxHeight = "0px";
    searchFormContent.style.opacity = "0";
    searchFormContent.style.marginTop = "0";

    // function add event listener di pindah
    function toggleSearchForm() {
      if (searchFormContent.style.maxHeight !== "0px") {
        // Hide the form
        searchFormContent.style.maxHeight = "0px";
        searchFormContent.style.opacity = "0";
        searchFormContent.style.marginTop = "0";
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
      } else {
        // Show the form
        searchFormContent.style.maxHeight = searchFormContent.scrollHeight + "px";
        searchFormContent.style.opacity = "1";
        searchFormContent.style.marginTop = "1rem";
        toggleIcon.classList.remove("fa-chevron-down");
        toggleIcon.classList.add("fa-chevron-up");
      }
    }

    // kemudian dipanggil di bawah sini
    toggleButton.addEventListener("click", toggleSearchForm);

    // untuk mengaktifkan show/hide form search
    return () => {
      toggleButton.removeEventListener("click", toggleSearchForm);
    };
  });

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <i className="fas fa-users text-blue-400 text-2xl mr-3" />
          <h1 className="text-2xl font-bold text-white">My Contacts</h1>
        </div>

        {/* reusable component: search contact form */}
        <SearchContactForm name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} onSubmit={handleSearchContacts}></SearchContactForm>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Contact Card */}
          <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
            <Link to="/dashboard/contacts/create" className="block p-6 h-full">
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <i className="fas fa-user-plus text-3xl text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">Create New Contact</h2>
                <p className="text-gray-300">Add a new contact to your list</p>
              </div>
            </Link>
          </div>

          {/* Contact Card Looping */}
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
              <div className="p-6">
                <Link to={`/dashboard/contacts/${contact.id}/`} className="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                      <i className="fas fa-user text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">
                      {contact.first_name} {contact.last_name}
                    </h2>
                  </div>
                  <div className="space-y-3 text-gray-300 ml-2">
                    <p className="flex items-center">
                      <i className="fas fa-user-tag text-gray-500 w-6" />
                      <span className="font-medium w-24">First Name:</span>
                      <span>{contact.first_name}</span>
                    </p>
                    <p className="flex items-center">
                      <i className="fas fa-user-tag text-gray-500 w-6" />
                      <span className="font-medium w-24">Last Name:</span>
                      <span>{contact.last_name}</span>
                    </p>
                    <p className="flex items-center">
                      <i className="fas fa-envelope text-gray-500 w-6" />
                      <span className="font-medium w-24">Email:</span>
                      <span>{contact.email}</span>
                    </p>
                    <p className="flex items-center">
                      <i className="fas fa-phone text-gray-500 w-6" />
                      <span className="font-medium w-24">Phone:</span>
                      <span>{contact.phone}</span>
                    </p>
                  </div>
                </Link>
                <div className="mt-4 flex justify-end space-x-3">
                  <Link
                    to={`/dashboard/contacts/${contact.id}/edit`}
                    className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                  >
                    <i className="fas fa-edit mr-2" /> Edit
                  </Link>
                  <button
                    onClick={() => handleContactDelete(contact.id)}
                    className="px-4 py-2 bg-linear-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                  >
                    <i className="fas fa-trash-alt mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* reusable component: contact pagination */}
        <ContactPagination page={page} totalPage={totalPage} onClick={handlePageChange} getPages={getPages}></ContactPagination>
      </div>
    </>
  );
}
