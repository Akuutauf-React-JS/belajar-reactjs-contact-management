import { Outlet } from "react-router";

// membuat templating untuk body
export default function Layout() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center p-4">
      {/* content akan menyesuaikan untuk halaman yang tertentu */}
      <Outlet />
    </div>
  );
}
