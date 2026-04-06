// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <div className="flex justify-between items-center bg-gray-900 text-white px-6 py-3 shadow-md">
//       <h1 className="text-lg font-bold">Task Manager 🚀</h1>

//       <div className="flex items-center gap-4">
//         <span className="text-sm">{user?.email}</span>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-lg sm:text-xl font-bold tracking-wide">
          Task Manager
        </h1>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          <span className="text-sm text-gray-300">{user?.email}</span>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1.5 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden px-4 pb-4 space-y-3 bg-gray-800 border-t border-gray-700">
          
          <p className="text-sm text-gray-300">{user?.email}</p>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}