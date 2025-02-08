import multer from "multer";
import pool from "../lib/db.js";
const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});


// Create Image (using multer)
export const createImage = async (req, res) => {
  try {
    console.log("Request file:", req.file);
    console.log("Request body:", req.body);
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imageData = req.file.buffer;  // Image data buffer from multer
    const { position } = req.body; // Get the position from the request body

    // Check if position is provided and is a valid number
    if (!position || isNaN(position)) {
      return res.status(400).json({ message: "Valid position is required" });
    }
    // Insert image into database
    await pool.query(
      "INSERT INTO images (image_data, position) VALUES (?, ?)",
      [imageData, position]
    );

    // Fetch the inserted image (manually after insert)
    const [newImage] = await pool.query("SELECT * FROM images ORDER BY image_id DESC LIMIT 1");

    res.status(201).json({
      message: "Image created successfully",
      data: newImage[0],  // Return the inserted image record
    });
  } catch (error) {
    console.error("Error creating image:", error.message);
    res.status(500).json({
      message: "Server error, unable to create image",
      error: error.message,
    });
  }
};

// Update Image (using multer)
export const updateImage = async (req, res) => {
  const { image_id } = req.params;

  if (!image_id) {
    return res.status(400).json({ message: "Image ID is required" });
  }

  try {
    // Check if a new file is uploaded
    if (req.file) {
      const imageData = req.file.buffer; // New image data from multer

      // Update the image data
      const [updatedImage] = await pool.query(
        "UPDATE images SET image_data = ? WHERE image_id = ?",
        [imageData, image_id]
      );

      if (updatedImage.affectedRows === 0) {
        return res.status(404).json({
          message: `Image with ID ${image_id} not found`,
        });
      }
    }

    // If position is being updated, handle it
    const { position } = req.body; // Get the new position from the request body
    if (position) {
      const [existingPosition] = await pool.query("SELECT * FROM images WHERE position = ?", [position]);
      if (existingPosition.length > 0) {
        return res.status(400).json({ message: "Position already taken" });
      }

      // Update the position if provided
      const [updatePosition] = await pool.query(
        "UPDATE images SET position = ? WHERE image_id = ?",
        [position, image_id]
      );

      if (updatePosition.affectedRows === 0) {
        return res.status(404).json({
          message: `Image with ID ${image_id} not found for position update`,
        });
      }
    }

    // Fetch the updated (or unchanged) image data
    const [image] = await pool.query("SELECT * FROM images WHERE image_id = ?", [image_id]);

    res.status(200).json({
      message: "Image updated successfully",
      data: image[0], // Return the updated or retained image data
    });
  } catch (error) {
    console.error("Error updating image:", error.message);
    res.status(500).json({
      message: "Server error, unable to update image",
      error: error.message,
    });
  }
};


// Get All Images
export const getAllImages = async (req, res) => {
  try {
    const [getAllImages] = await pool.query("SELECT * FROM images ORDER BY position ASC");

    // Convert binary image data to Base64 for each image
    const imagesWithBase64 = getAllImages.map((image) => ({
      ...image,
      image_data: `data:image/jpeg;base64,${image.image_data.toString('base64')}`,  // Assuming image data is binary
    }));

    res.status(200).json(imagesWithBase64);  // Return all images with Base64 data
  } catch (error) {
    console.error("Error retrieving images:", error.message);
    res.status(500).json({
      message: "Server error, unable to retrieve images",
      error: error.message,
    });
  }
};

// Delete All Images
// export const deleteAllImages = async (req, res) => {
//   try {
//     // Delete all images
//     const [deleteResult] = await pool.query("DELETE FROM images");

//     // Check if any rows were deleted
//     if (deleteResult.affectedRows === 0) {
//       return res.status(404).json({
//         message: "No images found to delete",
//       });
//     }

//     res.status(200).json({
//       message: "All images deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting all images:", error.message);
//     res.status(500).json({
//       message: "Server error, unable to delete images",
//       error: error.message,
//     });
//   }
// };

export const deleteImage = async (req, res) => {
  // Get the image ID from URL parameters
  const { image_id } = req.params;

  // If image_id is not provided, send a 400 response
  if (!image_id) {
    return res.status(400).json({ message: "Image ID is required" });
  }

  try {
    // Execute the DELETE query for the provided image_id
    const [deleteResult] = await pool.query(
      "DELETE FROM images WHERE image_id = ?",
      [image_id]
    );

    // If no rows were affected, the image was not found
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ message: `Image with ID ${image_id} not found` });
    }

    // On successful deletion, send a 200 response with a success message
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error.message);
    res.status(500).json({
      message: "Server error, unable to delete image",
      error: error.message,
    });
  }
};
