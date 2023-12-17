const router = require("express").Router();
const recommendationController = require("../controllers/recommendationController");

router.post("/", recommendationController.addRecommendation);
router.get("/", recommendationController.getRecommendations);
router.get("/:id", recommendationController.getRecommendationById);

module.exports = router;
