const Task = require('../models/Task');

// @desc Create task
// @route POST /tasks
// @access Private
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get tasks (with filters)
// @route GET /tasks
// @access Private
// const getTasks = async (req, res) => {
//   try {
//     const { completed, page = 1, limit = 5 } = req.query;

//     let query = {};

//     // user vs admin logic
//     if (req.user.role !== 'admin') {
//       query.user = req.user.id;
//     }

//     if (completed !== undefined) {
//       query.completed = completed === 'true';
//     }

//     const tasks = await Task.find(query)
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit))
//       .populate('user', 'name email');

//     res.json(tasks);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getTasks = async (req, res) => {
  try {
    const { completed } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    let query = {};

    // 👇 USER vs ADMIN
    if (req.user.role !== "admin") {
      query.user = req.user.id;
    }

    // 👇 filter
    if (completed !== undefined) {
      query.completed = completed === "true";
    }

    // 👇 total count (IMPORTANT)
    const total = await Task.countDocuments(query);

    // 👇 pagination + sorting
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 }) // latest first
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "name email");

    // ✅ FINAL RESPONSE (IMPORTANT)
    res.json({
      tasks,
      total,
      page,
      pages: Math.ceil(total / limit),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update task
// @route PUT /tasks/:id
// @access Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // only owner or admin
    if (req.user.role !== 'admin' && task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete task
// @route DELETE /tasks/:id
// @access Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role !== 'admin' && task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await task.deleteOne();

    res.json({ message: 'Task removed' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};