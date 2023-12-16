const router = require("express").Router();
const propertyController = require("../controllers/propertyController");

router.post("/", propertyController.addProperty);
router.post("/addByHost", propertyController.addPropertyByHost);
router.get("/", propertyController.getProperties);
router.get("/best/:limit", propertyController.getBestProperties);
router.get("/:id", propertyController.getPropertyById);
router.get("/byCountry/:id", propertyController.getPropertiesByCountry);
router.get("/byPlace/:id", propertyController.getPropertiesByPlace);
router.get("/byHost/:id", propertyController.getPropertiesByHost);
router.get("/bestByPlace/:id", propertyController.getBestPropertiesByPlace);
router.get("/numProperties/:id", propertyController.getNumById);

module.exports = router;
