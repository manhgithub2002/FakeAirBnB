const { db } = require("../helper");

module.exports = {
  addCountry: async (req, res, next) => {
    try {
      const docRef = db.collection("countries").doc(req.body.id);
      const country = await docRef.set(
        {
          id: req.body.id,
          country: req.body.country,
          description: req.body.description,
          imageUrl: req.body.imageUrl,
          region: req.body.region,
        },
        { merge: true }
      );
      console.log(req.body);
      res.status(200).send("Successfully added");
    } catch (error) {
      console.error("Error adding property:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getCountries: async (req, res, next) => {
    try {
      const placesSnapshot = await db.collection("countries").get();
      const countries = placesSnapshot.docs.map((doc) => doc.data());
      res.status(200).send(countries);
    } catch (error) {
      console.error("Error getting properties:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getCountryById: async (req, res, next) => {
    const id = req.params.id;

    try {
      const countrySnapshot = await db.collection("countries").doc(id).get();
      const country = countrySnapshot.data();

      const bestPlacesInCountry = await db
        .collection("places")
        .orderBy("rating", "desc")
        .where("country_id", "==", country.id)
        .limit(4)
        .get();
      const places = bestPlacesInCountry.docs.map((doc) => doc.data());
      country["popular"] = places;
      res.status(200).send(country);
    } catch (error) {
      console.error("Error checking property existence:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPlcesByCountry: async (req, res, next) => {},
};
