import { Router } from "express";
import * as UserController from "@/controllers/user.Controller";

const router = Router();

// teste rota
router.get("/ping", UserController.ping);

router.get("/users/", UserController.getAll);
router.get("/users/:id", UserController.getUser);
router.post("/users/", UserController.addUser);
// router.put("/users/:id", UserController.updateUser);

router.get("/users/");

export default router;
