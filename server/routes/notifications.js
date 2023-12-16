const router = require("express").Router();
const notificationController = require("../controllers/notificationController");

router.get("/", notificationController.getUsers);

module.exports = router;
