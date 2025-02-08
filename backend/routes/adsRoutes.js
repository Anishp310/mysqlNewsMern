import express from "express";

import { createAds, deleteAds, getAdsById, getAllAds, updateAds, upload } from "../controllers/adsController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/ads", upload.single("imageData"),authenticateToken, createAds);
router.get("/getAllads", getAllAds);
router.get("/getads/:ads_id", getAdsById);
router.put("/updateads/:ads_id",authenticateToken, upload.single("imageData"),authenticateToken, updateAds);
router.delete("/deleteads/:ads_id",authenticateToken,authenticateToken, deleteAds);

export default router;
