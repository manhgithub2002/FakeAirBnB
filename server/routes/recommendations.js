const router = require("express").Router();
const recommendationController = require("../controllers/recommendationController");

router.post("/", recommendationController.addRecommendation);
router.get("/", recommendationController.getRecommendations);
router.get("/:id", recommendationController.getRecommendationById);
// router.post("/", placeController.addPlace);
// router.get("/:id", placeController.getPlaceByCountry);
// router.get("/byCountry/:id", placeController.getPlacesByCountry);

module.exports = router;
