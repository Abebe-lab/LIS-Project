import ParkQueries from "../quieries/parkQueries.js";
import { executeQueryAndGetResultWithoutRes, executeQueryAndGetRows } from "../utils/dbHandler.js";
import { uploader } from "../utils/uploader.js";
const registerHandover = async (req, res) => {
  console.log("[api: register handover start]");
  console.log(req.body);
  try {
    const {
      agreement_id,
      handover_date,
      handedover_by,
      handedover_to,
      notes,
      signed_document_path,
      description,
      park_id,
    } = JSON.parse(req.body.data);
    //console.log("files: ",req.file);
    const attachment_path = req.file ? await uploader(req, `handover/${agreement_id}`) : null;
    console.log("attachment path",attachment_path);
    //agreement_id, date_of_handover, handed_over_by, handed_over_to, notes, description, attachment_paths, park_id
    const rows = await executeQueryAndGetRows(res, ParkQueries.registerHandover, [
      agreement_id,
      handover_date,
      handedover_by,
      handedover_to,
      notes,
      description,
      attachment_path,
      park_id,
    ]);
    console.log("id: ", rows);
     res.status(201).json("successfully executed!");
  } catch (error) {
    console.log(error);
  }
  console.log("[api: register handover end]");
};
const getHandovers = async (req, res) => {
  try {
    const rows = await executeQueryAndGetResultWithoutRes(ParkQueries.getHandovers, []);
    console.log(rows);
    res.status(200).json(rows, { message: "handover sent successfully!" });
  } catch (error) {
    console.log(error);
  }
};
const getHandoversByPark = async (req, res) => {
  try {
    const { park_id } = req.params;
    const rows = await executeQueryAndGetResultWithoutRes(ParkQueries.getHandoversByPark, []);
    console.log(rows);
    res.status(200).json(rows, { message: "handover sent successfully!" });
  } catch (error) {
    console.log(error);
  }
};
export default {
  registerHandover,
  getHandovers,
  getHandoversByPark,
};
