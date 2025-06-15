import { executeQuery, executeQueryAndGetResult, executeQueryAndGetRows } from "../../utils/dbHandler.js";
import gisGetMapDataQueries from "../../quieries/gis/gisGetMapDataQueries.js";
import impt from "../../controllers/gis/gisImportExportController.js";
import { validationResult } from "express-validator";
import shp from "shpjs";

const getGCPs = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getGCPs);
};
const getWaters = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getWater);
};
const getPowers = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getPower);
};
const getCommunications = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getCommunication);
};
const getWasteDisposals = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getWasteDisposal);
};
const getStorages = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getStorages);
};
const getRoads = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getRoads);
};
const getSurveys = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getSurveys);
};
const getSurveysById = async (req, res) => {
  const { id } = req.params;
  await executeQuery(res, gisGetMapDataQueries.getSurveysById, [id]);
};
//============== GET SPATIAL INFO=====================
const getParks = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getParks);
  //console.log("get parks ended");
};
const getParkById = async (req, res) => {
  const { id } = req.params;
  await executeQuery(res, gisGetMapDataQueries.getParkById, [id]);
};
const getBlocks = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getBlocks);
};

const getBlocksById = async (req, res) => {
  const { id } = req.params;
  await executeQuery(res, gisGetMapDataQueries.getBlocksById, [id]);
};
const getParcels = async (req, res) => {
  console.log("parcel fetch started");
  await executeQuery(res, gisGetMapDataQueries.getParcels);
  console.log("parcel fetch ended");
};
const getSheds = async (req, res) => {
  console.log("shed fetch started");
  await executeQuery(res, gisGetMapDataQueries.getSheds);
  console.log("shed fetch ended");
};
const getBuildings = async (req, res) => {
  console.log("building fetch started");
  await executeQuery(res, gisGetMapDataQueries.getBuildings);
  console.log("building fetch ended");
};
const getOtherInfrastructure = async (req, res) => {
  console.log("other infrastructure fetch started");
  await executeQuery(res, gisGetMapDataQueries.getOtherInfrastructure);
  console.log("other infrastructure fetch ended");
};
const getParcelsWithOnwer = async (req, res) => {
  console.log("parcel with owner fetch started");
  await executeQuery(res, gisGetMapDataQueries.getParcelsWithOnwer);
  console.log("parcel with owner fetch end!");
};
const getParcelByUPIN = async (req, res) => {
  console.log("api: get parcel by upin started");
  const id = req.params.id;
  console.log("upin", req.params);
  await executeQuery(res, gisGetMapDataQueries.getParcelByUPIN, [id]);
  console.log("api: get parcel by upin ended");
};
const getParcelsInPark = async (req, res) => {
  const id = req.params.id;
  await executeQuery(res, gisGetMapDataQueries.getParcelsInPark, [id]);
};
const getAvailableParcelsInPark = async (req, res) => {
  const id = req.params.id;
  await executeQuery(res, gisGetMapDataQueries.getAvailableParcelsInPark, [id]);
};
const getParcelByOccupancy = async (req, res) => {
  const status = req.params.status;
  await executeQuery(res, gisGetMapDataQueries.getParcelByOccupancy, [status]);
};
const getImportedParcels = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getImportedParcels);
};
const getParcelsGrouping = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getParcelsGrouping);
};
const getPlans = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getPlans);
};
const getZones = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getZones);
};
const getUnapprovedSpatialData = async (req, res) => {
  await executeQuery(res, gisGetMapDataQueries.getUnapprovedSpatialData);
};
const getUnapprovedSpatialDataById=async(req,res)=>{
  const id=req.params.id;
  await executeQuery(res,gisGetMapDataQueries.getUnapprovedSpatialDataById,[id]);
}
const getUnapprovedSplitAndMergeData = async (req, res) => {
  console.log("[api: getUnapprovedSplitAndMergeData]")
  return await executeQuery(res,gisGetMapDataQueries.getUnapprovedSplitAndMergeData);
}
const getUnapprovedSplitAndMergeDataById = async (req, res) => {
  const id=req.params.id;
  await executeQuery(res,gisGetMapDataQueries.getUnapprovedSplitAndMergeDataByUserId,[id]);
}
const getUnapprovedSpatialDataForMap = async (req, res) => {
  console.log("[api: getUnapprovedSpatialDataForMap] started")
  try {
    const rows = await executeQueryAndGetRows(res, gisGetMapDataQueries.getUnapprovedSpatialData);
    //console.log("rows", rows);
    let finalData = [];
    for (let i = 0; i < rows?.length; i++) {
      let { feature_name, file_path } = rows[i];
      //console.log("row\n",rows[i]);
      //const x={features: await impt.readZipShapeAndReturnGeojson(file_path), feature_name: feature_name};
      const extracted=await impt.readZipShapeAndReturnGeojson(file_path);
      if(extracted){
        finalData[i] = extracted;
        console.log("geojson succesfully converted");
        //console.log("converted",JSON.stringify(finalData[i]));
      }
    }
    return res.json(finalData || { message: successMessage || "Successfully fetched!" });
  } catch (err) {
    console.log(err);
  }
  console.log("[api: getUnapprovedSpatialDataForMap] finsihed")
};
const getUnapprovedSpatialDataByUserId = async (req, res) => {
  const id = req.params.id;
  await executeQuery(res, gisGetMapDataQueries.getUnapprovedSpatialDataByUserId, [id]);
};

const getParcelOccupancyStatusWithDetailByUIPN = async (req, res) => {
  console.log("api-start: getParcelOccupancyStatusWithDetailByUIPN");
  try {
    const result = await executeQueryAndGetResult(res, gisGetMapDataQueries.getParcelOccupancyStatusWithDetailByUIPN, [
      req.params.upin,
    ]);

    if (result.rows.length === 0) return res.status(404).json({ message: "Occupancy not found!" });
    //console.log(result.rows);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  console.log("api-end: getParcelOccupancyStatusWithDetailByUIPN!");
};
const getParcelOccupancyStatusWithDetail = async (req, res) => {
  console.log("api-start: getParcelOccupancyStatusWithDetail");
  try {
    const result = await executeQueryAndGetResult(res, gisGetMapDataQueries.getParcelOccupancyStatusWithDetail);
    res.json(result.rows);
  } catch (error) {
    console.error(err.message);
    res.status(500).send({ message: "Error while fetching" });
  }
  console.log("api-end:getParcelOccupancyStatusWithDetail");
};
const getGreenArea = async(req, res) => {
  try {
    const result = await executeQueryAndGetResult(res, gisGetMapDataQueries.getGreenArea);
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getParks,
  getParkById,
  getBlocks,
  getBlocksById,
  getParcels,
  getSheds,
  getBuildings,
  getParcelsGrouping,
  getParcelsWithOnwer,
  getParcelByUPIN,
  getParcelsInPark,
  getAvailableParcelsInPark,
  getParcelByOccupancy,
  getImportedParcels,
  getRoads,
  getGCPs,
  getWaters,
  getPowers,
  getCommunications,
  getWasteDisposals,
  getStorages,
  getParcelOccupancyStatusWithDetail,
  getParcelOccupancyStatusWithDetailByUIPN,
  getSurveys,
  getSurveysById,
  getOtherInfrastructure,
  getPlans,
  getZones,
  getGreenArea,
  getUnapprovedSpatialData,
  getUnapprovedSpatialDataByUserId,
  getUnapprovedSpatialDataById,
  getUnapprovedSpatialDataForMap,
  getUnapprovedSplitAndMergeData,
  getUnapprovedSplitAndMergeDataById,
};
