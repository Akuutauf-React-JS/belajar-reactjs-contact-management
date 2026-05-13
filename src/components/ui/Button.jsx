export default function Button({ buttonText, type, onClick, className }) {
  return (
    // contoh component button untuk reusable
    <>
      <button
        type={type}
        onClick={onClick}
        className={`w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 ${className}`}
      >
        <i className="fas fa-sign-in-alt mr-2" /> {buttonText}
      </button>
    </>
  );
}
