const { firestore } = require("firebase-admin");
const { db } = require("../helper");

module.exports = {
  getProperties: async (req, res, next) => {
    try {
      // Get data
      const propertiesSnapShot = await db.collection("properties").get();
      const properties = propertiesSnapShot.docs.map((doc) => doc.data());

      res.status(200).json(properties);

      console.log({ properties });
    } catch (error) {
      console.log("Error getting property: ", error);
      res.status(500).json({ message: "Error getting property" });
    }
  },

  addProperty: async (req, res, next) => {
    try {
      const docRef = db.collection("properties").doc(req.body.id);
      const property = await docRef.set(
        {
          id: req.body.id,
          host_id: req.body.host_id,
          country_id: req.body.country_id,
          title: req.body.title,
          imageUrl: req.body.imageUrl,
          rating: req.body.rating,
          review: req.body.review,
          location: req.body.location,
        },
        { merge: true }
      );
      res.status(200).send("Successfully added");
    } catch (error) {
      console.error("Error adding property:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  addPropertyByHost: async (req, res, next) => {
    try {
      const docRef = db.collection("properties");
      const property = await docRef.add(
        {
          // id: req.body.id,
          host_id: req.body.host_id,
          country_id: req.body.country_id,
          title: req.body.title,
          // imageUrl: req.body.imageUrl,
          // rating: req.body.rating,
          // review: req.body.review,
          homeType: req.body.homeType,
          location: req.body.location,
          facility: req.body.facility,
          totalBathrooms: req.body.totalBathrooms,
          totalBedrooms: req.body.totalBedrooms,
          totalOccupancy: req.body.totalOccupancy,
        },
        { merge: true }
      );
      res.status(200).send("Successfully added");
    } catch (error) {
      console.error("Error adding property:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPropertiesByHost: async (req, res, next) => {
    const user_id = req.params.id;

    try {
      const propertiesSnapShot = await db
        .collection("properties")
        .where("host_id", "==", user_id)
        .get();
      const properties = propertiesSnapShot.docs.map((doc) => {
        return {
          docId: doc.id,
          ...doc.data(),
        };
      });

      res.status(200).send(properties);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getBestProperties: async (req, res, next) => {
    const limit = parseInt(req.params.limit);
    try {
      const propertiesSnapshot = await db
        .collection("properties")
        .orderBy("rating", "desc")
        .limit(limit)
        .get();
      const properties = propertiesSnapshot.docs.map((doc) => doc.data());
      res.status(200).send(properties);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPropertyById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const propertySnapshot = await db.collection("properties").doc(id).get();
      const property = propertySnapshot.data();

      const hostInfoSnapshot = await db
        .collection("users")
        .doc(property.host_id)
        .get();
      const hostInfo = hostInfoSnapshot.data();
      // const host_id = property.host_id;
      property.host_info = { ...hostInfo };
      res.status(200).send(property);
    } catch (error) {
      console.error("Error getting properties:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPropertiesByCountry: async (req, res, next) => {
    const country_id = req.params.id;

    try {
      const propertiesRef = db
        .collection("properties")
        .where("country_id", "==", country_id);
      const propertiesSnapShot = await propertiesRef.get();
      const properties = propertiesSnapShot.docs.map((doc) => doc.data());

      res.status(200).send(properties);
    } catch (error) {
      console.log("Error getting properties:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getPropertiesByPlace: async (req, res, next) => {
    const place_id = req.params.id;

    try {
      const placeSnapshot = await db.collection("places").doc(place_id).get();
      const place = placeSnapshot.data();
      const country_id = place.country_id;

      const propertiesSnapshot = await db
        .collection("properties")
        .where("country_id", "==", country_id)
        .get();
      const properties = propertiesSnapshot.docs.map((doc) => doc.data());

      res.status(200).send(properties);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getBestPropertiesByPlace: async (req, res, next) => {
    const place_id = req.params.id;

    try {
      const placeSnapshot = await db.collection("places").doc(place_id).get();
      const place = placeSnapshot.data();
      const country_id = place.country_id;

      const propertiesSnapshot = await db
        .collection("properties")
        .where("country_id", "==", country_id)
        .limit(2)
        .get();
      const properties = propertiesSnapshot.docs.map((doc) => doc.data());

      res.status(200).send(properties);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getNumById: async (req, res, next) => {
    const user_id = req.params.id;

    try {
      const numSnapshot = await db
        .collection("properties")
        .where("host_id", "==", user_id)
        .get();
      const num = numSnapshot.size.toString();
      res.status(200).send(num);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
