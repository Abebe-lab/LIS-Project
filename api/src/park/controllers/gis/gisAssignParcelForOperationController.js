import gisAssignParcelForOperationQueries from "../../quieries/gis/gisAssignParcelForOperationQueries.js";
import { executeQueryAndGetResultWithoutRes } from "../../utils/dbHandler.js";
import { fileUploader } from "../../utils/uploader.js";
const assignParcelForOperation = async (req, res) => {
  try {
    const { upin, asignment_comment, assignment_attachment } = req.body;
    assigned_by = req.userId;
    const file_location = await fileUploader(req.file, "assign_parcel_to_operation");

    const result = await executeQueryAndGetResultWithoutRes(
      gisAssignParcelForOperationQueries.assignParcelForOperation,
      [upin, assigned_by, asignment_comment, file_location]
    );
    if (result) {
      const result2 = await executeQueryAndGetResultWithoutRes(
        gisAssignParcelForOperationQueries.changeParcelStatusToAsigned,
        [upin]
      );
      res.json({ message: `Successful Import of ${layer_name}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to assignParcelForOperation, Please try again!" });
  }
};
const approveAssignedParcelToOperation = async (req, res) => {
  try {
    const { id, approval_comment, upin, approval_attachment } = req.body;
    const approved_by = req.userId;
    const file_location = await fileUploader(req.file, "approve_parcel_to_operation");
    const result = await executeQueryAndGetResultWithoutRes(
      gisAssignParcelForOperationQueries.approveAssignedParcelToOperation,
      [id, approved_by, approval_comment, file_location]
    );
    if (result) {
      const result2 = await executeQueryAndGetResultWithoutRes(
        gisAssignParcelForOperationQueries.changeParcelStatusToApproved,
        [upin]
      );
      res.json({ message: `Successful Approval of ${layer_name}` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to approveAssignedParcelToOperation, Please try again!" });
  }
};

const getUnapprovedAssignedParcels = async (req, res) => {
  try {
    const result = await executeQueryAndGetResultWithoutRes(
      gisAssignParcelForOperationQueries.getUnapprovedAssignedParcels,
      []
    );
    if (result) {
      return res.json(result.rows || { message: "No unapproved assigned parcels found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get unapproved assigned parcels, Please try again!" });
  }
};

const getApprovedParcels = async (req, res) => {
  try {
    const result = await executeQueryAndGetResultWithoutRes(gisAssignParcelForOperationQueries.getApprovedParcels, []);
    if (result) {
      return res.json(result.rows || { message: "No approved parcels found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get approved parcels, Please try again!" });
  }
};
const getDeclinedParcelAssignments = async (req, res) => {
  try {
    const result = await executeQueryAndGetResultWithoutRes(
      gisAssignParcelForOperationQueries.getDeclinedParcelAssignments,
      []
    );
    if (result) {
      return res.json(result.rows || { message: "No unapproved assigned parcels found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get unapproved assigned parcels, Please try again!" });
  }
};
const deleteAssignedParcelToOperation = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await executeQueryAndGetResultWithoutRes(
      gisAssignParcelForOperationQueries.deleteAssignedParcelToOperation,
      [id]
    );
    if (result) {
      res.json({ message: "Successfully deleted the assigned parcel to operation." });
    } else {
      res.status(404).json({ message: "No parcel found with the given ID." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete assigned parcel to operation, Please try again!" });
  }
};

const resetParcelStatusToVacant = async (req, res) => {
  try {
    const { upin, id } = req.body;
    const result = await executeQueryAndGetResultWithoutRes(
      gisAssignParcelForOperationQueries.resetParcelStatusToVacant,
      [upin]
    );
    if (result) {
      const result2 = await executeQueryAndGetResultWithoutRes(
        gisAssignParcelForOperationQueries.updateApprovedToResetStatusToDeclined,
        [id]
      );
      return res.json({ message: "Successfully reset the parcel status to vacant." });
    } else {
      res.status(404).json({ message: "No parcel found with the given UPIN." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to reset parcel status to vacant, Please try again!" });
  }
};

export default {
  assignParcelForOperation,
  approveAssignedParcelToOperation,
  deleteAssignedParcelToOperation,
  resetParcelStatusToVacant,
  getApprovedParcels,
  getUnapprovedAssignedParcels,
  getDeclinedParcelAssignments,
};
