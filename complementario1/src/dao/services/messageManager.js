import __dirname from "../../utils.js";
import messagesModel from "../models/messages.js";

class MessageManager {
  async createMessage(message) {
    let result = await messagesModel.create(message);
    console.log(result);
    return result;
  }

  async getMessages() {
    let result = await messagesModel.find();
    console.log(result);
    return result;
  }
}

export const messageManager = new MessageManager();
