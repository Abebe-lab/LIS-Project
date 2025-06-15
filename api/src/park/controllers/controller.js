import pool from "../../../db.js";
import queries from "../quieries/queries.js";
import ImportShp from "../../shared/ImportShapeFile.js"; //imports zip file extracts it and saves it to db

//========================UPLOAD ZIP
const uploadZip = async (req, res) => {
  const extractedResult = await ImportShp.uploadZipFile(req, res);
  console.log(JSON.stringify(extractedResult));
};

const getReferredStatus = (req, res) => {
  console.log("api: referred fetch started");
  try {
    pool.query(queries.getReferredStatus, (error, results) => {
      if (error) console.log(error);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
  }
  console.log("api: referred fetch end!");
};

const getInfrastructures = (req, res) => {
  try {
    pool.query(queries.getInfrastructures, (error, results) => {
      if (error) console.log(error);
      //console.log(results);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
  }
};

//================END GET PARKS and BLOCKS
const assignParcel = (req, res) => {
  const {
    agreement_id,
    parcel_upin,
    agreed_on,
    agreement_type,
    used_for,
    monthly_payment,
    perit_date,
    expected_permit_completion_date,
    expected_start_date,
    status,
    tenant_id,
  } = req.body;
  pool.query(
    queries.assignParcel,
    [
      agreement_id,
      parcel_upin,
      agreed_on,
      agreement_type,
      used_for,
      monthly_payment,
      perit_date,
      expected_permit_completion_date,
      expected_start_date,
      status,
      tenant_id,
    ],
    (error, results) => {
      if (error) console.log(error);
      res.status(201).send("Block added succesfully!");
      console.log("block created");
    }
  );
};

//============add parcel
const addParcelInfo = async (req, res) => {
  const { upin, name, planned_for, current_function, description, type, no_of_buildings, no_of_planned_buildings } =
    req.body;
  console.log(req.body);
  try {
    //await pool.query('START TRANSACTION');

    pool.query(
      queries.addParcelInfo,
      [upin, name, planned_for, current_function, description, type, no_of_buildings, no_of_planned_buildings],
      (error, results) => {
        if (error) console.log(error);
        if (!error) {
          res.status(201).send("parcel added succesfully!");
          console.log("parcel created");
        }
      }
    );

    //await pool.query('COMMIT');
  } catch (ex) {
    console.log("=========error caugth======");
    console.log(ex.message);
  }
};
//================== Refer to ipdc
const referToIPDC = async (req, res) => {
  const { p_inv_id, request_date, purpose, approved_request_form, associated_documents, description } = req.body;
  console.log(req.body);
  let newPId = p_inv_id;
  let tin_no = "";
  if (p_inv_id !== null && p_inv_id.length > 4) {
    newPId = 0;
    tin_no = p_inv_id;
  }

  try {
    await pool.query("START TRANSACTION");

    pool.query(
      queries.referToIPDC,
      [newPId, request_date, purpose, approved_request_form, associated_documents, description, tin_no],
      async (error, results) => {
        if (error) {
          await pool.query("ROLLBACK");
          console.log(error);
        }
        if (!error) {
          const isAttached = await attachProspectiveInvestorDocuments();
          console.log("prospective request to IPDC sent!");
          await pool.query("COMMIT");
          res.status(201).send("Parcel Request sent successfully!");
        }
      }
    );
  } catch (ex) {
    await pool.query("ROLLBACK");
    res.status(401).send("Parcel Request sent ERROR");
    console.log("=========error caugth======");
    console.log(ex.message);
  }
};

const addBlockInfo = async (req, res) => {
  try {
    console.log(req.body);
    const { id, block_no, name, planned_parcels, description, existing_parcels } = req.body;
    let blockExists = false;
    await pool.query("START TRANSACTION");
    pool.query(queries.checkBlockNoExists, [block_no], (error, results) => {
      if (results !== null) {
        blockExists = true;
        //res.send("block number already exists");
      }
    });
    //add block to database
    if (!blockExists) {
      //console.log(boundary)
      //console.log(queries.addBlock);
      console.log("Block info started");
      pool.query(
        queries.addBlockInfo,
        [id, block_no, name, planned_parcels, description, existing_parcels],
        async (error, results) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log("=========results==========");
          //console.log(results);
          await pool.query("COMMIT");
          res.status(201).send("Block added succesfully!");
          console.log("block created");
        }
      );
    }
    console.log("Block info finished");
  } catch (err) {
    await pool.query("ROLLBACK");
    console.log("=========error caugth======");
    console.log(err);
  }
};

//  approveMergeParcelUpdate,

/*old version
const splitParcel = (req, res) => {
  const {
    id,
    parcel_pin,
    split_1,
    split_2,
    ordered_by,
    order_time,
    description,
  } = req.body;
  pool.query(
    queries.splitParcel,
    [id, parcel_pin, split_1, split_2, ordered_by, order_time, description],
    (error, results) => {
      if (error) console.log(error);
      res.status(201).send("split added succesfully!");
      console.log("split created");
    }
  );
};
*/
/* old
const mergeParcel = (req, res) => {
  const {
    tobe_merged_1,
    tobe_merged_2,
    id,
    merged_by,
    merge_date,
    description,
    approved_by,
    approval_date,
    approval_description,
    upin_1,
    upin_2,
  } = req.body;
  
  
  pool.query(
    queries.mergeParcel,
    [
      tobe_merged_1,
      tobe_merged_2,
      id,
      merged_by,
      merge_date,
      description,
      approved_by,
      approval_date,
      approval_description,
      upin_1,
      upin_2,
    ],
    (error, results) => {
      if (error) console.log(error);
      res.status(201).send("Merged succesfully!");
      console.log("merged created");
    }
  );
};
*/

//------------------------ END MERGE AND SPLIT

////////////////================ DELETE
const deleteBlock = (req, res) => {
  const blockNo = req.params.blockNo;
  //delete block from database using id
  pool.query(queries.deleteBlock, [blockNo], (error, results) => {
    if (error) console.log(error);
    if (results.rows.length === 0) {
      res.send("no such block");
    }
    res.status(200).send("Block deleted succesfully!");
  });
};
const deleteParcel = (req, res) => {
  console.log("parcel delete started...");
  const upin = req.params.upin;
  //delete block from database using id
  pool.query(queries.deleteParcel, [upin], (error, results) => {
    if (error) console.log(error);
    if (results.rows.length === 0) {
      res.send("no such block");
    }
    res.status(200).send("parcel deleted succesfully!");
    console.log("parcel delete successful!");
  });
};

export default {
  getReferredStatus,
  deleteBlock,
  deleteParcel,
  uploadZip,
  addBlockInfo,
  addParcelInfo,
  referToIPDC,
  assignParcel,
  getInfrastructures,
};
