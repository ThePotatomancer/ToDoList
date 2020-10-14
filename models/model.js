import mongoose from 'mongoose'

/* CR:
    indentation is vital, example:
    new mongoose.Schema ({
            title: {type:String},
            description: {type:String}
        },
        {timestamps:true}
    )

    this one linebreak and indentation level makes the snippet much more readable

    also RequestSchema is not a very indicative name. calling it TaskSchema or even just Schema 
    gives more clarity for the purpose of the variable
*/
const RequestSchema = new mongoose.Schema ({
    title: {type:String},
    description: {type:String}},
    {timestamps:true}
)

const Task = mongoose.Model('Task', RequestSchema);
export default Task;