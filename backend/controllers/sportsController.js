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

export const createSports = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageData = req.file ? req.file.buffer : null;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Insert the record first to get the sports_id
    const [result] = await pool.execute(
      "INSERT INTO sports (title, description, image_data) VALUES (?, ?, ?)",
      [title, description, imageData]
    );

    const sports_id = result.insertId; // Get the inserted sports_id

    // Generate slug: sports_id + title
    const slug = `${sports_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // Update the record with the generated slug
    await pool.execute(
      "UPDATE sports SET slug = ? WHERE sports_id = ?",
      [slug, sports_id]
    );

    res.status(201).json({ message: "sports record created successfully" });
  } catch (error) {
    console.error("Error creating sports record:", error);
    res.status(500).json({ message: "Error creating sports record", error: error.message });
  }
};
// Update a sports record
export const updateSports = async (req, res) => {
  const { sports_id } = req.params;
  const { title, description } = req.body;

  try {
    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // If there's a new image, use it. If not, keep the current image.
    const imageData = req.file ? req.file.buffer : null;

    // First, get the current image and title from the database to retain it if no new image or title is uploaded.
    const [existingRecord] = await pool.execute("SELECT image_data, title FROM sports WHERE sports_id = ?", [sports_id]);

    // If the record does not exist, return a 404 error
    if (existingRecord.length === 0) {
      return res.status(404).json({ message: `sports record with ID ${sports_id} not found` });
    }

    const currentImage = existingRecord[0].image_data;
    const currentTitle = existingRecord[0].title;

    // Generate a new slug using sports_id + title
    const slug = `${sports_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // If no new image is uploaded, use the existing image.
    const finalImageData = imageData || currentImage;

    // Update the sports record with the new data and generated slug
    const [updateResult] = await pool.execute(
      "UPDATE sports SET title = ?, description = ?, image_data = ?, slug = ? WHERE sports_id = ?",
      [title, description, finalImageData, slug, sports_id]
    );

    // If no rows were affected, the record doesn't exist or wasn't updated
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: `sports record with ID ${sports_id} not found` });
    }

    res.status(200).json({ message: "sports record updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating sports record", error: error.message });
  }
};



// Get all sports records
export const getAllSports = async (req, res) => {
  try {
    const [sportss] = await pool.execute("SELECT * FROM sports");

    const sportsData = sportss.map((record) => ({
      ...record,
      image_data: record.image_data
        ? `data:image/jpeg;base64,${record.image_data.toString("base64")}`
        : null,
    }));

    res.status(200).json(sportsData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sports records", error: error.message });
  }
};

// Get a single sports record by ID
export const getSportsById = async (req, res) => {
  const { sports_id } = req.params;
  try {
    const [sports] = await pool.execute("SELECT * FROM sports WHERE sports_id = ?", [sports_id]);

    if (sports.length === 0) {
      return res.status(404).json({ message: `sports record with ID ${sports_id} not found` });
    }

    const imageBase64 = sports[0].image_data
      ? `data:image/jpeg;base64,${sports[0].image_data.toString("base64")}`
      : null;

    res.status(200).json({
      ...sports[0],
      image_data: imageBase64,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sports record", error: error.message });
  }
};



// Delete a sports record
export const deleteSports = async (req, res) => {
  const { sports_id } = req.params;
  try {
    const [record] = await pool.execute("SELECT * FROM sports WHERE sports_id = ?", [sports_id]);

    if (record.length === 0) {
      return res.status(404).json({ message: `sports record with ID ${sports_id} not found` });
    }

    await pool.execute("DELETE FROM sports WHERE sports_id = ?", [sports_id]);

    res.status(200).json({ message: "sports record deleted successfully", data: record[0] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sports record", error: error.message });
  }
};
