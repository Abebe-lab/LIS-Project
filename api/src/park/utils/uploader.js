import multer from "multer"; //for uploading
import path from "path";
import fs, { rename } from "fs"; // Import for file system operations

// Utility to configure and return a multer instance
const multipleFileUploader = async (req, destination, fileFilter = null, limits = null) => {
  try {
    if (!req || !req.files) {
      return null; //res.status(400).send("No files were uploaded.");
    }
    let planPaths = [];
    for (const file of req.files) {
      if (file.mv) {
        // Check if file.mv exists
        const uniqueFileName = uuidv4() + "-" + file.name;
        const filePath = `${plansDir}/${uniqueFileName}`;
        planPaths.push(filePath);
        await file.mv(filePath);
      }
      // Update the database with the file path
      // ... (You'll need to update your database query to store the file path)
    }
    return planPaths;
  } catch (error) {
    console.log(error);
  }
};
const fileUploader = async (file, destination) => {
  try {
    if (!file?.path) {
      console.log("File path is missing!");
      return null;
    }

    const tempPath = file.path;
    const permitDir = `uploads/${destination}`;

    if (!fs.existsSync(permitDir)) fs.mkdirSync(permitDir, { recursive: true });

    let filePath = `${permitDir}/${file.originalname}`;
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
      const extensionIndex = filePath.lastIndexOf(".");
      const fileWithOutExtension = filePath.substring(0, extensionIndex);
      filePath = fileWithOutExtension + "_" + filePath.substring(extensionIndex, filePath.length);
    }
    if (file.mv) await file.mv(filePath);
    rename(tempPath, filePath, (err) => {
      if (err) return console.log(err);
      //if (err) throw err; // return handleError(err, res);
    });
    //res.status(200).send("Files uploaded successfully!");
    return filePath;
  } catch (error) {
    console.log("[file uploading error]", error);
    return null;
  }
};
const uploaderMultiPurpose = async (req, destination, fileFilter = null, limits = null) => {
  console.log("Uploader started");

  // Check for single or multiple files
  const files = req.files || (req.file ? [req.file] : null);
  if (!files) return null; // No files were uploaded

  const uploadedPaths = []; // Array to store paths of uploaded files

  try {
    const permitDir = `uploads/${destination}`;
    if (!fs.existsSync(permitDir)) {
      fs.mkdirSync(permitDir, { recursive: true });
    }

    for (const file of files) {
      const tempPath = file.path;
      let filePath = `${permitDir}/${file.originalname}`;

      // Check if the file already exists, and rename it if so
      if (fs.existsSync(filePath)) {
        const extensionIndex = filePath.lastIndexOf(".");
        const fileWithoutExtension = filePath.substring(0, extensionIndex);
        const fileExtension = filePath.substring(extensionIndex);
        filePath = `${fileWithoutExtension}_${Date.now()}${fileExtension}`;
      }

      // Move or rename the file
      if (file.mv) {
        await file.mv(filePath);
      } else {
        await rename(tempPath, filePath);
      }

      uploadedPaths.push(filePath); // Add the path of the uploaded file
    }

    console.log("Files uploaded successfully");
    return uploadedPaths; // Return paths of uploaded files
  } catch (error) {
    console.error("Error uploading files:", error);
    return null;
  }
};
const uploader = async (req, destination, fileFilter = null, limits = null) => {
  console.log("uploader started");
  if (!req.file) return null; //res.status(400).send("No files were uploaded.");
  try {
    const file = req.file;
    const tempPath = file.path;
    const permitDir = `uploads/${destination}`;

    if (!fs.existsSync(permitDir)) fs.mkdirSync(permitDir, { recursive: true });

    let filePath = `${permitDir}/${file.originalname}`;
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
      const extensionIndex = filePath.lastIndexOf(".");
      const fileWithOutExtension = filePath.substring(0, extensionIndex);
      filePath = fileWithOutExtension + "_" + filePath.substring(extensionIndex, filePath.length);
    }
    if (file.mv) await file.mv(filePath);
    rename(tempPath, filePath, (err) => {
      if (err) throw err; // return handleError(err, res);
    });
    //res.status(200).send("Files uploaded successfully!");
    return filePath;
  } catch (error) {
    console.log(error);
  }
  return null;
};

// Utility to return the path of the uploaded file
const getFilePath = (req, fileField) => {
  if (req.file && req.file.fieldname === fileField) {
    return req.file.path;
  }
  return null;
};
const uploadExcelFile = async (req, res, mainDirectory) => {
  const { park_id } = req.body;
  const permitBasePath = `${mainDirectory}/${park_id ? park_id : "_000"}`;
  try {
    if (!req.file) return null; //res.status(400).send("No files were uploaded.");

    const file = req.file;
    const tempPath = file.path;
    const permitDir = `uploads/${permitBasePath}`;

    if (!fs.existsSync(permitDir)) fs.mkdirSync(permitDir, { recursive: true });

    let filePath = `${permitDir}/${file.originalname}`;
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
      const extensionIndex = filePath.lastIndexOf(".");
      const fileWithOutExtension = filePath.substring(0, extensionIndex);
      filePath = fileWithOutExtension + "_" + filePath.substring(extensionIndex, filePath.length);
    }
    if (file.mv) await file.mv(filePath);
    rename(tempPath, filePath, (err) => {
      if (err) throw err;
    });
    return filePath;
  } catch (error) {
    console.error(error);
    res.status(500).send("Error on uploading file to read, please try again!");
  }
};

export { uploader, uploaderMultiPurpose, getFilePath, fileUploader, uploadExcelFile };
