const Builders = require('../models/Builder')
const Architects = require('../models/Architect')

// @desc Login the builder
// route POST /api/v1/builder/login
exports.builderLogin = async (req, res) => {
    console.log(req.body)
    try {
        const builder = await Builders.findOne(req.body)
        if (!builder) {
            res.status(200).json({
                success: false,
                msg: "Builder Username or password incorrect"
            })
            return;
        }
        else {
            res.status(200).json({
                success: true,
                msg: "Login Successful please redirect"
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(200).json({
            success: false,
            msg: "Some error occured please try reloading the page"
        })
    }
}

//@desc Get all the task created by the builder
// route GET /api/v1/builder/getTask
exports.getTask = async (req, res) => {
    try {
        const builder = await Builders.find({ username: req.query.name }, "username inChargeof")
        res.status(200).json({
            success: true,
            data: builder
        })
    } catch (err) {
        console.log(err);
        res.status(200).json({
            success: false,
            msg: "Some error occured please try again after some time"
        })
    }
}

//@ desc Create a new Architect
//route POST /api/v1/builder/architect
exports.createArchitect = async (req, res) => {
    console.log(req.body)
    try {
        const archi = await Architects.find({ username: req.body.username })
        if (archi.length == 1) {
            res.status(200).json({
                success: false,
                msg: "Architect Already Exists"
            })
            return;
        }
        else {
            const arct = await Architects.create(req.body)
            const builder = await Builders.updateOne({ username: req.body.builder }, {
                $push: {
                    inChargeof: { architect: req.body.username }
                }
            })
            res.status(200).json({
                success: true,
                msg: "Architect Created Successfully and builder model is updated",
                builder: builder,
                arct: arct
            })
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({
            success: false,
            msg: "Some error occured please try again after some time"
        })
    }
}

// @desc create a new task for the architect
// route POST /api/v1/builder/create_task
exports.createTask = async (req, res) => {
    try {
        console.log(req.body)
        const builder = await Builders.findOne({username : req.body.builderName})
        builder.inChargeof.push({
            task : req.body.taskDescription,
            taskId: req.body.taskDescription+req.body.architectName,
            architect: req.body.architectName,
            status: "Unfinished"
        })
        const updated = await builder.save()
    
        const architect = await Architects.findOne({username: req.body.architectName})
        architect.tasks.push({
            task : req.body.taskDescription,
            taskId: req.body.taskDescription+req.body.architectName,
            status: "Unfinished"
        })

        const finalUpdated = await architect.save()

        res.status(200).json({
            success: true,
            builder: updated,
            architect: finalUpdated
        })
    } catch (err) {
        console.log(err);
        res.status(200).json({
            success: false,
            msg: "Some error occured please try again after some time"
        })
    }
}

// @desc update an existing task for the architect
// route PUT /api/v1/builder/update_task
exports.updateTask = async (req, res) => {
    console.log(req.body.id)
    let prevTask = "";
    try {
        const builder = await Builders.findOne({username: req.body.builderName})
        builder.inChargeof = builder.inChargeof.map(archi => {
            if(archi._id == req.body.id){
                prevTask = archi.task;
                return(
                archi = {
                    status : archi.status,
                    _id : archi._id,
                    architect : archi.architect,
                    task: req.body.taskDescription,
                    taskId: req.body.taskDescription+archi.architect,
                    createdAt : Date.now()
                }
                )
            }
            else{return archi}
        })

        const updated = await builder.save()

        const architect = await Architects.findOne({username: req.body.architectName})
        architect.tasks = architect.tasks.map(archi => {
            if(archi.taskId == prevTask+req.body.architectName){
                return(
                    archi = {
                        task: req.body.taskDescription,
                        taskId: req.body.taskDescription+req.body.architectName,
                        status: archi.status
                    }
                )
            }
            else{return archi}
        })
        
        const finalUpdated = await architect.save()

        res.status(200).json({
            success: true,
            msg: "Update an existing task for an architect"
        })
    }
    catch (err) {
        console.log(err);
        res.status(200).json({
            success: false,
            msg: "Some error occured please try again after some time"
        })
    }
}