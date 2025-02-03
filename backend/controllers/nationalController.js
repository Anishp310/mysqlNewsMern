import multer from "multer";
import pool from "../lib/db.js";

// Configure multer to store files in memory
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

// Create a new national record
export const createNational = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const imageData = req.file ? req.file.buffer : null;

    await pool.execute(
      "INSERT INTO national (title, description, image_data) VALUES (?, ?, ?)",
      [title, description, imageData]
    );

    res.status(201).json({ message: "National record created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating national record", error: error.message });
  }
};

// Get all national records
export const getAllNationals = async (req, res) => {
  try {
    const [nationals] = await pool.execute("SELECT * FROM national");

    const nationalData = nationals.map((record) => ({
      ...record,
      image_data: record.image_data
        ? `data:image/jpeg;base64,${record.image_data.toString("base64")}`
        : null,
    }));

    res.status(200).json(nationalData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving national records", error: error.message });
  }
};

// Get a single national record by ID
export const getNationalById = async (req, res) => {
  const { national_id } = req.params;
  try {
    const [national] = await pool.execute("SELECT * FROM national WHERE national_id = ?", [national_id]);

    if (national.length === 0) {
      return res.status(404).json({ message: `National record with ID ${national_id} not found` });
    }

    const imageBase64 = national[0].image_data
      ? `data:image/jpeg;base64,${national[0].image_data.toString("base64")}`
      : null;

    res.status(200).json({
      ...national[0],
      image_data: imageBase64,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving national record", error: error.message });
  }
};

// Update a national record
export const updateNational = async (req, res) => {
  const { national_id } = req.params;
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const imageData = req.file ? req.file.buffer : null;

    const [updateResult] = await pool.execute(
      "UPDATE national SET title = ?, description = ?, image_data = ? WHERE national_id = ?",
      [title, description, imageData, national_id]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: `National record with ID ${national_id} not found` });
    }

    res.status(200).json({ message: "National record updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating national record", error: error.message });
  }
};

// Delete a national record
export const deleteNational = async (req, res) => {
  const { national_id } = req.params;
  try {
    const [record] = await pool.execute("SELECT * FROM national WHERE national_id = ?", [national_id]);

    if (record.length === 0) {
      return res.status(404).json({ message: `National record with ID ${national_id} not found` });
    }

    await pool.execute("DELETE FROM national WHERE national_id = ?", [national_id]);

    res.status(200).json({ message: "National record deleted successfully", data: record[0] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting national record", error: error.message });
  }
};
