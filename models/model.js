import mongoose from "mongoose";
//CR: This file is good;

const RequestSchema = new mongoose.Schema(
  {
    //CR: Can't you just write - title2: String ? I'm not sure
    title: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Task = mongoose.Model("Task", RequestSchema);
export default Task;
