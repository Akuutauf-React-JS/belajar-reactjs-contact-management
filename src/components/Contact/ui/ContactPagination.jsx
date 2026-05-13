export default function ContactPagination({ page, totalPage, onClick, getPages }) {
  return (
    <>
      {/* Pagination */}
      <div className="mt-10 flex justify-center">
        <nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
          {/* Previous */}
          {/* menambahkan pengecekan */}
          {/* ketika page previous ditekan, maka data state page sekarang, akan berkurang 1 */}
          {page > 1 && (
            <a
              href="#"
              onClick={() => onClick(page - 1)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
            >
              <i className="fas fa-chevron-left mr-2" /> Previous
            </a>
          )}

          {/* melakukan iterasi untuk pages */}
          {getPages().map((value) => {
            // menggunakan kurung kurawal pada iterasinya, karena kita melakukan pengecekan terlebih dahulu untuk memeriksa, apakah page saat ini adalah active (yang dipilih) atau tidak
            if (value === page) {
              // kalau sama dengan page saat ini yang sedang aktif, maka return kan component page yang active
              // kalau nomor page ditekan, maka data akan menyesuaikan dengan page tersebut
              return (
                <a
                  key={value}
                  href="#"
                  onClick={() => onClick(value)}
                  className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md"
                >
                  {value}
                </a>
              );
            } else {
              // kalau tidak sama, maka return untuk component page yang tidak aktif
              // kalau nomor page ditekan, maka data akan menyesuaikan dengan page tersebut
              return (
                <a
                  key={value}
                  href="#"
                  onClick={() => onClick(value)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
                >
                  {value}
                </a>
              );
            }
          })}

          {/* Next */}
          {/* melakukan pengecekan */}
          {/* ketika page next ditekan, maka data state page sekarang, akan bertambah 1 */}
          {page < totalPage && (
            <a
              href="#"
              onClick={() => onClick(page + 1)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
            >
              Next <i className="fas fa-chevron-right ml-2" />
            </a>
          )}
        </nav>
      </div>
    </>
  );
}
