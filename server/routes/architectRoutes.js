const express = require('express')

const {ArchitectLogin, ArchitectTasks,ArchitectTaskUpdate} = require('../controllers/architectRouteControllers')

const router = express.Router();

router.route("/login").post(ArchitectLogin)
router.route("/tasks").get(ArchitectTasks)
router.route("/task").put(ArchitectTaskUpdate)

module.exports = router