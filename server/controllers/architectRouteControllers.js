const Architects = require('../models/Architect')
const Builders = require('../models/Builder')
// @desc Login the Architect
// route POST /api/v1/architect/login
exports.ArchitectLogin = async (req, res) => {
    console.log(req.body)
    try {
        const architect = await Architects.findOne(req.body)
        if (architect) {
            res.status(200).json({
                success: true,
                msg: "Login the architect"
            })
        }
        else {
            res.status(200).json({
                success: false,
                msg: "Architect username or password incorrect!"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(200).json({
            success: false,
            msg: "Some error occured plese try reloading the page!!"
        })
    }
}

// @desc get all the tasks assigned to the architect
// route POST /api/v1/architect/tasks
exports.ArchitectTasks = async (req, res) => {
    console.log(req.query.name)
    try {
        const architect = await Architects.findOne({ username: req.query.name }, "builder tasks")
        res.status(200).json({
            success: true,
            data: architect
        })
    } catch (err) {
        console.log(err)
        res.status(200).json({
            success: false,
            msg: "Some error occured plese try reloading the page!!"
        })
    }
}

// @desc Update the status of the task
// route PUT /api/v1/architect/task
exports.ArchitectTaskUpdate = async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.body.taskStatus)
        const builder = await Builders.findOne({ username: req.body.builderName })
        console.log(builder)
        builder.inChargeof = builder.inChargeof.map(build => {
            if (build.taskId == req.body.taskDescription + req.body.architectName) {
                console.log("builderhere")
                return ({
                    task: build.task,
                    taskId: req.body.taskDescription + req.body.architectName,
                    status: req.body.taskStatus,
                    _id: build._id,
                    architect: build.architect,
                    createdAt: build.createdAt
                })
            }
            else { return build }
        })

        //console.log(builder.inChargeof)
        const updatedBuilder = await builder.save()

        const architect = await Architects.findOne({ username: req.body.architectName })
        //console.log(architect)
        architect.tasks = architect.tasks.map(archi => {
            if (archi.taskId == req.body.taskDescription + req.body.architectName) {
                return ({
                    task: archi.task,
                    taskId: archi.taskId,
                    status: req.body.taskStatus,
                    createdAt: archi.createdAt
                })
            }
            else { return archi }
        })

        //console.log(architect)

        const updatedArchitect = await architect.save()

        res.status(200).json({
            success: true,
            builder: updatedBuilder,
            architect: updatedArchitect
        })
    } catch (err) {
        console.log(err)
        res.status(200).json({
            success: false,
            msg: "Some error occured plese try reloading the page!!"
        })
    }
}