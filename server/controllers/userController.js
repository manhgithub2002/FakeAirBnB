const { db } = require("../helper");
module.exports = {
  // deleteUser: async (req, res, next) => {
  //   try {
  //     // await User.findByIdAndDelete(req.params.id);

  //     res.status(200).send({ data: "this is the body" });
  //   } catch (error) {
  //     return next(error);
  //   }
  // },

  getUsers: async (req, res, next) => {
    try {
      const userRef = await db.collection("users").get();
      const docSnap = userRef.docs.map((docSnap) => docSnap.data());

      res.status(200).send(docSnap);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
    // const peopleRef = db.collection("users").doc("a");
    // const doc = await peopleRef.get();
    // if (!doc.exists) {
    //   return res.sendStatus(400);
    // }

    // res.status(200).send(doc.data());
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

  // addUser: async (req, res, next) => {
  //   try {
  //     // const user = await User.findById(
  //     //   { _id: user_id },
  //     //   { password: 0, __v: 0, createdAt: 0, updateAt: 0 }
  //     // );

  //     // if (!user) {
  //     //   return res
  //     //     .status(401)
  //     //     .json({ status: false, message: "User not exist" });
  //     // }
  //     console.log("Reg: ", req.body);
  //     res.status(200).send({ ...req.body });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },

  // addUserQuery: async (req, res, next) => {
  //   try {
  //     // const user = await User.findById(
  //     //   { _id: user_id },
  //     //   { password: 0, __v: 0, createdAt: 0, updateAt: 0 }
  //     // );

  //     // if (!user) {
  //     //   return res
  //     //     .status(401)
  //     //     .json({ status: false, message: "User not exist" });
  //     // }
  //     console.log("Query: ", req.query);
  //     res.status(200).send({ ...req.query });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
