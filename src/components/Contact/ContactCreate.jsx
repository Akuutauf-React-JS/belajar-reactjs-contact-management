import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { contactCreate } from "../../lib/api/ContactApi";
import { alertError, alertSuccess } from "../../lib/alert";
import { useLocalStorage } from "react-use";
import ContactForm from "./ui/ContactForm";

export default function ContactCreate() {
  // menyiapkan data state
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [token] = useLocalStorage("token", "");
  const navigate = useNavigate();

  // membuat event handler
  async function handleSubmit(e) {
    // mencegah agar tidak melakukan reload ketika submit
    e.preventDefault();

    // memanggil api
    const response = await contactCreate(token, { first_name, last_name, email, phone });

    // membuat response body dan menampilkannya ke console browser
    const responseBody = await response.json();
    console.log(responseBody);

    // mengecek apakah tidak ada error
    if (response.ok) {
      await alertSuccess("Contact created successfully");

      // redirect ke halaman dashboard contacts
      navigate({
        pathname: "/dashboard/contacts",
      });
    } else await alertError(responseBody.errors);
  }

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <Link to="/dashboard/contacts" className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
            <i className="fas fa-arrow-left mr-2" /> Back to Contacts
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-user-plus text-blue-400 mr-3" /> Create New Contact
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
              submitText={"Create Contact"}
            ></ContactForm>
          </div>
        </div>
      </div>
    </>
  );
}
