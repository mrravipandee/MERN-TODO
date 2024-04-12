const ToDoModel = require("../modules/TodoModels");

// Get all todos
module.exports.getToDos = async (req, res) => {
  try {
    const todos = await ToDoModel.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Save a todo
module.exports.saveToDo = async (req, res) => {
  const { todo } = req.body;
  if (!todo) {
    return res.status(400).json({ error: "Todo content is required" });
  }

  try {
    const newTodo = await ToDoModel.create({ todo });
    console.log("Save Successfully...");
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error saving todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a todo
module.exports.updateToDo = async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  if (!todo) {
    return res.status(400).json({ error: "Todo content is required" });
  }

  try {
    const updatedTodo = await ToDoModel.findByIdAndUpdate(
      id,
      { todo },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a todo
module.exports.deleteToDo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await ToDoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
