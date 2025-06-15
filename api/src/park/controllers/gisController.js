//import * as shapefile from "shapefile"; //shpjs rejects dueto url, shapefile is not reading reader==not working
import GISQueries from "../quieries/GISQueries.js";
import {
  executeQuery,
  executeQueryAndGetResult,
  executeQueryAndGetResultWithoutRes,
  executeQueryAndGetRows,
} from "../utils/dbHandler.js";
import { fileUploader } from "../utils/uploader.js";
//import gisGetMapDataQueries from "../quieries/gis/gisGetMapDataQueries.js";

const saveApproval = async (req, res) => {
  await executeQuery(res, GISQueries.saveApproval, [
    req.body.id,
    req.body.approved_by,
    req.body.approval_comment,
    req.body.attachment_for_approval,
  ]);
};

const updateSurveys = async (req, res) => {
  const { id } = req.params;
  await executeQuery(res, GISQueries.updateSurveys, [id]);
};
const deleteSurveys = async (req, res) => {
  const { id } = req.params;
  await executeQuery(res, GISQueries.deleteSurveys, [id]);
};

const updateOtherInfo = async (req, res) => {
  console.log("api: update other info started");
  const { table, id } = req.params; //console.log(req.params);//console.log(req.body);
  const { feature, type, name, shape_type, description, capacity, unit_of_measure } = req.body;
  try {
    const tableName = getNameOfTable(feature);

    if (tableName !== "") {
      const queryToExecute = `UPDATE ${tableName} SET type=$2, name=$3, shape_type=$4,  capacity=$5, unit_of_measure=$6,description=$7	WHERE id=$1;`;
      const result = await executeQuery(
        res,
        queryToExecute,
        [id, type, name, shape_type, capacity, unit_of_measure, description],
        "Data updated successfully!"
      );
    }
  } catch (error) {
    console.log(error);
  }
  console.log("api: update other info ended");
};
const updateParkInfo = async (req, res) => {
  console.log("api: updating park info started!");
  try {
    const { id } = req.params;
    const { name, region, description } = req.body;
    console.log(req.body);
    await executeQuery(res, GISQueries.updateParkInfo, [id, name, region, description], "Park info updated!");
  } catch (err) {
    console.log(err);
  }
  console.log("api: updating park info finsihed!");
};
const updateBlock = async (req, res) => {
  console.log("api: updating block info started!");
  console.log(req.body);
  try {
    const { id, block_no, name, planned_parcels, existing_parcels, description } = req.body;
    await executeQuery(
      res,
      GISQueries.updateBlock,
      [id, block_no, name, planned_parcels, existing_parcels, description],
      "Block info updated!"
    );
  } catch (error) {
    console.log(error);
  }
  console.log("api: block park info finsihed!");
};
const updateParcel = async (req, res) => {
  console.log("api: updating parcel info started!");
  try {
    const {
      upin,
      name,
      planned_for,
      current_function,
      description,
      type,
      no_of_planned_buildings,
      no_of_buildings,
      local_shed_parcel_no,
      block_no,
    } = req.body;
    console.log(req.body);
    await executeQuery(
      res,
      GISQueries.updateParcel,
      [upin, name, planned_for, current_function, description, type, no_of_planned_buildings, no_of_buildings],
      "Parcel info updated!"
    );
  } catch (error) {
    console.log(error);
  }
  console.log("api: updating parcel info started!");
};
const saveParcelToMerge = async (req, res) => {
  console.log("[api: saving parcel to merge started!]"); //park_id, type_of_edit, upin_1, upin_2_to_merge, ordered_by, description, attachment_for_order
  try {
    const { upin1, upin2, description } = req.body;
    const order_attachment = (await fileUploader(req.file, `SPATIAL/MERGE_SPLIT/${upin1}_${upin2}`)) || "";
    //prettier-ignore
    const result = await executeQueryAndGetResultWithoutRes(GISQueries.saveParcelToMerge, 
      ["MERGE", upin1, upin2, req.userId, description, order_attachment]);
    if (result) {
      return res.send({ message: "Consolidation was saved, pending approval approval!" });
    } else {
      return res.send({ message: "Consolidation failed, Please try again!" });
    }
  } catch (error) {
    console.log("[api: saving parcel to merge error]", error);
    return res.send({ message: "Consolidation failed, Please try again!" });
  } finally {
    console.log("[api: saving parcel to merge finished!]]");
  }
};
const saveParcelToSplit = async (req, res) => {
  console.log("[api: saving parcel to split started!]");

  try {
    const { upin, coordinates, description } = req.body;
    console.log(req.body);
    const order_attachment = (await fileUploader(req.file, `SPATIAL/MERGE_SPLIT/${upin}`)) || "";
    //prettier-ignore
    const result = await executeQueryAndGetResultWithoutRes(GISQueries.saveParcelToSplit, 
      ["SPLIT", upin, coordinates, req.userId, description, order_attachment]);
    if (result) {
      return res.send({ message: "Subdivison was saved, pending approval approval!" });
    } else {
      return res.send({ message: "Subdivison failed, Please try again!" });
    }
  } catch (error) {
    console.log("[api: saving parcel to split error]", error);
    return res.send({ message: "Subdivison failed, Please try again!" });
  } finally {
    console.log("[api: saving parcel to split finished!]]");
  }
};

const mergeParcel = async (req, res) => {
  console.log("[merge parcel forstarted]");
  const { upin1, upin2, description } = req.body;
  //let newParcel = "";
  try {
    //console.log(upin1 + " " + upin2 + " " + description);
    const mergingResult = await executeQueryAndGetResultWithoutRes(GISQueries.mergeParcel, [upin1, upin2]);
    console.log("merging results", mergingResult);
    const deactivatingResult = await executeQueryAndGetResultWithoutRes(GISQueries.mergeParcelDeactivate, [
      upin1,
      upin2,
      description,
    ]);
    console.log("deactivating results", deactivatingResult);
    return res.json({ message: "Successfully merged !" });
  } catch (err) {
    console.log("[error on merge]", err);
    return res.status(500).send("unable to merge due to server error");
  } finally {
    console.log("[merge parcel finished]");
  }
};
//------------------------ MERGE AND SPLIT

const approveMergeParcel = (req, res) => {
  const { approved_by, approval_date, approval_description, upin1, upin2, name, description } = req.body;
  pool.query(
    GISQueries.approveMergeParcel,
    [approved_by, approval_date, approval_description, upin1, upin2, name, description],
    (error, results) => {
      if (error) console.log(error);
      res.status(201).send("merge approved succesfully!");
      console.log("merge created");
    }
  );
  pool.query(queries.approveMergeParcelUpdate, [upin1, upin2, name, description], (error, results) => {
    if (error) console.log(error);
    res.status(201).send("parcel updated succesfully!");
    console.log("parcel updated created");
  });
};
const updateGreenArea = async (req, res) => {
  console.log("api: updating green area info started!");
  console.log(req.body);
  try {
    const { id, name, type, description } = req.body;
    await executeQuery(res, GISQueries.updateGreenArea, [id, name, type, description], "Green area info updated!");
  } catch (error) {
    console.log(error);
  }
  console.log("api: block park info finsihed!");
};

const approveSplitParcel = (req, res) => {
  const { approved_by, approval_date, approval_description, upin1, upin2, name, description } = req.body;
  pool.query(
    queries.approveMergeParcel,
    [approved_by, approval_date, approval_description, upin1, upin2, name, description],
    (error, results) => {
      if (error) console.log(error);
      res.status(201).send("Block added succesfully!");
      console.log("block created");
    }
  );
  pool.query(queries.approveMergeParcelUpdate, [upin1, upin2, name, description], (error, results) => {
    if (error) console.log(error);
    res.status(201).send("Block added succesfully!");
    console.log("block created");
  });
};
const splitParcel = async (req, res) => {
  //let parcelToSplit='';
  try {
    const { upin, x1, y1, x2, y2, description } = req.body;
    await pool.query("START TRANSACTION");
    pool.query(queries.splittedParcels, [upin, x1, y1, x2, y2], async (error, results) => {
      if (error) console.log(error);
      if (results) {
        await pool.query("START TRANSACTION");
        //console.log(results);
        results.rows.map(async (eachRow) => {
          await pool.query("START TRANSACTION");
          const res2 = await pool.query(queries.splitParcel, [eachRow.splitted_data, upin]);
          await pool.query("COMMIT");
          //console.log(res2);
        });
        await pool.query("COMMIT");
        await pool.query("START TRANSACTION");
        const res3 = await pool.query(GISQueries.splitParcelDeactivate, [upin]);
        //console.log(res3);
        await pool.query("COMMIT");
      }
      //console.log(results);
    });

    console.log("parcel to split");

    await pool.query("COMMIT");
  } catch (ex) {
    console.log(ex);
  }
};
export default {
  updateParkInfo,
  updateSurveys,
  deleteSurveys,
  updateOtherInfo,
  updateBlock,
  updateParcel,
  updateGreenArea,
  saveApproval, //  updateSpatialsAttributeData,
  mergeParcel,
  saveParcelToMerge,
  saveParcelToSplit,
  approveMergeParcel,
  splitParcel,
  approveSplitParcel,
};
const getNameOfTable = (featureType) => {
  console.log(featureType);
  switch (featureType.toLowerCase()) {
    case "road":
      return "infra_road";
    case "sheds":
      return "sheds";
    case "communication":
      return "infra_communication";
    case "green area":
      return "infra_green_area";
    case "building":
      return "building";
    case "gcp":
      return "gcp_survey_points";
    case "other":
      return "infra_other";
    case "power":
      return "infra_power";
    case "storage":
      return "infra_storage";
    case "waste":
      return "infra_waste_disposal";
    case "water":
      return "infra_water";
    default:
      return "";
  }
};

//const utm37n = "+proj=utm +zone=37 +a=6378249.145 +rf=293.465 +towgs84=-166,-15,204,0,0,0,0 +units=m +no_defs"; //"+proj=utm +zone=37 +datum=WGS84 +units=m +no_defs";
//const WGS84 = proj4.WGS84;

//        const query = `INSERT INTO public.parcels(upin, block_no, name, planned_for, current_function, description, boundary, type, no_of_buildings, no_of_planned_buildings, park_id,local_shed_no)
//                                             VALUES (get_new_upin(st_geomfromgeojson($2)), get_block_no(st_geomfromgeojson($2)), 'N/A', 'Not set', 'Not set', 'Not set', st_geomfromgeojson($2), 'N/A', 0, 0,get_park_id(st_geomfromgeojson($2)), $1);`;

//  const utm37n = "+proj=utm +zone=37 +a=6378249.145 +rf=293.465 +towgs84=-166,-15,204,0,0,0,0 +units=m +no_defs"; //"+proj=utm +zone=37 +datum=WGS84 +units=m +no_defs";
//  const WGS84 = proj4.WGS84;
