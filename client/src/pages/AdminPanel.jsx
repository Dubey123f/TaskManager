


// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Navbar from "../components/Navbar";
// import Loader from "../components/Loader";

// export default function AdminPanel() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAll = async () => {
//     try {
//       setLoading(true);
//       const { data } = await API.get("/tasks");
//       setTasks(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      
//       {/* Navbar */}
//       <Navbar />

//       {/* Header */}
//       <div className="max-w-6xl mx-auto mt-6 px-4">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Admin Dashboard
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Manage all users & tasks in one place
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-gray-500 text-sm">Total Tasks</p>
//           <h2 className="text-2xl font-bold">{tasks.length}</h2>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-gray-500 text-sm">Completed</p>
//           <h2 className="text-2xl font-bold text-green-600">
//             {tasks.filter(t => t.completed).length}
//           </h2>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-gray-500 text-sm">Pending</p>
//           <h2 className="text-2xl font-bold text-red-500">
//             {tasks.filter(t => !t.completed).length}
//           </h2>
//         </div>
//       </div>

//       {/* Task List */}
//       <div className="max-w-6xl mx-auto mt-6 px-4">
//         <div className="bg-white rounded-xl shadow p-4">
          
//           <h2 className="text-lg font-semibold mb-4">
//             All Tasks ({tasks.length})
//           </h2>

//           {loading ? (
//             <Loader />
//           ) : tasks.length === 0 ? (
//             <p className="text-gray-500 text-center py-6">
//               No tasks found — encourage users to create some!
//             </p>
//           ) : (
//             <div className="space-y-3">
//               {tasks.map((t) => (
//                 <div
//                   key={t._id}
//                   className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition"
//                 >
//                   {/* Left */}
//                   <div>
//                     <h3
//                       className={`font-semibold ${
//                         t.completed
//                           ? "line-through text-gray-400"
//                           : "text-gray-800"
//                       }`}
//                     >
//                       {t.title}
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                       {t.user?.email || "Unknown User"}
//                     </p>
//                   </div>

//                   {/* Right */}
//                   <span
//                     className={`px-3 py-1 text-sm rounded-full ${
//                       t.completed
//                         ? "bg-green-100 text-green-600"
//                         : "bg-yellow-100 text-yellow-600"
//                     }`}
//                   >
//                     {t.completed ? "Completed" : "Pending"}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function AdminPanel() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tasks");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const [taskRes, userRes] = await Promise.all([
        API.get("/tasks?page=1&limit=10"),
        API.get("/auth/users"),
      ]);

      // ✅ FIX HERE
      setTasks(taskRes.data.tasks || []);
      setUsers(userRes.data || []);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔍 Filters (safe)
  const filteredTasks = tasks.filter((t) =>
    t.title?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUsers = users.filter((u) =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 px-4">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Manage users and tasks efficiently
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard title="Users" value={users.length} />
          <StatCard title="Tasks" value={tasks.length} />
          <StatCard
            title="Completed"
            value={tasks.filter((t) => t.completed).length}
            color="text-green-600"
          />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* LEFT SIDE (Tabs + Search) */}
          <div className="bg-white p-4 rounded-xl shadow space-y-4">
            
            {/* Tabs */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveTab("tasks")}
                className={`py-2 rounded ${
                  activeTab === "tasks"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Tasks
              </button>

              <button
                onClick={() => setActiveTab("users")}
                className={`py-2 rounded ${
                  activeTab === "users"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Users
              </button>
            </div>

            {/* Search */}
            <input
              placeholder="Search..."
              className="w-full border p-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {/* RIGHT SIDE (DATA) */}
          <div className="lg:col-span-3 bg-white p-4 rounded-xl shadow min-h-[400px]">

            {loading ? (
              <Loader />
            ) : activeTab === "tasks" ? (
              filteredTasks.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                  No tasks found
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.map((t) => (
                    <div
                      key={t._id}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border rounded-lg hover:shadow"
                    >
                      <div>
                        <h3 className="font-semibold">{t.title}</h3>
                        <p className="text-sm text-gray-500">
                          {t.user?.email}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(t.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <span
                        className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm ${
                          t.completed
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {t.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              )
            ) : filteredUsers.length === 0 ? (
              <p className="text-center text-gray-500 py-10">
                No users found
              </p>
            ) : (
              <div className="space-y-3">
                {filteredUsers.map((u) => (
                  <div
                    key={u._id}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border rounded-lg hover:shadow"
                  >
                    <div>
                      <h3 className="font-semibold">{u.name}</h3>
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>

                    <span className="mt-2 sm:mt-0 px-3 py-1 bg-gray-200 rounded text-sm">
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// 🔥 Stat Card
function StatCard({ title, value, color = "text-gray-800" }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-xl font-bold ${color}`}>{value}</h2>
    </div>
  );
}