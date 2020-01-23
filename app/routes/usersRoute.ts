import express from "express";
import { UserController } from "../controllers/users";

const router = express.Router();

router.post("/register", UserController.create);
router.post("/login", UserController.authenticate);

export default router;
