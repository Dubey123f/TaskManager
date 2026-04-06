// import { useState } from "react";

// export default function TaskForm({ onAdd }) {
//   const [title, setTitle] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title) return;
//     onAdd(title);
//     setTitle("");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex gap-2 bg-white p-4 rounded-lg shadow-md"
//     >
//       <input
//         type="text"
//         placeholder="Enter task..."
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="flex-1 border p-2 rounded"
//       />

//       <button className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
//         Add
//       </button>
//     </form>
//   );
// }

import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) return;

    onAdd(form); // 🔥 now sending full object
    setForm({ title: "", description: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-md space-y-4"
    >
      {/* Title */}
      <input
        type="text"
        placeholder="Task title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Description */}
      <textarea
        placeholder="Task description (optional)"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        rows={3}
        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}