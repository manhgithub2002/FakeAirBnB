const router = require("express").Router();
const userController = require("../controllers/userController");

// router.delete("./delete", userController.deleteUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
// router.post("./", userController.addUser);
// router.post("./query", userController.addUserQuery);

module.exports = router;
