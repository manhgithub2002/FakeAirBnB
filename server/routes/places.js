const router = require("express").Router();
const placeController = require("../controllers/placeController");

router.post("/", placeController.addPlace);
router.post("/property", placeController.addPropertyToPlace);
router.get("/recommendations/:limit", placeController.getRecommendations);
router.get("/", placeController.getPlaces);
router.get("/:id", placeController.getPlaceById);
router.get("/byCountry/:id", placeController.getPlacesByCountry);

module.exports = router;
