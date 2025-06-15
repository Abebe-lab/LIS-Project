import pool from "../../../db.js";
import DesignAndConstructionQueries from "../quieries/designAndConstructionQueries.js";
import { v4 as uuidv4 } from "uuid"; // Import for generating unique file names
import fs, { rename } from "fs"; // Import for file system operations
import { executeQuery } from "../utils/dbHandler.js";
import { fileUploader } from "../utils/uploader.js";
import dtHelper from "../utils/dateHelpers.js";
//===============ADD BUILDING PERMIT STARTED
const addBuildingPermit = async (req, res) => {
  console.log("api: building permit started!");
  if (!req.body) {
    res.statu(400).send("No data provided!");
    return;
  }
  //console.log(req.files);
  try {
    const parsedData = JSON.parse(req.body.data);
    const {
      permit_no,
      requested_on,
      request_type,
      agreement_id,
      expected_starting_date,
      expected_finishing_date,
      consultant_id,
      contractor_id,
      no_of_residence_bldgs,
      no_of_commercial_bldgs,
      no_of_sheds,
      no_of_other_bldgs,
      other_bldg_description,
      modification_details,
      request_registered_by,
      permit_registered_on,
      permit_issued_by,
      issued_on,
      description,
    } = parsedData; // Extract the data object
    //*************upload file */
    console.log("upload_plans stated");
    console.log(req.files["architectural"]);
    const planBasePath = `building_permit/${
      agreement_id ? agreement_id : "_000"
    }/plans`;

    const architecturalPlanPath = req.files["architectural"]
      ? await (req.files["architectural"][0], planBasePath)
      : null;
    const structuralPlanPath = req.files["structural"]
      ? await fileUploader(req.files["structural"][0], planBasePath)
      : null;
    const sanitaryPlanPath = req.files["sanitary"]
      ? await fileUploader(req.files["sanitary"][0], planBasePath)
      : null;
    const electricalPlanPath = req.files["electrical"]
      ? await fileUploader(req.files["electrical"][0], planBasePath)
      : null;
    const electroMechanicalPlanPath = req.files["electroMechanical"]
      ? await fileUploader(req.files["electroMechanical"][0], planBasePath)
      : null;
    const environmentalPlanPath = req.files["environmental"]
      ? await fileUploader(req.files["environmental"][0], planBasePath)
      : null;
    const otherPlanPath = req.files["other"]
      ? await fileUploader(req.files["other"][0], planBasePath)
      : null;

    const commitmentBasePath = `building_permit/${
      agreement_id ? agreement_id : "_000"
    }/commitment`;
    const ownerCommitmentPath = req.files["ownerCommitment"]
      ? await fileUploader(req.files["ownerCommitment"][0], commitmentBasePath)
      : null;
    const consultantCommitmentPath = req.files["consultantCommitment"]
      ? await fileUploader(
          req.files["consultantCommitment"][0],
          commitmentBasePath
        )
      : null;
    const contractorCommitmentPath = req.files["contractorCommitment"]
      ? await fileUploader(
          req.files["contractorCommitment"][0],
          commitmentBasePath
        )
      : null;

    // Validate and format dates
    const validDates = [
      requested_on,
      expected_starting_date,
      expected_finishing_date,
      permit_registered_on,
      issued_on,
    ].map((date) => {
      if (date && !isNaN(Date.parse(date))) {
        return new Date(date).toISOString().slice(0, 10); // Format as YYYY-MM-DD
      } else {
        return null; // Or handle invalid dates as needed
      }
    });

    pool.query(
      DesignAndConstructionQueries.addBuildingPermit,
      [
        permit_no,
        validDates[0],
        request_type,
        agreement_id,
        validDates[1],
        validDates[2],
        consultant_id,
        contractor_id,
        ownerCommitmentPath,
        contractorCommitmentPath,
        consultantCommitmentPath,
        no_of_residence_bldgs,
        no_of_commercial_bldgs,
        no_of_sheds,
        no_of_other_bldgs,
        other_bldg_description,
        modification_details,
        architecturalPlanPath,
        structuralPlanPath,
        sanitaryPlanPath,
        electricalPlanPath,
        electroMechanicalPlanPath,
        environmentalPlanPath,
        otherPlanPath,
        request_registered_by,
        validDates[3],
        permit_issued_by,
        validDates[4],
        "REQUESTED",
        description,
      ],
      (error, results) => {
        if (error) console.log(error);
        res.status(201).send("buidling permit added succesfully!");
      }
    );
    //upload related files

    console.log("api: building permit created!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on adding building permit!");
  }
};

//****uplaoad attachments
//todo: check if uploading error can be sent back to frontend
const uploadPlans = async (req, permit_no) => {
  //todo: in building_permit/permit_no/plans
  const planBasePath = `building_permit/${
    permit_no ? permit_no : "_000"
  }/plans`;
  try {
    if (!req || !req.files) {
      return null; //res.status(400).send("No files were uploaded.");
    }

    // Create the directory if it doesn't exist
    const plansDir = `uploads/${planBasePath}`;
    if (!fs.existsSync(plansDir)) {
      fs.mkdirSync(plansDir, { recursive: true });
    }

    // Process each uploaded file
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

    //res.status(200).send("Files uploaded successfully!");
    return planPaths;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const uploadCommitment = async (req, permit_no) => {
  //todo: in building_permit/permit_no/commitment
  const commitmentBasePath = `building_permit/${
    permit_no ? permit_no : "_000"
  }/commitment`;
  try {
    if (!req || !req.files) {
      return null; //res.status(400).send("No files were uploaded.");
    }

    // Create the directory if it doesn't exist
    const commitmentDir = `uploads/${commitmentBasePath}`;
    if (!fs.existsSync(commitmentDir)) {
      fs.mkdirSync(commitmentDir, { recursive: true });
    }
    let commitmentPaths = [];
    // Process each uploaded file
    for (const file of req.files) {
      if (file.mv) {
        const uniqueFileName = uuidv4() + "-" + file.name;
        const filePath = `${commitmentDir}/${uniqueFileName}`;
        commitmentPaths.push(filePath);
        await file.mv(filePath);
      }
      // Update the database with the file path
      // ... (You'll need to update your database query to store the file path)
    }

    //res.status(200).send("Files uploaded successfully!");
    return commitmentPaths;
  } catch (error) {
    console.error(error);
    return null;
    //res.status(500).send("Error on uploading commitment files");
  }
};
//********end upload */

//================ END ADD BUILDING PERMIT
//===============DELETE BUILDING PERMIT STARTED
const deleteBuildingPermit = (req, res) => {
  console.log("api: building permit deleted!");
  const { id, permit_no } = req.body;
  try {
    //todo: remember to delete attachments
    pool.query(
      DesignAndConstructionController.deleteBuildingPermit,
      [id ? id : "", permit_no ? permit_no : ""],
      (error, results) => {
        if (error) console.log(error);
        if (results.rows.length === 0) {
          res.send("no such permit");
        }
        res.status(200).send("Building permit deleted succesfully!");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on deleting building permit");
  }
  console.log("api: building permit deleted!");
};
//===============END DELETE BUILDING PERMIT
//===============START UPDATE BUILDING PERMIT
const updateBuildingPermit = (req, res) => {
  console.log("api: building permit updated!");
  if (!req.body) {
    res.statu(400).send("No data provided!");
    return;
  }
  try {
    const {
      permit_no,
      requested_on,
      request_type,
      agreement_id,
      expected_starting_date,
      expected_finishing_date,

      consultant_id,
      contractor_id,

      owner_commitment_path,
      contractor_comitment_path,
      consultant_comitment_path,
      no_of_residence_bldgs,
      no_of_commercial_bldgs,
      no_of_sheds,
      no_of_other_bldgs,
      other_bldg_description,
      modification_details,

      plan_archtectural_path,
      plan_structural_path,
      plan_sanitary_path,
      plan_electrical_path,
      plan_electro_mechanical_path,
      plan_environmental_path,
      plan_other_path,
      request_registered_by,
      permit_registered_on,
      permit_issued_by,
      issued_on,
      description,
    } = req.body;
    // Validate and format dates
    const validDates = [
      requested_on,
      expected_starting_date,
      expected_finishing_date,
      permit_registered_on,
      issued_on,
    ].map((date) => {
      if (date && !isNaN(Date.parse(date))) {
        return new Date(date).toISOString().slice(0, 10); // Format as YYYY-MM-DD
      } else {
        return null; // Or handle invalid dates as needed
      }
    });

    pool.query(
      DesignAndConstructionQueries.updateBuildingPermit,
      [
        permit_no,
        validDates[0], // requested_on
        request_type,
        agreement_id,
        validDates[1], // expected_starting_date
        validDates[2], // expected_finishing_date
        consultant_id,
        contractor_id,
        owner_commitment_path ? owner_commitment_path : "", //`building_permit/${permit_no}/commitment/`+, filename
        consultant_comitment_path ? consultant_comitment_path : "",
        contractor_comitment_path ? contractor_comitment_path : "",
        no_of_residence_bldgs,
        no_of_commercial_bldgs,
        no_of_sheds,
        no_of_other_bldgs,
        other_bldg_description,
        modification_details,

        plan_archtectural_path ? plan_archtectural_path : "", //     plan_archtectural_path: `building_permit/${permit_no}/plans/`+, filename,
        plan_structural_path ? plan_structural_path : "", //     plan_structural_path:,
        plan_sanitary_path ? plan_sanitary_path : "", //     plan_sanitary_path:,
        plan_electrical_path ? plan_electrical_path : "", //     plan_electrical_path:,
        plan_electro_mechanical_path ? plan_electro_mechanical_path : "", //     plan_electro_mechanical_path:,
        plan_environmental_path,
        plan_other_path ? plan_other_path : "", //   plan_other_path:,
        request_registered_by,
        validDates[3], // permit_registered_on
        permit_issued_by,
        validDates[4], // issued_on
        "REQUESTED",
        description,
      ],
      (error, results) => {
        if (error) console.log(error);
        res.status(201).send("buidling permit added succesfully!");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on adding building permit");
  }

  console.log("api: building permit updated!");
};
//===============END UPDATE BUILDING PERMIT
//===============START GET BUILDING PERMIT
const getBuildingPermitById = (req, res) => {
  console.log("api: building permit by id started");
  const { id } = req.params;
  try {
    pool.query(
      DesignAndConstructionQueries.getBuildingPermitById,
      [id],
      (error, results) => {
        if (error) return;
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on getting building permit");
  }
  console.log("api: building permit by id finsihed");
};
const getBuildingPermitByPermitNo = (req, res) => {
  console.log("api: start of get building permit by permit no");
  const { permit_no } = req.params;
  try {
    pool.query(
      DesignAndConstructionQueries.getBuildingPermitByPermitNo,
      [permit_no],
      (error, results) => {
        if (error) return;
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on getting building permit by permit no");
  }
  console.log("api: end of get building permit by permit no");
};
const getAllBuildingPermits = (req, res) => {
  console.log("api: building permit fetching started");
  try {
    pool.query(
      DesignAndConstructionQueries.getAllBuildingPermits,
      (error, results) => {
        if (error) return;
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on getting building permit");
  }
  console.log("api: building permit fetching ended");
};
//===============END GET BUILDING PERMIT
//===============BUDILDING PERMIT
//-----------------add
const uploadOccupancy = async (req, res) => {
  //todo: in occupancy_permit/building_permit_no
  const { building_permit_id } = req.body;
  const permitBasePath = `occupancy_permit/${
    building_permit_id ? building_permit_id : "_000"
  }`;
  try {
    //console.log(req);
    if (!req.file) {
      return null; //res.status(400).send("No files were uploaded.");
    }
    const file = req.file;

    const tempPath = file.path;
    // Create the directory if it doesn't exist
    const permitDir = `uploads/${permitBasePath}`;
    if (!fs.existsSync(permitDir)) {
      fs.mkdirSync(permitDir, { recursive: true });
    }
    let filePath = `${permitDir}/${file.originalname}`;
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
      const extensionIndex = filePath.lastIndexOf(".");
      const fileWithOutExtension = filePath.substring(0, extensionIndex);
      filePath =
        fileWithOutExtension +
        "_" +
        filePath.substring(extensionIndex, filePath.length);
    }
    if (file.mv) {
      //planPaths.push(filePath);
      await file.mv(filePath);
    }
    rename(tempPath, filePath, (err) => {
      if (err) return handleError(err, res);
      res.status(200);
    });

    //res.status(200).send("Files uploaded successfully!");
    return filePath;
  } catch (error) {
    console.error(error);
    return null;
  }
};
const addOccupancyPermit = async (req, res) => {
  console.log("api: occupancy permit registeration started!");
  if (!req.body) return res.statu(400).send("No data provided!");
  try {
    const {
      requested_on,
      building_permit_id,
      request_registered_by,
      description,
    } = req.body;

    const filePath = await fileUploader(
      req.file,
      `occupancy_permit/${building_permit_id}`
    );
    console.log(
      building_permit_id,
      dtHelper.sanitizeDate(requested_on),
      request_registered_by,
      description,
      filePath
    );
    const result1 = await pool.query(
      DesignAndConstructionQueries.addOccupancyPermit,
      [
        building_permit_id,
        dtHelper.sanitizeDate(requested_on),
        request_registered_by,
        description,
        filePath,
      ]
    );
    if (result1) {
      console.log("api: occupancy permit registration finsihed!");
      res.status(201).send("occupancy permit added succesfully!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on adding occupancy permit");
  }
};
//-----------------update
const updateOccupancyPermit = async (req, res) => {
  console.log("api: occupancy permit updated!");
  if (!req.body) return res.statu(400).send("No data provided!");
  try {
    const {
      permit_no,
      requested_on,
      building_permit_id,
      request_form_attached_path,
      request_registered_by,
      request_registered_on,
      permit_issued_by,
      issued_on,
      status,
      description,
    } = req.body;
    // Validate and format dates
    const validDates = dtHelper.getValidDatesBySanitizingArray([
      requested_on,
      issued_on,
    ]);

    pool.query(
      DesignAndConstructionQueries.updateOccupancyPermit,
      [
        permit_no,
        validDates[0],
        building_permit_id,
        request_form_attached_path,
        request_registered_by,
        request_registered_on,
        permit_issued_by,
        validDates[1],
        status,
        description,
        id,
      ],
      (error, results) => {
        if (error) console.log(error);
        res.status(201).send("occupancy permit updates succesfully!");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on adding occupancy permit");
  }

  console.log("api: occupancy permit updated!");
};
//-----------------delete
const deleteOccupancyPermit = async (req, res) => {
  console.log("api: occupancy permit deleted!");
  const { id, permit_no } = req.body;
  try {
    //todo: remember to delete attachments
    pool.query(
      DesignAndConstructionController.deleteOccupancyPermit,
      [id ? id : "", permit_no ? permit_no : ""],
      (error, results) => {
        if (error) console.log(error);
        if (results.rows.length === 0) {
          res.send("no such permit");
        }
        res.status(200).send("Occupancy permit deleted succesfully!");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on deleting occupancy permit");
  }
  console.log("api: occupancy permit deleted!");
};
//-----------------get
const getOccupancyPermitById = async (req, res) => {
  console.log("api: start of get occupancy permit by id");
  const { id } = req.params;
  try {
    pool.query(
      DesignAndConstructionQueries.getOccupancyPermitById,
      [id],
      (error, results) => {
        if (error) return;
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on getting building permit by permit no");
  }
  console.log("api: end of get occupancy permit by id");
};
const getOccupancyPermitByPermitNo = async (req, res) => {
  console.log("api: start of get occupancy permit by permit no");
  const { permit_no } = req.params;
  try {
    pool.query(
      DesignAndConstructionQueries.getOccupancyPermitByPermitNo,
      [permit_no],
      (error, results) => {
        if (error) return;
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on getting building permit by permit no");
  }
  console.log("api: end of get occupancy permit by permit no");
};
const getAllOccupancyPermits = async (req, res) => {
  console.log("api: get all occupancy permit started")
  try {
    pool.query(
      DesignAndConstructionQueries.getAllOccupancyPermits,
      (error, results) => {
        if (error) return;
        res.status(200).json(results.rows);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on getting occupanct permit");
  }
  console.log("api: get all occupancy permit ended")
};
//===============END BUILDING PEMIT
//================utility
const addComment = async (req, res) => {
  console.log("api: comment registeration started!");
  if (!req.body) return res.statu(400).send("No data provided!");
  try {
    const { requestNumber, commentedBy, commentType, comment } = req.body;
    pool.query(
      DesignAndConstructionQueries.addComment,
      [requestNumber, commentedBy, comment, commentType],
      (error, results) => {
        if (error) console.log(error);
      }
    );

    console.log("api: Comment registration finsihed!");
    res.status(201).send("Comment added succesfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on adding comment");
  }
};
const getBuildingPermitReport = async (req, res) => {
  console.log("building permit report");
  await executeQuery(res, DesignAndConstructionQueries.getBuildingPermitReport);
};
//================end utility
export default {
  addBuildingPermit,
  deleteBuildingPermit,
  updateBuildingPermit,
  getAllBuildingPermits,
  getBuildingPermitById,
  getBuildingPermitByPermitNo,
  getBuildingPermitReport,
  addOccupancyPermit,
  deleteOccupancyPermit,
  updateOccupancyPermit,
  getAllOccupancyPermits,
  getOccupancyPermitById,
  getOccupancyPermitByPermitNo,
  addComment,
};
