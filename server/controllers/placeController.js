const { db } = require("../helper");
module.exports = {
  addPlace: async (req, res, next) => {
    try {
      const docRef = db.collection("places").doc(req.body.id);
      const place = await docRef.set(
        {
          id: req.body.id,
          country_id: req.body.country_id,
          title: req.body.title,
          description: req.body.description,
          imageUrl: req.body.imageUrl,
          rating: req.body.rating,
          review: req.body.review,
          location: req.body.location,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        },
        { merge: true }
      );
      res.status(200).send("Successfully added");
    } catch (error) {
      console.error("Error adding property:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPlaces: async (req, res, next) => {
    try {
      const placesSnapshot = await db.collection("places").get();
      const places = placesSnapshot.docs.map((doc) => doc.data());
      console.log("here is");
      res.status(200).send(places);
    } catch (error) {
      console.error("Error getting properties:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPlaceById: async (req, res, next) => {
    const id = req.params.id;

    try {
      const placeSnapshot = await db.collection("places").doc(id).get();
      place = placeSnapshot.data();

      console.log(place.popular);
      place.popular = await Promise.all(
        place.popular.map(async (propertyId) => {
          const propertySnapshot = await db
            .collection("properties")
            .doc(propertyId)
            .get();
          return propertySnapshot.data();
        })
      );
      res.status(200).send(place);
    } catch (error) {
      console.error("Error checking property existence:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPlacesByCountry: async (req, res, next) => {
    const country_id = req.params.id;
    try {
      const placesRef = db
        .collection("places")
        .where("country_id", "==", country_id);
      const placesSnapshot = await placesRef.get();

      const places = placesSnapshot.docs.map((doc) => doc.data());

      res.status(200).send(places);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  addPropertyToPlace: async (req, res, next) => {
    const { propertyId, placeId } = req.body;

    try {
      const placeSnapshot = await db.collection("places").doc(placeId).get();
      const place = placeSnapshot.data();

      const index = place.popular.indexOf(propertyId);

      if (index !== -1) {
        place.popular.splice(index, 1);
      } else {
        place.popular.push(propertyId);

        await db.collection("places").doc(placeId).update({
          popular: place.popular,
        });
      }
      res.status(200).send({ message: "Add property to place successfully" });
    } catch (error) {
      console.log(error);
    }
  },

  getRecommendations: async (req, res, next) => {
    const { limit } = req.params;
    const limitInt = parseInt(limit);
    try {
      const placesRef = db
        .collection("places")
        .orderBy("rating", "desc")
        .limit(limitInt);
      const placesSnapshot = await placesRef.get();
      const places = placesSnapshot.docs.map((doc) => doc.data());
      res.status(200).send(places);
    } catch (error) {
      console.log(error);
    }
  },
};
