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

export const createNational = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageData = req.file ? req.file.buffer : null;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Insert the record first to get the national_id
    const [result] = await pool.execute(
      "INSERT INTO national (title, description, image_data) VALUES (?, ?, ?)",
      [title, description, imageData]
    );

    const national_id = result.insertId; // Get the inserted national_id

    // Generate slug: national_id + title
    const slug = `${national_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // Update the record with the generated slug
    await pool.execute(
      "UPDATE national SET slug = ? WHERE national_id = ?",
      [slug, national_id]
    );

    res.status(201).json({ message: "National record created successfully" });
  } catch (error) {
    console.error("Error creating national record:", error);
    res.status(500).json({ message: "Error creating national record", error: error.message });
  }
};
// Update a national record
export const updateNational = async (req, res) => {
  const { national_id } = req.params;
  const { title, description } = req.body;

  try {
    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // If there's a new image, use it. If not, keep the current image.
    const imageData = req.file ? req.file.buffer : null;

    // First, get the current image and title from the database to retain it if no new image or title is uploaded.
    const [existingRecord] = await pool.execute("SELECT image_data, title FROM national WHERE national_id = ?", [national_id]);

    // If the record does not exist, return a 404 error
    if (existingRecord.length === 0) {
      return res.status(404).json({ message: `National record with ID ${national_id} not found` });
    }

    const currentImage = existingRecord[0].image_data;
    const currentTitle = existingRecord[0].title;

    // Generate a new slug using national_id + title
    const slug = `${national_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // If no new image is uploaded, use the existing image.
    const finalImageData = imageData || currentImage;

    // Update the national record with the new data and generated slug
    const [updateResult] = await pool.execute(
      "UPDATE national SET title = ?, description = ?, image_data = ?, slug = ? WHERE national_id = ?",
      [title, description, finalImageData, slug, national_id]
    );

    // If no rows were affected, the record doesn't exist or wasn't updated
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: `National record with ID ${national_id} not found` });
    }

    res.status(200).json({ message: "National record updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating national record", error: error.message });
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
  const { slug } = req.params;
  try {
    const [national] = await pool.execute("SELECT * FROM national WHERE slug = ?", [slug]);

    if (national.length === 0) {
      return res.status(404).json({ message: `National record with ID ${slug} not found` });
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
