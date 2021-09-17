const express = require('express')

const {
    login,
    getBuilders,
    createBuilder,
    deleteTask
} = require('../controllers/adminRouteController')

const router = express.Router();

router.route("/login").post(login)
router.route("/builders").get(getBuilders)
router.route("/create_builder").post(createBuilder)
router.route("/delete").delete(deleteTask)

module.exports = router