export default function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-lg transition">
      
      {/* Left */}
      <div>
        <h3
          className={`font-semibold ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="text-sm text-gray-500">
            {task.description}
          </p>
        )}

        {/* Date */}
        <p className="text-xs text-gray-400 mt-1">
          {new Date(task.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Right */}
      <div className="flex gap-2">
        <button
          onClick={() => onToggle(task)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Toggle
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}