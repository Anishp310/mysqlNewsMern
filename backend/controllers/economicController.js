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

export const createEconomic = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageData = req.file ? req.file.buffer : null;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Insert the record first to get the economic_id
    const [result] = await pool.execute(
      "INSERT INTO economic (title, description, image_data) VALUES (?, ?, ?)",
      [title, description, imageData]
    );

    const economic_id = result.insertId; // Get the inserted economic_id

    // Generate slug: economic_id + title
    const slug = `${economic_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // Update the record with the generated slug
    await pool.execute(
      "UPDATE economic SET slug = ? WHERE economic_id = ?",
      [slug, economic_id]
    );

    res.status(201).json({ message: "economic record created successfully" });
  } catch (error) {
    console.error("Error creating economic record:", error);
    res.status(500).json({ message: "Error creating economic record", error: error.message });
  }
};
// Update a economic record
export const updateEconomic = async (req, res) => {
  const { economic_id } = req.params;
  const { title, description } = req.body;

  try {
    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // If there's a new image, use it. If not, keep the current image.
    const imageData = req.file ? req.file.buffer : null;

    // First, get the current image and title from the database to retain it if no new image or title is uploaded.
    const [existingRecord] = await pool.execute("SELECT image_data, title FROM economic WHERE economic_id = ?", [economic_id]);

    // If the record does not exist, return a 404 error
    if (existingRecord.length === 0) {
      return res.status(404).json({ message: `economic record with ID ${economic_id} not found` });
    }

    const currentImage = existingRecord[0].image_data;
    const currentTitle = existingRecord[0].title;

    // Generate a new slug only if the title has changed
    const slug = title !== currentTitle
      ? title
          .toLowerCase()
          .replace(/\s+/g, '-')  // Replace spaces with hyphens
          .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
          .replace(/\-\-+/g, '-')  // Replace multiple hyphens with one
      : currentTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

    // If no new image is uploaded, use the existing image.
    const finalImageData = imageData || currentImage;

    // Update the economic record with the new data
    const [updateResult] = await pool.execute(
      "UPDATE economic SET title = ?, description = ?, image_data = ?, slug = ? WHERE economic_id = ?",
      [title, description, finalImageData, slug, economic_id]
    );

    // If no rows were affected, the record doesn't exist or wasn't updated
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: `economic record with ID ${economic_id} not found` });
    }

    res.status(200).json({ message: "economic record updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating economic record", error: error.message });
  }
};


// Get all economic records
export const getAllEconomics = async (req, res) => {
  try {
    const [economics] = await pool.execute("SELECT * FROM economic");

    const economicData = economics.map((record) => ({
      ...record,
      image_data: record.image_data
        ? `data:image/jpeg;base64,${record.image_data.toString("base64")}`
        : null,
    }));

    res.status(200).json(economicData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving economic records", error: error.message });
  }
};

// Get a single economic record by ID
export const getEconomicById = async (req, res) => {
  const { economic_id } = req.params;
  try {
    const [economic] = await pool.execute("SELECT * FROM economic WHERE economic_id = ?", [economic_id]);

    if (economic.length === 0) {
      return res.status(404).json({ message: `economic record with ID ${economic_id} not found` });
    }

    const imageBase64 = economic[0].image_data
      ? `data:image/jpeg;base64,${economic[0].image_data.toString("base64")}`
      : null;

    res.status(200).json({
      ...economic[0],
      image_data: imageBase64,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving economic record", error: error.message });
  }
};




// Delete a economic record
export const deleteEconomic = async (req, res) => {
  const { economic_id } = req.params;
  try {
    const [record] = await pool.execute("SELECT * FROM economic WHERE economic_id = ?", [economic_id]);

    if (record.length === 0) {
      return res.status(404).json({ message: `economic record with ID ${economic_id} not found` });
    }

    await pool.execute("DELETE FROM economic WHERE economic_id = ?", [economic_id]);

    res.status(200).json({ message: "economic record deleted successfully", data: record[0] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting economic record", error: error.message });
  }
};
