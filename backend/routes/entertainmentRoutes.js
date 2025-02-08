import express from "express";
import {

  createEntertainment,
  deleteEntertainment,
  getAllEntertainments,
  getEntertainmentById,
  updateEntertainment,
  upload,
} from "../controllers/entertainmentController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/entertainment", upload.single("imageData"),authenticateToken, createEntertainment);
router.get("/getAllentertainment", getAllEntertainments);
router.get("/getentertainment/:entertainment_id", getEntertainmentById);
router.put("/updateentertainment/:entertainment_id", upload.single("imageData"),authenticateToken, updateEntertainment);
router.delete("/deleteentertainment/:entertainment_id",authenticateToken, deleteEntertainment);

export default router;
