import express from "express";
import {
 
  createOthers,
  deleteOthers,
  getAllOtherss,
  getOthersById,
  updateOthers,
  upload,
} from "../controllers/othersController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/others", upload.single("imageData"),authenticateToken, createOthers);
router.get("/getAllothers", getAllOtherss);
router.get("/getothers/:others_id", getOthersById);
router.put("/updateothers/:others_id", upload.single("imageData"),authenticateToken, updateOthers);
router.delete("/deleteothers/:others_id",authenticateToken, deleteOthers);

export default router;
