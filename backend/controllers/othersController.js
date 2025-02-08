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

export const createOthers = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageData = req.file ? req.file.buffer : null;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Insert the record first to get the others_id
    const [result] = await pool.execute(
      "INSERT INTO others (title, description, image_data) VALUES (?, ?, ?)",
      [title, description, imageData]
    );

    const others_id = result.insertId; // Get the inserted others_id

    // Generate slug: others_id + title
    const slug = `${others_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // Update the record with the generated slug
    await pool.execute(
      "UPDATE others SET slug = ? WHERE others_id = ?",
      [slug, others_id]
    );

    res.status(201).json({ message: "others record created successfully" });
  } catch (error) {
    console.error("Error creating others record:", error);
    res.status(500).json({ message: "Error creating others record", error: error.message });
  }
};
// Update a others record
export const updateOthers = async (req, res) => {
  const { others_id } = req.params;
  const { title, description } = req.body;

  try {
    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // If there's a new image, use it. If not, keep the current image.
    const imageData = req.file ? req.file.buffer : null;

    // First, get the current image and title from the database to retain it if no new image or title is uploaded.
    const [existingRecord] = await pool.execute("SELECT image_data, title FROM others WHERE others_id = ?", [others_id]);

    // If the record does not exist, return a 404 error
    if (existingRecord.length === 0) {
      return res.status(404).json({ message: `others record with ID ${others_id} not found` });
    }

    const currentImage = existingRecord[0].image_data;
    const currentTitle = existingRecord[0].title;

    // Generate a new slug using others_id + title
    const slug = `${others_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // If no new image is uploaded, use the existing image.
    const finalImageData = imageData || currentImage;

    // Update the others record with the new data and generated slug
    const [updateResult] = await pool.execute(
      "UPDATE others SET title = ?, description = ?, image_data = ?, slug = ? WHERE others_id = ?",
      [title, description, finalImageData, slug, others_id]
    );

    // If no rows were affected, the record doesn't exist or wasn't updated
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: `others record with ID ${others_id} not found` });
    }

    res.status(200).json({ message: "others record updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating others record", error: error.message });
  }
};



// Get all others records
export const getAllOtherss = async (req, res) => {
  try {
    const [otherss] = await pool.execute("SELECT * FROM others");

    const othersData = otherss.map((record) => ({
      ...record,
      image_data: record.image_data
        ? `data:image/jpeg;base64,${record.image_data.toString("base64")}`
        : null,
    }));

    res.status(200).json(othersData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving others records", error: error.message });
  }
};

// Get a single others record by ID
export const getOthersById = async (req, res) => {
  const { others_id } = req.params;
  try {
    const [others] = await pool.execute("SELECT * FROM others WHERE others_id = ?", [others_id]);

    if (others.length === 0) {
      return res.status(404).json({ message: `others record with ID ${others_id} not found` });
    }

    const imageBase64 = others[0].image_data
      ? `data:image/jpeg;base64,${others[0].image_data.toString("base64")}`
      : null;

    res.status(200).json({
      ...others[0],
      image_data: imageBase64,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving others record", error: error.message });
  }
};





// Delete a others record
export const deleteOthers = async (req, res) => {
  const { others_id } = req.params;
  try {
    const [record] = await pool.execute("SELECT * FROM others WHERE others_id = ?", [others_id]);

    if (record.length === 0) {
      return res.status(404).json({ message: `others record with ID ${others_id} not found` });
    }

    await pool.execute("DELETE FROM others WHERE others_id = ?", [others_id]);

    res.status(200).json({ message: "others record deleted successfully", data: record[0] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting others record", error: error.message });
  }
};
