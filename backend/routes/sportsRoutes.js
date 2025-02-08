import express from "express";
import {
  createSports,
  deleteSports,
  getAllSports,
  getSportsById,
  updateSports,
  upload,
} from "../controllers/sportsController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/sports", upload.single("imageData"),authenticateToken, createSports);
router.get("/getAllsports", getAllSports);
router.get("/getsports/:sports_id", getSportsById);
router.put("/updatesports/:sports_id", upload.single("imageData"),authenticateToken, updateSports);
router.delete("/deletesports/:sports_id",authenticateToken, deleteSports);

export default router;
