import express from "express";
import {

  createInternational,
  deleteInternational,
  getAllInternationals,
  getInternationalById,
  updateInternational,
  upload,
} from "../controllers/internationalController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/international", upload.single("imageData"),authenticateToken, createInternational);
router.get("/getAllinternational", getAllInternationals);
router.get("/getinternational/:international_id", getInternationalById);
router.put("/updateinternational/:international_id", upload.single("imageData"),authenticateToken, updateInternational);
router.delete("/deleteinternational/:international_id",authenticateToken, deleteInternational);

export default router;
