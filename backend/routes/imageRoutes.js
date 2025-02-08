import express from "express";
import { createImage, getAllImages, updateImage, deleteImage, upload } from "../controllers/imageController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

// Route to create a new GIF image
router.post("/image", upload.single("imageData"), authenticateToken, createImage);

// Route to get all images
router.get("/getAllImages", getAllImages);

// Route to update an existing image by ID
router.put("/updateImage/:image_id", upload.single("imageData"), authenticateToken, updateImage);

// Route to delete a single image by ID
router.delete("/deleteImage/:image_id", authenticateToken, deleteImage);

export default router;
