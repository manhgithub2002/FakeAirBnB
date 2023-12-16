const { db } = require("../helper");

module.exports = {
  //   getProperties: async (req, res, next) => {
  //     try {
  //       // Get data
  //       const propertiesSnapShot = await db.collection("properties").get();
  //       const properties = propertiesSnapShot.docs.map((doc) => doc.data());

  //       res.status(200).json(properties);

  //       console.log({ properties });
  //     } catch (error) {
  //       console.log("Error getting property: ", error);
  //       res.status(500).json({ message: "Error getting property" });
  //     }
  //   },

  addFacility: async (req, res, next) => {
    const propertyId = req.params.id;
    try {
      const docRef = db.collection("facilities").doc(req.body.id);
      const facility = await docRef.set(
        {
          id: req.body.id,
          property_id: req.body.property_id,
          has_tv: req.body.has_tv,
          has_kitchen: req.body.has_kitchen,
          has_aircon: req.body.has_aircon,
          has_heating: req.body.has_heating,
          wifi: req.body.wifi,
          totalOccupancy: req.body.totalOccupancy,
          totalBedrooms: req.body.totalBedrooms,
          totalBathrooms: req.body.totalBathrooms,
        },
        { merge: true }
      );
      res.status(200).send("Successfully added");
    } catch (error) {
      console.error("Error adding property:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getFacilityByPropertyId: async (req, res, next) => {
    const property_id = req.params.id;

    try {
      const facilitySnapshot = await db
        .collection("facilities")
        .where("facility_id", property_id)
        .get();
      res.status(200).send(facilitySnapshot);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
