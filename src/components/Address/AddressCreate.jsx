import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDetail } from "../../lib/api/ContactApi";
import { alertError, alertSuccess } from "../../lib/alert";
import { addressCreate } from "../../lib/api/AddressApi";
import AddressForm from "./ui/AddressForm";

export default function AddressCreate() {
  // menyiapkan penyimpanan variabel
  const { id } = useParams(); // parameter contactId
  const [token] = useLocalStorage("token", "");
  const navigate = useNavigate();

  const [contact, setContact] = useState({});
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");

  // async function
  async function fetchContact() {
    const response = await contactDetail(token, id);
    const responseBody = await response.json();
    console.log(responseBody);

    // mengecek jika response berhasil
    if (response.ok) {
      // set seluruh data contact berdasarkan data yang sudah diperoleh
      setContact(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  // untuk submit form create address
  async function handleSubmit(e) {
    e.preventDefault(); // mencegah reload saat submit form

    // memanggil api untuk create data address
    const response = await addressCreate(token, id, { street, city, province, country, postal_code });

    // mengambil response body dan menampilkan ke console
    const responseBody = await response.json();
    console.log(responseBody);

    // mengecek jika response berhasil
    if (response.ok) {
      await alertSuccess("Address created successfully");

      // melakukan redirect ke halaman detail contact sebelumnya
      navigate({
        pathname: `/dashboard/contacts/${id}`,
      });
    } else {
      await alertError(responseBody.errrors);
    }
  }

  useEffectOnce(() => {
    // memanggil data contact berdasarkan id (milik contact) sekali, pada saat halaman di load
    fetchContact().then(() => console.log("Contact detail fetched successfully"));
  });

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <Link to={`/dashboard/contacts/${id}`} className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
            <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-plus-circle text-blue-400 mr-3" /> Add New Address
          </h1>
        </div>
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
          <div className="p-8">
            {/* Contact Information */}
            <div className="mb-6 pb-6 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                  <i className="fas fa-user text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {contact.first_name} {contact.last_name}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {contact.email} • {contact.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* reusable component: address form */}
            <AddressForm
              contactId={id}
              street={street}
              setStreet={setStreet}
              city={city}
              setCity={setCity}
              province={province}
              setProvince={setProvince}
              country={country}
              setCountry={setCountry}
              postal_code={postal_code}
              setPostalCode={setPostalCode}
              onSubmit={handleSubmit}
              submitText={"Add Address"}
            ></AddressForm>
          </div>
        </div>
      </div>
    </>
  );
}
