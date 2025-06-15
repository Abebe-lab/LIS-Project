import { executeQuery, executeQueryAndGetRows } from "../utils/dbHandler.js";
import CEOQueries from "../quieries/CEOQueries.js";
import { fileUploader, uploader } from "../utils/uploader.js";
const addPlaceOnHold = async (req, res) => {
  console.log("[ceo hold place started]");
  try {
    const { upin, description, investor_id } = req.body;
    //console.log(req.body)
    const uploaded_path = await fileUploader(req.file, "CEO/on_hold");
    console.log("path: ", uploaded_path);
    const statusChanged = await executeQueryAndGetRows(res, CEOQueries.updateReserved, [upin]);
    //console.log(statusChanged);
    const orderedBy = req.userId;
    const reason = req.body.reason || "CEO requested";
    if (statusChanged) {
      return await executeQuery(res, CEOQueries.addPlaceOnHold, [upin, description, uploaded_path, orderedBy, reason]);
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  console.log("[ceo hold place done]");
  return null;
};
const reminderOnLongPause = async (req, res) => {
  try {
    const thirtyDayPast = await executeQueryAndGetRows(res, CEOQueries.getParselsReservePassedDate);
    res.status(200).json(thirtyDayPast);
  } catch (error) {
    console.log(error);
  }
};
export default {
  addPlaceOnHold,
  reminderOnLongPause,
};
