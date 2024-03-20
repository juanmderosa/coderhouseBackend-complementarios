import { Router } from "express";
import { messageManager } from "../dao/services/messageManager.js";

export const messageRouter = Router();

messageRouter.post("/", async (req, res) => {
  const newMessage = req.body;
  try {
    await messageManager.createMessage(newMessage);
    res.json({ status: "succes" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

messageRouter.get("/", async (req, res) => {
  const messages = await messageManager.getMessages();
  try {
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
