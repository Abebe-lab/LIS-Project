import { Router } from "express";
import multer from "multer";

import gisController from "../controllers/gisController.js";
import gisGetMapDataControllers from "../controllers/gis/gisGetMapDataControllers.js";
import controller from "../controllers/controller.js";
import CEOController from "../controllers/CEOController.js";
import gisImportExportController from "../controllers/gis/gisImportExportController.js";
//new assignent Related
import gisAssignParcelForOperationController from "../controllers/gis/gisAssignParcelForOperationController.js";
const upload = multer({ dest: "uploads/" });
const router = Router();

// Park and Parcel Routes
router.get("/parks", gisGetMapDataControllers.getParks);
router.get("/parks/:id", gisGetMapDataControllers.getParkById);
router.get("/blocks", gisGetMapDataControllers.getBlocks);
router.get("/blocks/:id", gisGetMapDataControllers.getBlocksById);
router.get("/parcels", gisGetMapDataControllers.getParcels);
router.get("/parcels/grouping", gisGetMapDataControllers.getParcelsGrouping);
router.get("/parcels/:id", gisGetMapDataControllers.getParcelByUPIN);
router.post("/parcels/:upin/placeOnHold", upload.single("file"), CEOController.addPlaceOnHold);
router.get("/parcelOccupancy/:upin", gisGetMapDataControllers.getParcelByOccupancy);
router.get("/parcelByOccupancy/:upin", gisGetMapDataControllers.getParcelOccupancyStatusWithDetailByUIPN);
router.get("/parcelByOccupancy", gisGetMapDataControllers.getParcelOccupancyStatusWithDetailByUIPN);
router.get("/parcelsInPark/:id", gisGetMapDataControllers.getParcelsInPark);
router.get("/availableParcelsInPark/:id", gisGetMapDataControllers.getAvailableParcelsInPark);
router.get("/sheds", gisGetMapDataControllers.getSheds);
router.get("/referredStatus", controller.getReferredStatus); //eic request
router.get("/parcelsWithOnwer", gisGetMapDataControllers.getParcelsWithOnwer);
// Park and Parcel Routes
router.get("/GCPs", gisGetMapDataControllers.getGCPs);
router.get("/buildings", gisGetMapDataControllers.getBuildings);
router.get("/communications", gisGetMapDataControllers.getCommunications);
router.get("/others", gisGetMapDataControllers.getOtherInfrastructure);
router.get("/roads", gisGetMapDataControllers.getRoads);
router.get("/waters", gisGetMapDataControllers.getWaters);
router.get("/powers", gisGetMapDataControllers.getPowers);
router.get("/wasteDisposals", gisGetMapDataControllers.getWasteDisposals);
router.get("/storages", gisGetMapDataControllers.getStorages);
router.get("/plans", gisGetMapDataControllers.getPlans);
router.get("/zones", gisGetMapDataControllers.getZones);
router.get("/export/:featureType/format/:format", gisImportExportController.exportFeature);
router.get("/surveys", gisGetMapDataControllers.getSurveys);
router.get("/surveys/:id", gisGetMapDataControllers.getSurveysById);
router.get("/greenarea", gisGetMapDataControllers.getGreenArea);
router.get("/infrastructures", controller.getInfrastructures);

router.put("/addBlockInfo", controller.addBlockInfo);
router.put("/addParcelInfo", controller.addParcelInfo);
router.put("/parks/:id", gisController.updateParkInfo);
router.put("/blocks/:id", gisController.updateBlock);
router.put("/parcels/:id", gisController.updateParcel);

router.put("/greenarea/:id", gisController.updateGreenArea);
//router.put("/others/:id", gisController.updateSpatialsAttributeData);
router.put("/surveys/:id", gisController.updateSurveys);
router.put("/others/:table/id/:id", gisController.updateOtherInfo);
  
router.delete("/blocks/:id", controller.deleteBlock);
router.delete("/parcels/:id", controller.deleteParcel);
router.delete("/surveys/:id", gisController.deleteSurveys);
router.post("/mergeParcel", upload.single("file"), gisController.saveParcelToMerge);
router.post("/approveMerge", gisController.approveMergeParcel); 
router.post("/splitParcel",  upload.single("file"), gisController.saveParcelToSplit);
router.post("/approveSplit", gisController.approveSplitParcel); 

router.post("/importInfrastructure", upload.single("file"), gisImportExportController.importInfrastructure);
router.get("/import", gisGetMapDataControllers.getImportedParcels);
//unapproved data
router.get("/unapprovedSpatialData", gisGetMapDataControllers.getUnapprovedSpatialData);
router.get("/unapprovedSpatialData/:id", gisGetMapDataControllers.getUnapprovedSpatialDataByUserId);
router.delete("/unapprovedSpatialData/:id", gisImportExportController.deleteUnapprovedImport);

router.get("/unapprovedSplitAndMergeData", gisGetMapDataControllers.getUnapprovedSplitAndMergeData);
router.get("/unapprovedSplitAndMergeData/:id", gisGetMapDataControllers.getUnapprovedSplitAndMergeDataById);
//router.delete("/unapprovedSplitAndMergeData/:id", gisImportExportController.deleteUnapprovedSplitAndMergeData);

router.post("/saveApproval", gisController.saveApproval);

router.get("/imports/unapprovedImportsForMap", gisGetMapDataControllers.getUnapprovedSpatialDataForMap);
router.put("/imports/approve", gisImportExportController.approveAllImports);
router.put("/imports/approve/:id", gisImportExportController.approveAllImports);
router.put("/imports/decline", gisImportExportController.declineAllImports);
//router.put("/splitAndMerge/approve", gisImportExportController.approveAllSplitAndMerge);
//router.put("/splitAndMerge/decline", gisImportExportController.declineAllSplitAndMerge);
//router.put("/splitAndMerge/approve/:id", gisImportExportController.approveAllSplitAndMergeById);
//router.put("/splitAndMerge/decline/:id", gisImportExportController.declineAllSplitAndMergeById);

//NEW ABOUT UPDATING
router.post("parcels/assignToOperation", gisAssignParcelForOperationController.assignParcelForOperation);
router.post("parcels/approveAssignToOperation", gisAssignParcelForOperationController.approveAssignedParcelToOperation);
router.delete("parcels/deleteAssignToOperation", gisAssignParcelForOperationController.deleteAssignedParcelToOperation);
router.put("parcels/resetParcelStatusToVacant", gisAssignParcelForOperationController.resetParcelStatusToVacant);
router.get("parcels/getApprovedParcels", gisAssignParcelForOperationController.getApprovedParcels);
router.get("parcels/getUnapprovedAssignedParcels", gisAssignParcelForOperationController.getUnapprovedAssignedParcels);
router.get("parcels/getDeclinedParcelAssignments", gisAssignParcelForOperationController.getDeclinedParcelAssignments);

export default router;
