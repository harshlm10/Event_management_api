const express = require('express')

const {
    builderLogin,
    createTask,
    updateTask,
    getTask,
    createArchitect
} = require('../controllers/builderRouteController.js')

const router = express.Router();

router.route("/login").post(builderLogin)
router.route("/getTask").get(getTask)
router.route("/create_task").post(createTask)
router.route("/update_task").put(updateTask)
router.route("/architect").post(createArchitect)

module.exports = router