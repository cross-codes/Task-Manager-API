import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    required: false,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "",
  },
}, {
  timestamps: true,
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
