const { db, admin } = require("../helper");
// const { serverTimestamp } = require("firebase/firestore");

module.exports = {
  getConversationByUserId: async (req, res, next) => {
    const userId = req.params.id;
    try {
      // Get data
      const conversationsSnapShot = await db
        .collection("conversations")
        .where("users", "array-contains", userId)
        .get();

      const conversationsData = await Promise.all(
        conversationsSnapShot.docs.map(async (conversation) => {
          const otherUserId = conversation
            .data()
            .users.find((id) => id !== userId);
          const userInfo = await getOtherUserInfo(otherUserId);

          return {
            id: conversation.id,
            ...conversation.data(),
            otherUserInfo: userInfo,
          };
        })
      );

      res.status(200).json(conversationsData);
    } catch (error) {
      console.log("Error getting property: ", error);
      res.status(500).json({ message: "Error getting property" });
    }
  },

  getMessageByConversationId: async (req, res, next) => {
    conversation_id = req.params.conversation_id;
    try {
      const messagesSnapShot = await db
        .collection("messages")
        .where("conversation_id", "==", conversation_id)
        .orderBy("sent_at", "asc")
        .get();

      const messages = messagesSnapShot.docs.map((doc) =>
        transfromMessage(doc)
      );

      res.status(200).json(messages);
    } catch (error) {
      console.log("Error getting message", error);
      res.status(500).json({ message: "Error getting message" });
    }
  },

  sendMessage: async (req, res, next) => {
    try {
      console.log(admin.firestore.FieldValue.serverTimestamp());
      await db.collection("messages").add({
        conversation_id: req.body.conversation_id,
        // sent_at: admin.firestore.FieldValue.serverTimestamp(),
        sent_at: req.body.sent_at,
        text: req.body.text,
        sent_at: admin.firestore.FieldValue.serverTimestamp(),
        user: req.body.user,
      });
      res.status(200).send("Successfully added");
    } catch (error) {
      console.log("Error sending message", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

const getOtherUserInfo = async (id) => {
  try {
    const userSnapshot = await db.collection("users").doc(id).get();
    const user = userSnapshot.data();

    return user;
  } catch (error) {
    console.log(error);
  }
};

const convertFirestoreTimestampToString = (timestamp) =>
  new Date(timestamp.toDate().getTime()).toLocaleString();

const transfromMessage = (message) => ({
  id: message.id,
  ...message.data(),
  sent_at: message.data().sent_at
    ? convertFirestoreTimestampToString(message.data().sent_at)
    : null,
});
