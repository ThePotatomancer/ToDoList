import mongoose from 'mongoose'

const RequestSchema = new mongoose.Schema ({
    title: {type:String},
    description: {type:String}},
    {timestamps:true}
)

const Task = mongoose.Model('Task', RequestSchema);
export default Task;