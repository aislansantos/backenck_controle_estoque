import { Router } from "express";
import * as AuthController from "@/controllers/Auth.Controller";

const router = Router();

router.post("/", AuthController.login);

export default router;
