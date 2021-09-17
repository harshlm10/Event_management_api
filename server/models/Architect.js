const mongoose = require('mongoose')

const TasksSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, "Please provide the architect name"],
    },
    taskId : {
        type: String
    },
    status : {
        type: String,
        required : [true , "Please provide the task status"]
    },
    createdAt: {
        type : Date,
        default: Date.now
    }
})

const ArchitectSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        maxlength: [20, "Username cannot exceed 20 characters"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        maxlength: [20, "password cannot exceed 20 characters"]
    },
    builder : {
        type: String,
        required: [true, "Please provide the builder name"],
        maxlength: [20, "builder name cannot exceed 20 characters"]
    },
    tasks: {
        type: [TasksSchema]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Architects', ArchitectSchema);