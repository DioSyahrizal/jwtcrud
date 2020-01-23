import express from "express";
import { moviesController } from "../controllers/movies";

const router = express.Router();

router.get("/", moviesController.getAll);
router.post("/", moviesController.create);
router.get("/:movieId", moviesController.getById);
router.put("/:movieId", moviesController.updateById);
router.delete("/:movieId", moviesController.deleteById);

export default router;
