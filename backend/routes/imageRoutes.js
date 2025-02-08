import express from "express";
import multer from "multer";
import {
  createImage,
  getAllImages,
  updateImage,
  deleteImage,
} from "../controllers/imageController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Routes
router.post("/image", upload.single("imageData"), createImage);
router.get("/getAllImages", getAllImages);
router.put("/updateImage/:image_id", upload.single("imageData"), updateImage);
router.delete("/deleteImage/:image_id", deleteImage);

export default router;
