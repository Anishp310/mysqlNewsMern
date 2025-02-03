import express from "express";
import {
  createNational,
  getAllNationals,
  getNationalById,
  updateNational,
  deleteNational,
  upload,
} from "../controllers/nationalController.js";
import multer from "multer"

const router = express.Router();

router.post("/national", upload.single("image"), createNational);
router.get("/getAllNational", getAllNationals);
router.get("/getNational/:national_id", getNationalById);
router.put("/updateNational/:national_id", upload.single("image"), updateNational);
router.delete("/deleteNational/:national_id", deleteNational);

export default router;
