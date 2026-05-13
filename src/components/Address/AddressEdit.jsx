import { Link, useNavigate, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { addressDetail, addressUpdate } from "../../lib/api/AddressApi";
import { useState } from "react";
import { alertError, alertSuccess } from "../../lib/alert";
import { contactDetail } from "../../lib/api/ContactApi";
import AddressForm from "./ui/AddressForm";

export default function AddressEdit() {
  // menyiapkan data
  const [token] = useLocalStorage("token", "");
  const { id, addressId } = useParams(); // mengambil data id melalui

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [contact, setContact] = useState([]);
  const navigate = useNavigate("");

  // membuat async function
  // untuk mengambil data address detail
  async function fetchAddressDetail() {
    const response = await addressDetail(token, id, addressId);

    // mengambil response body dan menampilkannya ke console
    const responseBody = await response.json();
    console.log(responseBody);

    // mengecek jika request berhasil
    if (response.ok) {
      // maka set seluruh data state
      setStreet(responseBody.data.street);
      setCity(responseBody.data.city);
      setProvince(responseBody.data.province);
      setCountry(responseBody.data.country);
      setPostalCode(responseBody.data.postal_code);
    } else {
      await alertError(responseBody.errors);
    }
  }

  // untuk mengambil data contact detail
  async function fetchContactDetail() {
    const response = await contactDetail(token, id);

    // mengambil response body dan menampilkannya ke console log
    const responseBody = await response.json();
    console.log(responseBody);

    // mengecek jika berhasil
    if (response.ok) {
      // set semua data state contact
      setContact(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  // untuk submit update address
  async function handleSubmit(e) {
    e.preventDefault();

    // memanggil backend untuk melakukan update
    const response = await addressUpdate(token, id, addressId, { street, city, province, country, postal_code });

    // mengambil response body dan menampilkannya ke console
    const responseBody = await response.json();
    console.log(responseBody);

    // mengecek jika request berhasil
    if (response.ok) {
      await alertSuccess("Update address successfully");

      // redirect ke halaman sebelumnya
      navigate({
        pathname: `/dashboard/contacts/${id}`,
      });
    } else {
      await alertError(responseBody.errrors);
    }
  }

  // menggunakan use effect once
  useEffectOnce(() => {
    fetchContactDetail().then(() => console.log("Fetch contact detail successfully"));
    fetchAddressDetail().then(() => console.log("Fetch address detail successfully"));
  });

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <Link to={`/dashboard/contacts/${id}`} className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
            <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-map-marker-alt text-blue-400 mr-3" /> Edit Address
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
