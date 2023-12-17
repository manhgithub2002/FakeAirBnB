const { db } = require("../helper");
module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const userRef = await db.collection("users").get();
      const docSnap = userRef.docs.map((docSnap) => docSnap.data());

      res.status(200).send(docSnap);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  },

  getUserById: async (req, res, next) => {
    const userId = req.params.id;

    try {
      const userSnapshot = await db.collection("users").doc(userId).get();
      const user = userSnapshot.data();

      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
