import gisImportDataQueries from "../../quieries/gis/gisImportDataQueries.js";
import fs from "fs";
//import proj4 from "proj4"; //import ogr2ogr from "ogr2ogr";
import shp from "shpjs";
import { fileUploader } from "../../utils/uploader.js";
import {
  executeQueryAndGetResult,
  executeQueryAndGetRows,
  executeQueryAndGetResultWithoutRes,
} from "../../utils/dbHandler.js";
import gisGetMapDataQueries from "../../quieries/gis/gisGetMapDataQueries.js";
import gisUtilities from "./gisUtilities.js";

const readZipShapeAndReturnGeojson = async (file_path) => {
  //console.log("Reading zip and returning GeoJSON started: file path", file_path);

  try {
    const geojson = await new Promise((resolve, reject) => {
      fs.readFile(file_path, (err, data) => {
        if (err) return reject(err);

        shp(data)
          .then((geojson) => {
            if (!geojson) return resolve(null);
            //console.log("GeoJSON inside:", geojson);
            resolve(geojson);
          })
          .catch((err) => {
            //console.error("Error parsing shapefile:", err);
            resolve(null); // Resolve with null in case of an error
          });
      });
    });
    //console.log("GeoJSON outside:", geojson);
    return geojson;
  } catch (error) {
    //console.error("[GeoJSON error]", error);
    return null;
  }
};

const implementImportingOfSpatialDataFromFile = async (
  res,
  file_location,
  approved_by,
  park_id,
  layer_name,
  category
) => {
  try {
    console.log("[2. full path:] extract", file_location);
    const geojson = await readZipShapeAndReturnGeojson(file_location);
    //console.log("[fetched geojson]", JSON.stringify(geojson));
    if (!geojson) return !file_location && res.send(400).json({ message: "File not found" });
    if (category === "infra_utility" || layer_name === "green_area") {
      await insertGeomToPostGIS(res, park_id, layer_name, geojson?.features);
    } else if (category === "cadastral") {
      if (layer_name === "blocks" || layer_name === "parcels" || layer_name === "building" || layer_name === "sheds") {
        console.log("[started saving to db]");
        //console.log(geojson);
        const r = await insertGeomToPostGISCadastral(res, park_id, layer_name, geojson?.features, layer_name);
        console.log("[saved saving to db]");
        //console.log(r)
      }
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
};
const importInfrastructure = async (req, res) => {
  console.log("[importing spatial data started]");
  try {
    let withInBoundary=false;
    const { imported_by, park_id, layer_name, category } = req.body;
    
    //    console.log("1.1. the body:\n", req.body);
    if (!req.file) res.status(400).send({ message: "no file attached, please try again" });

    console.log("1.2. file upladed");
    const file_location = await fileUploader(req.file, `spatial_import/park_${park_id}`);
    if (!file_location) return res.send(400).json({ message: "File not found/unable to upload" });
    console.log("[validate first started]");
    const geojson = await readZipShapeAndReturnGeojson(file_location);
    const isValid = await gisUtilities.validateWithinPark(park_id, geojson?.features);
    console.log("is valid :", isValid);
    if (!isValid) {
      //fs.remo
      withInBoundary=true;
      /*return res.status(401).send({
        message:
          "The spatial data does not belong to this park or some parts are outside the boundary, Please modify and try again",
      });*/
    }

    const unapproved = await executeQueryAndGetRows(res, gisImportDataQueries.saveUnapprovedSpatalData, [
      imported_by,
      file_location,
      layer_name,
      park_id,
      category,
    ]);
    console.log("8.2. unapproved finsihed!", unapproved);
    //save message for mp head
    console.log("[message sending for head started]");
    const updateImportMessage = `INSERT INTO public.message_inhouse(sent_from, sent_to, title, description, attachment_s)
         SELECT $1, id, $2, $3, $4
         FROM users 
         WHERE department_id ILIKE 'GIS' AND role ILIKE 'head';`;
    const r3 = await executeQueryAndGetResultWithoutRes(updateImportMessage, [
      req.userId,
      "New Import",
      "Please review new import and approve or decline",
      [],
    ]);
    console.log("[message sending for head finished]");
    res.json({ message: `Successful Import of ${layer_name}` });
  } catch (error) {
    console.error(error);
    //res.status(500).json({ error: "Failed to process shapefile." });
  }
};
async function disableOverlappedFirst(features, layer_name) {
  try {
    for (const feature of features) {
      const geom = feature.geometry;
      const geomAsString = JSON.stringify(geom);
      const properties = feature?.properties;
      if (layer_name === "parcels") {
        let shedNo = properties.shed_no || null;
        shedNo = shedNo ? shedNo : properties.Shade_Numb;
        console.log("disable existing parcel");
        const r1 = await executeQueryAndGetResultWithoutRes(gisImportDataQueries.diableOverlappedParcel, [
          JSON.stringify(geom) || null,
        ]);
      }
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function insertGeomToPostGISCadastral(res, parkId, layer_name, features, tableName) {
  try {
    console.log("disable existing parcel started");
    const allDisabled = await disableOverlappedFirst(features, layer_name);
    console.log("disable existing parcel finsihed");
    if (!allDisabled) return;
    for (const feature of features) {
      const geom = feature.geometry;
      const geomAsString = JSON.stringify(geom);
      const properties = feature?.properties;
      console.log("parcel inputs started...");
      if (layer_name === "parcels") {
        let shedNo = properties.shed_no || null;
        shedNo = shedNo ? shedNo : properties.Shade_Numb;
        const r = await executeQueryAndGetResult(res, gisImportDataQueries.importParcel, [
          shedNo || null,
          JSON.stringify(geom) || null,
        ]);
        //if(overlapping) then deactivate
        console.log("reading spatial true");
      } else if (layer_name === "blocks") {
        let blockNo = properties.block_no || null;
        console.log("block inputs started...");
        const r = await executeQueryAndGetResult(res, gisImportDataQueries.importBlock, [
          JSON.stringify(geom) || null,
          blockNo,
        ]);
        console.log("Block inputs no ", blockNo);
      } else if (layer_name === "building") {
        console.log("[started building saving]");
        const r = await executeQueryAndGetResult(res, gisImportDataQueries.importBuilding, [
          parkId,
          JSON.stringify(geom) || null,
        ]);
        console.log("[finsihed building saving]", r);
      } else if (layer_name === "sheds") {
        console.log("[started shed saving]");
        console.log("geom : ", geom);
        const shedNo = properties?.shed_no || 0;
        const r = await executeQueryAndGetResult(res, gisImportDataQueries.importShed, [ geomAsString || null,shedNo]);
        console.log("[finsihed shed saving]", r);
      } else {
        console.log("[started the rest saving]");
        const r = await executeQueryAndGetResult(
          res,
          `INSERT INTO public.${tableName}(geom) VALUES (ST_GeomFromGeoJSON($1::json))`,
          [JSON.stringify(geom) || null]
        );
        console.log("[finsihed the rest saving]", r);
      }
    }
  } catch (error) {
    console.log("[the error insertGeomToPostGISCadastral]", error);
  }
}

async function insertGeomToPostGIS(res, parkId, layer_name, features) {
  console.log("A. insertGeomToPostGIS");
  try {
    for (const feature of features) {
      const geom = feature.geometry;
      const properties = feature.properties;
      const r = await executeQueryAndGetResult(
        res,
        `INSERT INTO public.infra_${layer_name}(park_id, type, name, description, geom, capacity, unit_of_measure)
      VALUES ($1, $2, $3, $4, ST_GeomFromGeoJSON($5::json), $6, $7)  returning id;`,
        [
          parkId || null,
          geom.type || null,
          properties.name || "Not Named",
          properties.description || null,
          JSON.stringify(geom) || null,
          properties.capacity || null,
          properties.unit_of_measure || null,
        ]
      );

      //console.log(r.rows[0]);
    }
  } catch (err) {
    console.log(err);
  }
}
const exportFeature = async (req, res) => {
  console.log("api: export feature started!");
  try {
    const { featureType, format } = req.params;
    let query = getCorrectQuery(featureType);
    if (!query) res.status(500).send("No information available yet");
    const result = await executeQueryAndGetResult(res, query);
    if (format === "GeoJSON") {
      res.setHeader("Content-Type", "application/json");
      res.send({ type: "FeatureCollection", features: result.rows[0] });
    } else if (format === "shapefile") {
      const geojson = { type: "FeatureCollection", features: result.rows };
      const zip = await shapefile.write(geojson, { folder: "shapefiles", types: { point: featureType } });
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", "attachment; filename=data.zip");
      res.send(zip);
    } else {
      res.status(400).send("Invalid format specified.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while exporting data.");
  }
  console.log("api: export feature finsihed!");
};
/*const importCadastralData = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.importCadastralData);
};*/
const getImportPreview = async (req, res) => {
  try {
    const result = await executeQueryAndGetResult(res, gisImportDataQueries.getImportedFilePath, [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Import not found, please only select imports" });
    const {
      id,
      imported_on,
      imported_by,
      file_path,
      feature_name,
      approved_on,
      approved_by,
      approval_comment,
      attachment_for_approval,
    } = result.rows[0];

    const geojson = await readZipShapeAndReturnGeojson(file_path);
    console.log(geojson);
    res.send(200).json({ geojson, data: result.rows[0] });
  } catch (error) {
    console.log(error);
  }
};
const deleteUnapprovedImport = async (req, res) => {
  console.log("[api: deleteUnapprovedImport]");
  try {
    //chcek if approved
    const result = await executeQueryAndGetResult(res, gisImportDataQueries.getImportedForApproval, [req.params.id]);
    const { approved_on } = result.rows[0];
    console.log("file path: ", result.rows[0]);
    if (approved_on.getFullYear() > 2000) return res.status(404).json({ message: "Import already implemented" });
    //if not approved
    const result2 = await executeQueryAndGetResult(res, gisImportDataQueries.deleteUnapprovedImport, [req.params.id]);
    //console.log("[deleted]: ", result2);
  } catch (error) {
    console.log("[delete unapproved error]: ", error);
  }
  console.log("[api: deleteUnapprovedImport finsihed!]");
};

const approveEachImport = async (res, approvedBy, eachUnapprovedImport) => {
  console.log("[approved importing started]");
  try {
    const { id, file_path, park_id, layer_name, category } = eachUnapprovedImport;
    //console.log(eachUnapprovedImport);
    const result = await executeQueryAndGetResult(res, gisImportDataQueries.approveImports, [id, approvedBy]);
        //save eatch feature from file for use

    return await implementImportingOfSpatialDataFromFile(res, file_path, approvedBy, park_id, layer_name, category);
  } catch (error) {
    console.log(error);
    return false;
  }
};
//const get
const approveAllImports = async (req, res) => {
  try {
    const unApprovedData = await executeQueryAndGetRows(res, gisImportDataQueries.getUnapprovedSpatialData);
    if (unApprovedData?.length === 0) {
      return res.status(404).json({ message: "There are no unapproved imports." });
    }
    for (const data of unApprovedData) {
      await approveEachImport(res, req.userId, data);
    }
    return res.send({ message: "Approved all imports, refresh map to see updated information." });
  } catch (error) {
    console.log(error);
  }
};
const declineEachImport = async (res, declinedBy, eachUnapprovedImport) => {
  try {
    const { id } = eachUnapprovedImport;
    console.log("import to decline is :", id);
    const result = await executeQueryAndGetResult(res, gisImportDataQueries.declineImport, [id, declinedBy]);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
  return null;
};
const declineAllImports = async (req, res) => {
  console.log("[api: declineAllImports started] ");
  try {
    const unApprovedData = await executeQueryAndGetRows(res, gisImportDataQueries.getUnapprovedSpatialData);
    if (unApprovedData?.length === 0) {
      return res.status(404).json({ message: "There are no unapproved imports." });
    }
    for (const data of unApprovedData) {
      console.log(data);
      await declineEachImport(res, req.userId, data);
    }
    console.log("[api: declineAllImports finsihed] ");
    return res.send({ message: "Declined all imports." });
  } catch (error) {
    console.log(error);
    console.log("[api: declineAllImports finsihed with error] ");
    return res.status(500).json({ message: "error occured during saving, please refresh and try again" });
  }
};
// Function to replace overlapping parcels with new features
async function disableOverlappingParcels(features, tableName, geom_attribute_name = "boundary") {
  await client.connect();
  try {
    await client.query("BEGIN"); // Start transaction

    for (const feature of features) {
      // Delete overlapping parcels
      const result1 = await executeQueryAndGetResultWithoutRes(
        `
        UPDATE  ${tableName} SET STATUS='inactive' WHERE ST_Intersects(ST_GeomFromGeoJSON($1), ${geom_attribute_name})
    `,
        [JSON.stringify(feature.geometry)]
      );
      const result2 = await executeQueryAndGetResultWithoutRes(
        `
              INSERT INTO ${tableName} (${geom_attribute_name}) 
              VALUES (ST_GeomFromGeoJSON($1))
          `,
        [JSON.stringify(feature.geometry)]
      );
    }

    console.log("All new parcels have been inserted, replacing overlapping ones.");
  } catch (error) {
    console.error("Error replacing overlapping parcels:", error.stack);
    //throw error;
  }
}

export default {
  importInfrastructure,
  exportFeature,
  getImportPreview,
  deleteUnapprovedImport,
  approveAllImports,
  declineAllImports,
  readZipShapeAndReturnGeojson,
};
const getCorrectQuery = (featureType) => {
  if (!featureType) return null;
  const tableName = getNameOfTable(featureType);

  switch (tableName?.toLowerCase()) {
    case "parks":
      return gisGetMapDataQueries.getParks;
    case "roads":
      return gisGetMapDataQueries.getRoads;
    case "blocks":
      return gisGetMapDataQueries.getBlocks;
    case "sheds":
      return gisGetMapDataQueries.getSheds;
    case "building":
      return gisGetMapDataQueries.getBuildings;
    case "parcels":
      return gisGetMapDataQueries.getParcels;
    case "infra_communication":
      return gisGetMapDataQueries.getCommunication;
    case "infra_green_area":
      return gisGetMapDataQueries.getGreenArea;
    case "infra_power":
      return gisGetMapDataQueries.getPower;
    case "infra_storage":
      return gisGetMapDataQueries.getStorage;
    case "infra_waste_disposal":
      return gisGetMapDataQueries.getWasteDisposal;
    case "infra_water":
      return gisGetMapDataQueries.getWater;
    case "gcps":
      return gisGetMapDataQueries.getGCPs;
    case "plans":
      return gisGetMapDataQueries.getPlans;
    case "surveys":
      return gisGetMapDataQueries.getSurveys;
    case "infra_other":
      return gisGetMapDataQueries.getOtherInfrastructure;

    default:
      return tableName;
  }
};
/*PROJECTION FETCHING
const object = {}
object.shp = await fs.readFile('./path/to/file.shp');
// dbf is optional, but needed if you want attributes
object.dbf = await fs.readFile('./path/to/file.dbf');
// prj is optional, but needed if your file is in some projection you don't want it in
object.prj = await fs.readFile('./path/to/file.prj');
// cpg is optional but needed if your dbf is in some weird (non utf8) encoding.
object.cpg = await fs.readFile('./path/to/file.cpg');

const geojson = await shp(object)
*/
/*const isImported = await implementImportingOfSpatialDataFromFile(
      res,
      file_location,
      imported_by,
      park_id,
      layer_name,
      category
    );*/
