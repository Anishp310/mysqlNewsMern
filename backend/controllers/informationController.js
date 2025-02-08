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

export const createInformation = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageData = req.file ? req.file.buffer : null;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Insert the record first to get the information_id
    const [result] = await pool.execute(
      "INSERT INTO information (title, description, image_data) VALUES (?, ?, ?)",
      [title, description, imageData]
    );

    const information_id = result.insertId; // Get the inserted information_id

    // Generate slug: information_id + title
    const slug = `${information_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // Update the record with the generated slug
    await pool.execute(
      "UPDATE information SET slug = ? WHERE information_id = ?",
      [slug, information_id]
    );

    res.status(201).json({ message: "information record created successfully" });
  } catch (error) {
    console.error("Error creating information record:", error);
    res.status(500).json({ message: "Error creating information record", error: error.message });
  }
};
// Update a information record
export const updateInformation = async (req, res) => {
  const { information_id } = req.params;
  const { title, description } = req.body;

  try {
    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // If there's a new image, use it. If not, keep the current image.
    const imageData = req.file ? req.file.buffer : null;

    // First, get the current image and title from the database to retain it if no new image or title is uploaded.
    const [existingRecord] = await pool.execute("SELECT image_data, title FROM information WHERE information_id = ?", [information_id]);

    // If the record does not exist, return a 404 error
    if (existingRecord.length === 0) {
      return res.status(404).json({ message: `information record with ID ${information_id} not found` });
    }

    const currentImage = existingRecord[0].image_data;
    const currentTitle = existingRecord[0].title;

    // Generate a new slug using information_id + title
    const slug = `${information_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // If no new image is uploaded, use the existing image.
    const finalImageData = imageData || currentImage;

    // Update the information record with the new data and generated slug
    const [updateResult] = await pool.execute(
      "UPDATE information SET title = ?, description = ?, image_data = ?, slug = ? WHERE information_id = ?",
      [title, description, finalImageData, slug, information_id]
    );

    // If no rows were affected, the record doesn't exist or wasn't updated
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: `information record with ID ${information_id} not found` });
    }

    res.status(200).json({ message: "information record updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating information record", error: error.message });
  }
};



// Get all information records
export const getAllInformations = async (req, res) => {
  try {
    const [informations] = await pool.execute("SELECT * FROM information");

    const informationData = informations.map((record) => ({
      ...record,
      image_data: record.image_data
        ? `data:image/jpeg;base64,${record.image_data.toString("base64")}`
        : null,
    }));

    res.status(200).json(informationData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving information records", error: error.message });
  }
};

// Get a single information record by ID
export const getInformationById = async (req, res) => {
  const { information_id } = req.params;
  try {
    const [information] = await pool.execute("SELECT * FROM information WHERE information_id = ?", [information_id]);

    if (information.length === 0) {
      return res.status(404).json({ message: `information record with ID ${information_id} not found` });
    }

    const imageBase64 = information[0].image_data
      ? `data:image/jpeg;base64,${information[0].image_data.toString("base64")}`
      : null;

    res.status(200).json({
      ...information[0],
      image_data: imageBase64,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving information record", error: error.message });
  }
};




// Delete a information record
export const deleteInformation = async (req, res) => {
  const { information_id } = req.params;
  try {
    const [record] = await pool.execute("SELECT * FROM information WHERE information_id = ?", [information_id]);

    if (record.length === 0) {
      return res.status(404).json({ message: `information record with ID ${information_id} not found` });
    }

    await pool.execute("DELETE FROM information WHERE information_id = ?", [information_id]);

    res.status(200).json({ message: "information record deleted successfully", data: record[0] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting information record", error: error.message });
  }
};
