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

export const createAds = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageData = req.file ? req.file.buffer : null;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // Insert the record first to get the ads_id
    const [result] = await pool.execute(
      "INSERT INTO ads (title, description, image_data) VALUES (?, ?, ?)",
      [title, description, imageData]
    );

    const ads_id = result.insertId; // Get the inserted ads_id

    // Generate slug: ads_id + title
    const slug = `${ads_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // Update the record with the generated slug
    await pool.execute(
      "UPDATE ads SET slug = ? WHERE ads_id = ?",
      [slug, ads_id]
    );

    res.status(201).json({ message: "ads record created successfully" });
  } catch (error) {
    console.error("Error creating ads record:", error);
    res.status(500).json({ message: "Error creating ads record", error: error.message });
  }
};
// Update a ads record
export const updateAds = async (req, res) => {
  const { ads_id } = req.params;
  const { title, description } = req.body;

  try {
    // Check if title and description are provided
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // If there's a new image, use it. If not, keep the current image.
    const imageData = req.file ? req.file.buffer : null;

    // First, get the current image and title from the database to retain it if no new image or title is uploaded.
    const [existingRecord] = await pool.execute("SELECT image_data, title FROM ads WHERE ads_id = ?", [ads_id]);

    // If the record does not exist, return a 404 error
    if (existingRecord.length === 0) {
      return res.status(404).json({ message: `ads record with ID ${ads_id} not found` });
    }

    const currentImage = existingRecord[0].image_data;
    const currentTitle = existingRecord[0].title;

    // Generate a new slug using ads_id + title
    const slug = `${ads_id}-${title.toLowerCase().replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')  // Remove non-alphanumeric characters
      .replace(/\-\-+/g, '-')}`;  // Replace multiple hyphens with one

    // If no new image is uploaded, use the existing image.
    const finalImageData = imageData || currentImage;

    // Update the ads record with the new data and generated slug
    const [updateResult] = await pool.execute(
      "UPDATE ads SET title = ?, description = ?, image_data = ?, slug = ? WHERE ads_id = ?",
      [title, description, finalImageData, slug, ads_id]
    );

    // If no rows were affected, the record doesn't exist or wasn't updated
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: `ads record with ID ${ads_id} not found` });
    }

    res.status(200).json({ message: "ads record updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating ads record", error: error.message });
  }
};



// Get all ads records
export const getAllAds = async (req, res) => {
  try {
    const [adss] = await pool.execute("SELECT * FROM ads");

    const adsData = adss.map((record) => ({
      ...record,
      image_data: record.image_data
        ? `data:image/jpeg;base64,${record.image_data.toString("base64")}`
        : null,
    }));

    res.status(200).json(adsData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ads records", error: error.message });
  }
};

// Get a single ads record by ID
export const getAdsById = async (req, res) => {
  const { ads_id } = req.params;
  try {
    const [ads] = await pool.execute("SELECT * FROM ads WHERE ads_id = ?", [ads_id]);

    if (ads.length === 0) {
      return res.status(404).json({ message: `ads record with ID ${ads_id} not found` });
    }

    const imageBase64 = ads[0].image_data
      ? `data:image/jpeg;base64,${ads[0].image_data.toString("base64")}`
      : null;

    res.status(200).json({
      ...ads[0],
      image_data: imageBase64,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ads record", error: error.message });
  }
};




// Delete a ads record
export const deleteAds = async (req, res) => {
  const { ads_id } = req.params;
  try {
    const [record] = await pool.execute("SELECT * FROM ads WHERE ads_id = ?", [ads_id]);

    if (record.length === 0) {
      return res.status(404).json({ message: `ads record with ID ${ads_id} not found` });
    }

    await pool.execute("DELETE FROM ads WHERE ads_id = ?", [ads_id]);

    res.status(200).json({ message: "ads record deleted successfully", data: record[0] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ads record", error: error.message });
  }
};
