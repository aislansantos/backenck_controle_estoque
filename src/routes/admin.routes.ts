import { Router } from "express";
import * as UserController from "@/controllers/user.Controller";
import { Auth } from "@/middleware/Auth.Middleware";

const router = Router();

// teste rota
router.get("/ping", UserController.ping);

router.get("/users/", Auth.private, UserController.getAll);
router.get("/users/:id", Auth.private, UserController.getUser);
router.post("/users/", Auth.private, UserController.addUser);
router.put("/users/:id", Auth.private, UserController.updateUser);

export default router;
