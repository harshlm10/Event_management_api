const Builders = require('../models/Builder')
const Architects = require('../models/Architect')

// @desc - Login the admin
// route POST /api/v1/admin/login
exports.login = (req, res) => {
    console.log(req.body)
    if (req.body.uname === process.env.ADMIN_USERNAME && req.body.pwd === process.env.ADMIN_PASSWORD) {
        res.status(200).json({
            success: true,
            msg: "Successful logged in the admin"
        })
    }
    else {
        res.status(400).json({
            success: false,
            msg: "Username or Password Incorrect"
        })
    }
}

// @desc - Returs all the builders and all the tasks
// route GET /api/v1/admin/builders
exports.getBuilders = async (req, res) => {
    try {
        const builders = await Builders.find({}, 'username inChargeof')
        res.status(200).json({
            success: true,
            builders
        })
        return;
    } catch (err) {
        res.status(200).json({
            success: false,
            msg: "Some error occured please try reloading the page"
        })
        return;
    }
}

// @desc - Create a new builder
// route POST /api/v1/admin/create_builder
exports.createBuilder = async (req, res) => {
    console.log(req.body)
    try {
        const builder = await Builders.find({ username: req.body.username })
        if (builder.length === 1) {
            res.status(200).json({
                success: false,
                msg: "Builder Already Exists"
            })
            return;
        }
        else {
            const data = await Builders.create(req.body)
            res.status(200).json({
                success: true,
                msg: "Builder Created Successfully",
                data
            })
        }
    } catch (err) {
        res.status(200).json({
            success: false,
            msg: "cannot create new builder please try reoading the page"
        })
    }
}

// @desc - delete a task
// route GET /api/v1/admin/delete
exports.deleteTask = async (req, res) => {
    console.log(req.body)

    try {
        const builder = await Builders.findOne({ username: req.body.builderName })
        //console.log(builder.inChargeof.length)
        builder.inChargeof = builder.inChargeof.filter(build => build.taskId != req.body.taskDescription + req.body.architectName)
        //console.log(builder.inChargeof.length)
        const updatedBuilder = builder.save();

        const architect = await Architects.findOne({ username: req.body.architectName })

        architect.tasks = architect.tasks.filter(archi => archi.taskId != req.body.taskDescription + req.body.architectName)
        //console.log(architect)

        const updatedArchitect = architect.save()

        res.status(200).json({
            success: true,
            msg: "Task Deleted Successfully!"
        })
    } catch (err) {
        res.status(200).json({
            success: false,
            msg: "cannot Delete this task please try reoading the page"
        })
    }
}