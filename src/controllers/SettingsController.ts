import { Request, Response } from "express";
import { Repository, getCustomRepository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { SettingsService } from "../services/SettingsService";

export class SettingsController {
  async create(req: Request, res: Response) {
    const { chat, username } = req.body;

    try {
      const settingsService = new SettingsService();

      const settings = await settingsService.create({ username, chat });

      return res.json(settings);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
