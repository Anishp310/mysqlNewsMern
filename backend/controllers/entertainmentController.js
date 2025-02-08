import multer from "multer";
import pool from "../lib/db.js";

const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

export const createEntertainment = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageData = req.file ? req.file.buffer : null;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Insert the record first to get the entertainment_id
    const [result] = await pool.execute(
      "INSERT INTO entertainment (title, description, image_data) VALUES (?, ?, ?)",
      [title, description, imageData]
    );

    const entertainment_id = result.insertId; // Get the inserted entertainment_id

    // Generate slug: entertainment_id + title
    const slug = `${entertainment_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // Update the record with the generated slug
    await pool.execute(
      "UPDATE entertainment SET slug = ? WHERE entertainment_id = ?",
      [slug, entertainment_id]
    );

    res.status(201).json({ message: "entertainment record created successfully" });
  } catch (error) {
    console.error("Error creating entertainment record:", error);
    res.status(500).json({ message: "Error creating entertainment record", error: error.message });
  }
};
// Update a entertainment record
export const updateEntertainment = async (req, res) => {
  const { entertainment_id } = req.params;
  const { title, description } = req.body;

  try {
    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // If there's a new image, use it. If not, keep the current image.
    const imageData = req.file ? req.file.buffer : null;

    // First, get the current image and title from the database to retain it if no new image or title is uploaded.
    const [existingRecord] = await pool.execute("SELECT image_data, title FROM entertainment WHERE entertainment_id = ?", [entertainment_id]);

    // If the record does not exist, return a 404 error
    if (existingRecord.length === 0) {
      return res.status(404).json({ message: `entertainment record with ID ${entertainment_id} not found` });
    }

    const currentImage = existingRecord[0].image_data;
    const currentTitle = existingRecord[0].title;

    // Generate a new slug using entertainment_id + title
    const slug = `${entertainment_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // If no new image is uploaded, use the existing image.
    const finalImageData = imageData || currentImage;

    // Update the entertainment record with the new data and generated slug
    const [updateResult] = await pool.execute(
      "UPDATE entertainment SET title = ?, description = ?, image_data = ?, slug = ? WHERE entertainment_id = ?",
      [title, description, finalImageData, slug, entertainment_id]
    );

    // If no rows were affected, the record doesn't exist or wasn't updated
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: `entertainment record with ID ${entertainment_id} not found` });
    }

    res.status(200).json({ message: "entertainment record updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating entertainment record", error: error.message });
  }
};



// Get all entertainment records
export const getAllEntertainments = async (req, res) => {
  try {
    const [entertainments] = await pool.execute("SELECT * FROM entertainment");

    const entertainmentData = entertainments.map((record) => ({
      ...record,
      image_data: record.image_data
        ? `data:image/jpeg;base64,${record.image_data.toString("base64")}`
        : null,
    }));

    res.status(200).json(entertainmentData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving entertainment records", error: error.message });
  }
};

// Get a single entertainment record by ID
export const getEntertainmentById = async (req, res) => {
  const { entertainment_id } = req.params;
  try {
    const [entertainment] = await pool.execute("SELECT * FROM entertainment WHERE entertainment_id = ?", [entertainment_id]);

    if (entertainment.length === 0) {
      return res.status(404).json({ message: `entertainment record with ID ${entertainment_id} not found` });
    }

    const imageBase64 = entertainment[0].image_data
      ? `data:image/jpeg;base64,${entertainment[0].image_data.toString("base64")}`
      : null;

    res.status(200).json({
      ...entertainment[0],
      image_data: imageBase64,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving entertainment record", error: error.message });
  }
};




// Delete a entertainment record
export const deleteEntertainment = async (req, res) => {
  const { entertainment_id } = req.params;
  try {
    const [record] = await pool.execute("SELECT * FROM entertainment WHERE entertainment_id = ?", [entertainment_id]);

    if (record.length === 0) {
      return res.status(404).json({ message: `entertainment record with ID ${entertainment_id} not found` });
    }

    await pool.execute("DELETE FROM entertainment WHERE entertainment_id = ?", [entertainment_id]);

    res.status(200).json({ message: "entertainment record deleted successfully", data: record[0] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting entertainment record", error: error.message });
  }
};
