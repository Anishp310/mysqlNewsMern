import express from "express";
import {

  createInformation,
  deleteInformation,
  getAllInformations,
  getInformationById,
  updateInformation,
  upload,
} from "../controllers/informationController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/information", upload.single("imageData"),authenticateToken, createInformation);
router.get("/getAllinformation", getAllInformations);
router.get("/getinformation/:information_id", getInformationById);
router.put("/updateinformation/:information_id", upload.single("imageData"),authenticateToken, updateInformation);
router.delete("/deleteinformation/:information_id",authenticateToken, deleteInformation);

export default router;
