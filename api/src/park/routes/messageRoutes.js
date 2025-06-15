import { Router } from "express";
import multer from "multer";
import messageController from "../controllers/messageController.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/send",upload.single("file"), messageController.sendMessage);
router.get("/", messageController.getMessages);
router.get("/sender/:id", messageController.getMessageBySenderId);
router.get("/reciever/:id", messageController.getMessageByRecieverId);
router.get('/:message_id', messageController.getMessageMessageById);
router.delete("/:id", messageController.deleteMessage);
router.put("/:id", messageController.updateMessage);
router.put("/:id/updateStatus", messageController.updateMessageStatus);
router.put("/:userId/updateAllAsSeen", messageController.updateAllMessagesAsSeen);
export default router;
