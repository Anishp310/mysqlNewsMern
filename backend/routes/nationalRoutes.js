import express from "express";
import {
  createNational,
  getAllNationals,
  getNationalById,
  updateNational,
  deleteNational,
  upload,
} from "../controllers/nationalController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/national", upload.single("imageData"),authenticateToken, createNational);
router.get("/getAllNational", getAllNationals);
router.get("/getNational/:slug", getNationalById);
router.put("/updateNational/:national_id", upload.single("imageData"),authenticateToken, updateNational);
router.delete("/deleteNational/:national_id",authenticateToken, deleteNational);

export default router;
