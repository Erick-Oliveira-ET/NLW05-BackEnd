import { Request, Response } from "express";
import { MessagesService } from "../services/MessagesService";

export class MessagesController {
  async create(req: Request, res: Response) {
    const messagesService = new MessagesService();
    const { admin_id, text, user_id } = req.body;

    try {
      const message = await messagesService.create({ admin_id, text, user_id });

      return res.json(message);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async showByUser(req: Request, res: Response) {
    const messagesService = new MessagesService();
    const { id } = req.params;

    const list = await messagesService.listByUser(id);

    return res.json(list);
  }
}
