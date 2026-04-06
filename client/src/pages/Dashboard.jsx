

// import { useEffect, useState } from "react";
// import API from "../services/api";
// import Navbar from "../components/Navbar";
// import TaskForm from "../components/TaskForm";
// import TaskCard from "../components/TaskCard";
// import Loader from "../components/Loader";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const { data } = await API.get("/tasks");
//       setTasks(data);
//       setFilteredTasks(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // 🔍 Filter logic
//   useEffect(() => {
//     if (filter === "completed") {
//       setFilteredTasks(tasks.filter((t) => t.completed));
//     } else if (filter === "pending") {
//       setFilteredTasks(tasks.filter((t) => !t.completed));
//     } else {
//       setFilteredTasks(tasks);
//     }
//   }, [filter, tasks]);

//   const addTask = async (title) => {
//     await API.post("/tasks", { title });
//     fetchTasks();
//   };

//   const deleteTask = async (id) => {
//     await API.delete(`/tasks/${id}`);
//     fetchTasks();
//   };

//   const toggleTask = async (task) => {
//     await API.put(`/tasks/${task._id}`, {
//       completed: !task.completed,
//     });
//     fetchTasks();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      
//       {/* Navbar */}
//       <Navbar />

//       {/* Header */}
//       <div className="max-w-4xl mx-auto mt-6 px-4">
//         <h1 className="text-3xl font-bold text-gray-800">
//           My Tasks 📋
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Manage your daily productivity efficiently
//         </p>
//       </div>

//       {/* Stats */}
//       <div className="max-w-4xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-gray-500 text-sm">Total</p>
//           <h2 className="text-2xl font-bold">{tasks.length}</h2>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-gray-500 text-sm">Completed</p>
//           <h2 className="text-2xl font-bold text-green-600">
//             {tasks.filter((t) => t.completed).length}
//           </h2>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow">
//           <p className="text-gray-500 text-sm">Pending</p>
//           <h2 className="text-2xl font-bold text-red-500">
//             {tasks.filter((t) => !t.completed).length}
//           </h2>
//         </div>
//       </div>

//       {/* Task Form */}
//       <div className="max-w-4xl mx-auto mt-6 px-4">
//         <TaskForm onAdd={addTask} />
//       </div>

//       {/* Filters */}
//       <div className="max-w-4xl mx-auto mt-4 px-4 flex gap-3">
//         <button
//           onClick={() => setFilter("all")}
//           className={`px-4 py-2 rounded-lg ${
//             filter === "all"
//               ? "bg-blue-600 text-white"
//               : "bg-white border"
//           }`}
//         >
//           All
//         </button>

//         <button
//           onClick={() => setFilter("completed")}
//           className={`px-4 py-2 rounded-lg ${
//             filter === "completed"
//               ? "bg-green-600 text-white"
//               : "bg-white border"
//           }`}
//         >
//           Completed
//         </button>

//         <button
//           onClick={() => setFilter("pending")}
//           className={`px-4 py-2 rounded-lg ${
//             filter === "pending"
//               ? "bg-yellow-500 text-white"
//               : "bg-white border"
//           }`}
//         >
//           Pending
//         </button>
//       </div>

//       {/* Task List */}
//       <div className="max-w-4xl mx-auto mt-6 px-4">
//         <div className="bg-white p-4 rounded-xl shadow">
//           {loading ? (
//             <Loader />
//           ) : filteredTasks.length === 0 ? (
//             <p className="text-center text-gray-500 py-6">
//               No tasks found 🚫
//             </p>
//           ) : (
//             <div className="space-y-3">
//               {filteredTasks.map((task) => (
//                 <TaskCard
//                   key={task._id}
//                   task={task}
//                   onDelete={deleteTask}
//                   onToggle={toggleTask}
//                 />
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
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(`/tasks?page=${page}&limit=5`);

      setTasks(data.tasks || []);
      setPages(data.pages || 1);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  // ✅ FILTER (derived)
  const filteredTasks =
    filter === "completed"
      ? tasks.filter((t) => t.completed)
      : filter === "pending"
      ? tasks.filter((t) => !t.completed)
      : tasks;

  // ✅ ADD (instant)
  const addTask = async (task) => {
    try {
      const { data } = await API.post("/tasks", task);
    //   setTasks((prev) => [data, ...prev]);
         fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ DELETE (instant)
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    // setTasks((prev) => prev.filter((t) => t._id !== id));
    fetchTasks();
  };

  // ✅ TOGGLE (instant)
  const toggleTask = async (task) => {
    const { data } = await API.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });

    // setTasks((prev) =>
    //   prev.map((t) => (t._id === task._id ? data : t))
    // );
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 🔵 LEFT SIDE (Form + Filters + Stats) */}
        <div className="space-y-4">
          
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500 text-sm">
              Manage your tasks efficiently
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard title="Total" value={tasks.length} />
            <StatCard
              title="Done"
              value={tasks.filter((t) => t.completed).length}
              color="text-green-600"
            />
            <StatCard
              title="Pending"
              value={tasks.filter((t) => !t.completed).length}
              color="text-red-500"
            />
          </div>

          {/* Form */}
          <TaskForm onAdd={addTask} />

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {["all", "completed", "pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* 🟢 RIGHT SIDE (Task List) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-xl shadow min-h-[400px]">
            
            {loading ? (
              <Loader />
            ) : !filteredTasks || filteredTasks.length === 0 ? (
              <p className="text-center text-gray-500 py-10">
                No tasks found
              </p>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={deleteTask}
                    onToggle={toggleTask}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Prev
              </button>

              {[...Array(pages).keys()].map((x) => (
                <button
                  key={x}
                  onClick={() => setPage(x + 1)}
                  className={`px-3 py-1 rounded ${
                    page === x + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {x + 1}
                </button>
              ))}

              <button
                disabled={page === pages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Next
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// 🔥 Stat Card
function StatCard({ title, value, color = "text-gray-800" }) {
  return (
    <div className="bg-white p-3 rounded-lg shadow text-center">
      <p className="text-xs text-gray-500">{title}</p>
      <h2 className={`text-lg font-bold ${color}`}>{value}</h2>
    </div>
  );
}