const { db } = require("../helper");

module.exports = {
  addRecommendation: async (req, res, next) => {
    try {
      const docRef = db.collection("recommendations").doc(req.body.id);
      const recommendation = await docRef.set(
        {
          id: req.body.id,
          country_id: req.body.country_id,
          title: req.body.title,
          imageUrl: req.body.imageUrl,
          rating: req.body.rating,
          review: req.body.review,
        },
        { merge: true }
      );
      res.status(200).send("Successfully added");
    } catch (error) {
      console.error("Error adding property:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getRecommendations: async (req, res, next) => {
    try {
      const snapshot = await db.collection("recommendations").get();
      const properties = snapshot.docs.map((doc) => doc.data());
      res.status(200).send(properties);
    } catch (error) {
      console.error("Error getting properties:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getRecommendationById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const snapshot = await db.collection("recommendations").doc(id).get();
      res.status(200).send(snapshot);
    } catch (error) {
      console.error("Error getting properties:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  //   getPlaceByCountry: async (req, res, next) => {
  //     const country = req.params.name;

  //     try {
  //       const propertyDoc = await placeCollection.doc(country).get();

  //       console.log(propertyDoc);
  //       res.status(200).json(propertyDoc);
  //     } catch (error) {
  //       console.error("Error checking property existence:", error);
  //       res.status(500).json({ message: "Internal Server Error" });
  //     }
  //   },
};
