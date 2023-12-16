const router = require("express").Router();
const facilityController = require("../controllers/facilityController");

router.post("/", facilityController.addFacility);
router.get("/:id", facilityController.getFacilityByPropertyId);

module.exports = router;
