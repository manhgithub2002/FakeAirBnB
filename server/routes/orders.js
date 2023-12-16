const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.addOrder);
router.get("/user/:id", orderController.getOrderByUserId);
router.get("/:id", orderController.getOrderById);
router.get("/byProperty/:id", orderController.getOrderByPropertyId);

module.exports = router;
