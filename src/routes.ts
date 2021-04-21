import { Router } from "express";
import { MessagesController } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

// Settings
routes.post("/setting", settingsController.create);

// User
routes.post("/user", usersController.create);

// Messages
routes.get("/message/:id", messagesController.showByUser);
routes.post("/message", messagesController.create);

export { routes };
