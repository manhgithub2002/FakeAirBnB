const router = require("express").Router();
const conversationController = require("../controllers/conversationController");

router.get("/:id", conversationController.getConversationByUserId);
router.get(
  "/message/:conversation_id",
  conversationController.getMessageByConversationId
);
router.post("/addMessage", conversationController.sendMessage);

module.exports = router;
