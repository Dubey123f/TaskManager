// import { useState, useContext } from "react";
// import API from "../services/api";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data } = await API.post("/auth/login", form);
//     login(data);

//     if (data.role === "admin") navigate("/admin");
//     else navigate("/dashboard");
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-xl w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login 🚀</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-3 mb-4 border rounded-lg"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 mb-4 border rounded-lg"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
//           Login
//         </button>

//         <p className="mt-4 text-center">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-blue-500">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }


import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await API.post("/auth/login", form);
      login(data);

      if (data.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 px-4">
      
      <div className="w-full max-w-md">
        
        {/* Card */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Sign In
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg font-medium"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-gray-300 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}