const mongoose = require('mongoose')

const WorkerSchema = new mongoose.Schema({
    task: {
        type: String
    },
    taskId: {
        type: String
     },
    architect: {
        type: String,
        required: [true, "Please provide the architect name"],
        maxlength: [20, "architect name cannot exceed 20 characters"]
    },
    status : {
        type: String,
        default: "Unfinished"
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const BuilderSchema = new mongoose.Schema({
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
    inChargeof: {
        type: [WorkerSchema]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Builders', BuilderSchema);