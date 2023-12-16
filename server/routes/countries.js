const router = require("express").Router();
const countryController = require("../controllers/countryController");

router.post("/", countryController.addCountry);
router.get("/", countryController.getCountries);
router.get("/:id", countryController.getCountryById);
// router.get("/byCountry/:id", countryController.getPlacesByCountry);
// router.post("/place", countryController.addPlaceToCountry);

module.exports = router;
