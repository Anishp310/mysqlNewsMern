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

export const createInternational = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageData = req.file ? req.file.buffer : null;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Insert the record first to get the international_id
    const [result] = await pool.execute(
      "INSERT INTO international (title, description, image_data) VALUES (?, ?, ?)",
      [title, description, imageData]
    );

    const international_id = result.insertId; // Get the inserted international_id

    // Generate slug: international_id + title
    const slug = `${international_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // Update the record with the generated slug
    await pool.execute(
      "UPDATE international SET slug = ? WHERE international_id = ?",
      [slug, international_id]
    );

    res.status(201).json({ message: "international record created successfully" });
  } catch (error) {
    console.error("Error creating international record:", error);
    res.status(500).json({ message: "Error creating international record", error: error.message });
  }
};
// Update a international record
export const updateInternational = async (req, res) => {
  const { international_id } = req.params;
  const { title, description } = req.body;

  try {
    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // If there's a new image, use it. If not, keep the current image.
    const imageData = req.file ? req.file.buffer : null;

    // First, get the current image and title from the database to retain it if no new image or title is uploaded.
    const [existingRecord] = await pool.execute("SELECT image_data, title FROM international WHERE international_id = ?", [international_id]);

    // If the record does not exist, return a 404 error
    if (existingRecord.length === 0) {
      return res.status(404).json({ message: `international record with ID ${international_id} not found` });
    }

    const currentImage = existingRecord[0].image_data;
    const currentTitle = existingRecord[0].title;

    // Generate a new slug using international_id + title
    const slug = `${international_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // If no new image is uploaded, use the existing image.
    const finalImageData = imageData || currentImage;

    // Update the international record with the new data and generated slug
    const [updateResult] = await pool.execute(
      "UPDATE international SET title = ?, description = ?, image_data = ?, slug = ? WHERE international_id = ?",
      [title, description, finalImageData, slug, international_id]
    );

    // If no rows were affected, the record doesn't exist or wasn't updated
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: `international record with ID ${international_id} not found` });
    }

    res.status(200).json({ message: "international record updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating international record", error: error.message });
  }
};


// Get all international records
export const getAllInternationals = async (req, res) => {
  try {
    const [internationals] = await pool.execute("SELECT * FROM international");

    const internationalData = internationals.map((record) => ({
      ...record,
      image_data: record.image_data
        ? `data:image/jpeg;base64,${record.image_data.toString("base64")}`
        : null,
    }));

    res.status(200).json(internationalData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving international records", error: error.message });
  }
};

// Get a single international record by ID
export const getInternationalById = async (req, res) => {
  const { international_id } = req.params;
  try {
    const [international] = await pool.execute("SELECT * FROM international WHERE international_id = ?", [international_id]);

    if (international.length === 0) {
      return res.status(404).json({ message: `international record with ID ${international_id} not found` });
    }

    const imageBase64 = international[0].image_data
      ? `data:image/jpeg;base64,${international[0].image_data.toString("base64")}`
      : null;

    res.status(200).json({
      ...international[0],
      image_data: imageBase64,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving international record", error: error.message });
  }
};




// Delete a international record
export const deleteInternational = async (req, res) => {
  const { international_id } = req.params;
  try {
    const [record] = await pool.execute("SELECT * FROM international WHERE international_id = ?", [international_id]);

    if (record.length === 0) {
      return res.status(404).json({ message: `international record with ID ${international_id} not found` });
    }

    await pool.execute("DELETE FROM international WHERE international_id = ?", [international_id]);

    res.status(200).json({ message: "international record deleted successfully", data: record[0] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting international record", error: error.message });
  }
};
