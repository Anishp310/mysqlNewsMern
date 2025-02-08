import express from "express";
import {
  
  createEconomic,
  deleteEconomic,
  getAllEconomics,
  getEconomicById,
  updateEconomic,
  upload,
} from "../controllers/economicController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/economic", upload.single("imageData"),authenticateToken, createEconomic);
router.get("/getAlleconomic", getAllEconomics);
router.get("/geteconomic/:economic_id", getEconomicById);
router.put("/updateeconomic/:economic_id", upload.single("imageData"),authenticateToken, updateEconomic);
router.delete("/deleteeconomic/:economic_id",authenticateToken, deleteEconomic);

export default router;
