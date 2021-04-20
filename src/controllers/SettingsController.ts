import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { Request, Response } from "express";

export class SettingsController {
  async create(req: Request, res: Response) {
    const { chat, username } = req.body;

    const settingsRepository = getCustomRepository(SettingsRepository);

    const settings = settingsRepository.create({ chat, username });

    await settingsRepository.save(settings);

    return res.json(settings);
  }
}
