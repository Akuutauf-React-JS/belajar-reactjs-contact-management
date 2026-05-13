import { useState } from "react";
import { Link, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDetail, contactUpdate } from "../../lib/api/ContactApi";
import { alertError, alertSuccess } from "../../lib/alert";
import ContactForm from "./ui/ContactForm";

export default function ContactEdit() {
  // menyiapkan data yang dibutuhkan
  const [token] = useLocalStorage("token", "");
  const { id } = useParams(); // mengambil data id melalui parameter

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // async function
  async function fetchContact() {
    // berhubung ini halaman untuk update, maka yang perlu kita lakukan saat pertamakali load halaman ada fetch data contact
    const response = await contactDetail(token, id);

    // mengambil response body dan menampilkannya di console
    const responseBody = await response.json();
    console.log(responseBody);

    // melakukan pengecekan jika response ok
    if (response.ok) {
      // jika berhasil, set seluruh data state
      setFirstName(responseBody.data.first_name);
      setLastName(responseBody.data.last_name);
      setEmail(responseBody.data.email);
      setPhone(responseBody.data.phone);
    } else {
      await alertError(responseBody.errors);
    }
  }

  // untuk handle submit
  async function handleSubmit(e) {
    e.preventDefault(); // mencegah tidak reload saat submit

    // melakukan update dari hit api ke backend
    const response = await contactUpdate(token, { id, first_name, last_name, email, phone });
    const responseBody = await response.json();
    console.log(responseBody);

    // mengecek jika berhasil
    if (response.ok) {
      await alertSuccess("Contact updated successfully");
    } else {
      await alertError(responseBody.errors);
    }
  }

  // cukup load data api, saat pertamakali halaman di render
  useEffectOnce(() => {
    // panggil ke dalam bentuk promise
    fetchContact().then(() => console.log("Contact detail fetched successfully"));
  });

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <Link to="/dashboard/contacts" className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
            <i className="fas fa-arrow-left mr-2" /> Back to Contacts
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-user-edit text-blue-400 mr-3" /> Edit Contact
          </h1>
        </div>
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
          <div className="p-8">
            {/* reusable component: contact form */}
            <ContactForm
              first_name={first_name}
              setFirstName={setFirstName}
              last_name={last_name}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              onSubmit={handleSubmit}
              submitText={"Update Contact"}
            ></ContactForm>
          </div>
        </div>
      </div>
    </>
  );
}
