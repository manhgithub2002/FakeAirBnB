const { db } = require("../helper");
module.exports = {
  addOrder: async (req, res, next) => {
    try {
      const orderRef = db.collection("orders");
      await orderRef.add(
        {
          guestId: req.body.guestId,
          propertyId: req.body.propertyId,
          guestNumber: req.body.guestNumber,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        },
        { merge: true }
      );
      res.status(200).send("Successfully added");
    } catch (error) {
      console.error("Error adding property:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getOrderByUserId: async (req, res, next) => {
    guestId = req.params.id;
    try {
      const ordersSnapshot = await db
        .collection("orders")
        .where("guestId", "==", guestId)
        .get();
      const orders = ordersSnapshot.docs.map((doc) => doc.data());
      res.status(200).send(orders);
    } catch (error) {
      console.error("Error getting properties:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getOrderById: async (req, res, next) => {
    id = req.params.id;
    console.log(id);
    try {
      const orderSnapshot = await db.collection("orders").doc(id).get();
      const order = orderSnapshot.data();
      const propertyInfoSnapshot = await db
        .collection("properties")
        .doc(order.propertyId)
        .get();
      const propertyInfo = propertyInfoSnapshot.data();
      info = { ...order, ...propertyInfo };
      res.status(200).send(info);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getOrderByPropertyId: async (req, res, next) => {
    propertyId = req.params.id;
    console.log(propertyId);
    try {
      const orderSnapshot = await db
        .collection("orders")
        .where("propertyId", "==", propertyId)
        .get();
      const order = orderSnapshot.docs.map((doc) => doc.data());
      // console.log(order);
      res.status(200).send(order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
};
