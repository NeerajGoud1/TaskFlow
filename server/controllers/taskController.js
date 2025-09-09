const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const {
      status,
      priority,
      category,
      search,
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = req.query;

    const query = { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = new RegExp(category, "i");
    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
      ];
    }

    const tasks = await Task.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      count: tasks.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this task",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    req.body.user = req.user.id;

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this task",
      });
    }

    let newStatus;
    if (req.body && typeof req.body.status === "string") {
      newStatus = req.body.status;
    } else {
      newStatus = task.status === "completed" ? "pending" : "completed";
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status: newStatus },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    console.log("Update task error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this task",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] },
          },
          completed: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          high: {
            $sum: { $cond: [{ $eq: ["$priority", "high"] }, 1, 0] },
          },
          medium: {
            $sum: { $cond: [{ $eq: ["$priority", "medium"] }, 1, 0] },
          },
          low: {
            $sum: { $cond: [{ $eq: ["$priority", "low"] }, 1, 0] },
          },
        },
      },
    ]);

    console.log("Stats aggregation result:", stats);

    const result = stats[0] || {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      high: 0,
      medium: 0,
      low: 0,
    };

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
