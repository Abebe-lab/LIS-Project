import pool from "../../../db.js";
import financeQueries from "../quieries/financeQueries.js";
import XLSX from "xlsx";
import dateHelpers from "../utils/dateHelpers.js";
import { fileUploader, uploadExcelFile } from "../utils/uploader.js";
import { executeQuery, executeQueryAndGetResult } from "../utils/dbHandler.js";
import { convertTextToNumber } from "../utils/ConversionHelper.js";
const registerCollection = async (req, res) => {
  console.log("api: collection registration started..."); //console.log(req.body);
  try {
    const references_path = await fileUploader(req.file, `finance/collection/${req.body.agreement_id}`);
    //prettier-ignore
    const result = await executeQueryAndGetResult(res, financeQueries.registerCollection, 
      [req.body?.invoice_no, req.body?.agreement_id, req.body?.amount, req.body?.payment_date, req.body?.payment_type,
      req.body?.bank_name, req.body?.reference_no, req.body?.description, req.body?.if_late_penality_interest_amount || 0.0,
      req.body?.recieved_by, req.body?.payment_period, req.body?.arrear_skipped_amount, req.body?.arrear_skipping_description, references_path,
    ]);
    if (result) {
      return res.status(201).send("collection added succesfully!"); //console.log("registration successful!");
    }
  } catch (err) {//console.log(err);
    return res.status(500).send("error on saving!");
  } finally {
    console.log("api: register collection finished");
  }
};
const importExistingCollections = async (req, res) => {
  console.log("api: ImportExistingcollection started ...");
  if (!req.body) return res.statu(400).send("No data provided!");
  const { importType } = req.body;
  console.log(importType);
  try {
    uploadExcelFile(req, res, "existing_collection").then((response) => {
      if (response) {
        //console.log(response);
        if (importType === "collection") {
          console.log("now collection saving started");
          saveCollectionToDatabase(req, res, response).then((resut) =>
            res.status(201).send("Importing existing tenant added succesfully!")
          );
        } else if (importType === "finance_rules") {
          saveFinanceRulesToDatabase(req, res, response).then((resut) =>
            res.status(201).send("Importing finance rules to db added succesfully!")
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on Importing existing finance collection/rules");
  } finally {
    console.log("api: ImportExistingcollection finished");
  }
};

const getCollections = async (req, res) => {
  console.log("api: get collections started");
  const result = await executeQuery(res, financeQueries.getCollections);
  console.log(result);
  console.log("api: get collections ended");
};
const updateCollection = async (req, res) => {
  console.log("api: update collections started");
  if (!req.params.id) {
    res.status(400).send("No id provided");
    return;
  }
  const {
    invoice_no,
    agreement_id,
    amount,
    payment_date,
    payment_type,
    bank_name,
    reference_no,
    description,
    if_late_penality_interest_amount,
    recieved_by,
  } = req.body;
  const result = await executeQuery(res, financeQueries.updateCollection, [
    req.params.id,
    id,
    invoice_no,
    agreement_id,
    amount,
    payment_date,
    payment_type,
    bank_name,
    reference_no,
    description,
    if_late_penality_interest_amount,
    recieved_by,
  ]);
  console.log(result);
  console.log("api: update collections ended");
};
const deleteCollection = async (req, res) => {
  console.log("api: delete collections started");
  if (!req.params.id) {
    res.status(400).send("No id provided");
    return;
  }
  const result = await executeQuery(res, financeQueries.deleteCollection, [req.params.id]);
  //console.log(result);
  console.log("api: delete collections ended");
};
const RegisterFinanceRule = async (req, res) => {
  console.log("api: register finance rule started");
  try {
    const { title, fee_calculation_type, amount, description } = req.body;
    //const attachment=req.file.o
    const attachmentPath = await fileUploader(req.file, "finance");
    const result = await executeQuery(
      res,
      financeQueries.registerFinanceRule,
      [title, fee_calculation_type, amount, description, attachmentPath],
      "Finance rule registered"
    );
    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
  console.log("api: register finance rule ended");
};
const getFinanceRules = async (req, res) => {
  console.log("api: get finance rules started");
  const result = await executeQuery(res, financeQueries.getFinanceRules);
  //console.log(result);
  console.log("api: get finance rules ended");
};
const updateFinanceRule = async (req, res) => {
  console.log("api: update finance rule started");
  try {
    const { title, fee_calculation_type, amount, description } = req.body;
    //const attachment=req.file.o
    const attachmentPath = await fileUploader(req.file, "finance");
    const result = await executeQuery(res, financeQueries.updateFinanceRule, [
      title,
      fee_calculation_type,
      amount,
      description,
      attachmentPath,
    ]);
    //  console.log(result);
  } catch (error) {
    console.log(error);
  }
  console.log("api: update finance rule ended");
};
const deleteFinanceRule = async (req, res) => {
  console.log("api: delete finance rules started");
  if (!req.params.id) {
    res.status(400).send("No id provided");
    return;
  }
  const result = await executeQuery(res, financeQueries.deleteFinanceRule, [req.params.id]);
  //console.log(result);
  console.log("api: delete finance rules ended");
};
const registerRentalRate = async (req, res) => {
  console.log("api: register rental rate started");
  try {
    const { park_id, type_of_property, from, to, description, adjusted_by, park_name, amount } = req.body;
    //const attachment=req.file.o
    //const attachmentPath=await fileUploader(req.file,'finances/rental_rate');
    const result = await executeQuery(res, financeQueries.registerRentalRate, [
      park_id,
      type_of_property,
      from,
      to,
      description,
      adjusted_by,
      park_name,
      amount,
    ]);
    //console.log(result);
  } catch (error) {
    console.log(error);
  }
  console.log("api: register rental rate ended");
};
const getRentalRates = async (req, res) => {
  console.log("api: get rental retes started");
  const result = await executeQuery(res, financeQueries.getRentalRates);
  //console.log(result);
  console.log("api: get rental rates ended");
};

const updateRentalRate = async (req, res) => {
  console.log("api: update rental rate started");
  try {
    const { park_id, type_of_property, from, to, description, adjusted_by, park_name, amount } = req.body;
    //const attachment=req.file.o
    //const attachmentPath=await fileUploader(req.file,'finances/');
    const result = await executeQuery(res, financeQueries.updateRentalRate, [
      req.params.id,
      park_id,
      type_of_property,
      from,
      to,
      description,
      adjusted_by,
      park_name,
      amount,
    ]);
    //  console.log(result);
  } catch (error) {
    console.log(error);
  }
  console.log("api: update rental rate ended");
};
const deleteRentalRate = async (req, res) => {
  console.log("api: delete rental rates started");
  if (!req.params.id) {
    res.status(400).send("No id provided");
    return;
  }
  const result = await executeQuery(res, financeQueries.deleteRentalRate, [req.params.id]);
  //console.log(result);
  console.log("api: delete rental rates ended");
};

const registerLeaseRate = async (req, res) => {
  console.log("api: register rental rate started");
  try {
    const { park_id, type_of_property, from, to, description, adjusted_by, park_name, amount } = req.body;
    //const attachment=req.file.o
    const attachmentPath = await fileUploader(req.file, "finance/lease_rate");
    const result = await executeQuery(res, financeQueries.registerLeaseRate, [
      park_id,
      type_of_property,
      from,
      to,
      description,
      adjusted_by,
      park_name,
      amount,
    ]);
    //console.log(result);
  } catch (error) {
    console.log(error);
  }
  console.log("api: register rental rate ended");
};
const getLeaseRates = async (req, res) => {
  console.log("api: get lease retes started");
  const result = await executeQuery(res, financeQueries.getLeaseRates);
  //console.log(result);
  console.log("api: get lease rates ended");
};

const updateLeaseRate = async (req, res) => {
  console.log("api: update lease rate started");
  try {
    !req.params.id && res.status(400).send("No id provided");
    const { park_id, type_of_property, from, to, description, adjusted_by, park_name, amount } = req.body;
    //const attachment=req.file.o
    //const attachmentPath=await fileUploader(req.file,'finances/');
    const result = await executeQuery(res, financeQueries.updateLeaseRate, [
      req.params.id,
      park_id,
      type_of_property,
      from,
      to,
      description,
      adjusted_by,
      park_name,
      amount,
    ]);
    //console.log(result);
  } catch (error) {
    console.log(error);
  }
  console.log("api: update lease rate ended");
};
const deleteLeaseRate = async (req, res) => {
  console.log("api: delete lease rates started");
  if (!req.params.id) {
    res.status(400).send("No id provided");
    return;
  }
  const result = await executeQuery(res, financeQueries.deleteLeaseRate, [req.params.id]);
  //console.log(result);
  console.log("api: delete lease rates ended");
};
const saveCollectionToDatabase = async (req, res, buffer) => {
  console.log("api: collection registration started...");
  try {
    const { user_id } = req.body;
    const workbook = XLSX.readFile(buffer);
    const worksheet = workbook.Sheets["collection"];
    const allExcelRow = XLSX.utils.sheet_to_json(worksheet);
    allExcelRow.map(async (row, index) => {
      const {
        invoice_no,
        agreement_id,
        amount,
        collection_date,
        collection_type,
        bank_name,
        reference_no,
        description,
        penality,
        next_payment_date,
      } = row;
      //console.log(row);
      //alert(row);
      let formattedCollectionDate;
      formattedCollectionDate = dateHelpers.convertToDate(collection_date);
      //console.log(formattedCollectionDate);
      pool
        .query(financeQueries.registerCollection, [
          invoice_no,
          agreement_id,
          convertTextToNumber(amount),
          formattedCollectionDate,
          collection_type,
          bank_name,
          reference_no,
          description,
          convertTextToNumber(penality),
          user_id,
        ])
        .then(async (result, error) => {
          if (error) console.log(error);
          else if (result) {
            console.log("updatin agreement for ", agreement_id);
            const nextPaymentDateFormatted = dateHelpers.convertToDate(next_payment_date);
            console.log(nextPaymentDateFormatted);
            const agrRes = await pool.query(financeQueries.updateNextPaymentDate, [
              nextPaymentDateFormatted,
              agreement_id,
            ]);
          }
        });
    });
    //todo:
    //also add to update next payment

    console.log("reading and saving excel completed");
  } catch (error) {
    //throw error;
    console.log(error);
  } finally {
    console.log("api: collection registration finished");
  }
  return true;
};
const saveFinanceRulesToDatabase = async (req, res, buffer) => {
  try {
    const { user_id } = req.body;
    const workbook = XLSX.readFile(buffer);
    const worksheet = workbook.Sheets["collection"];
    const allExcelRow = XLSX.utils.sheet_to_json(worksheet);
    allExcelRow.map(async (row, index) => {
      const {
        invoice_no,
        agreement_id,
        amount,
        collection_date,
        collection_type,
        bank_name,
        reference_no,
        description,
        penality,
      } = row;
      let formattedCollectionDate;
      if (typeof collection_date === "number") {
        const date = XLSX.SSF.parse_date_code(collection_date);
        formattedCollectionDate = new Date(Date.UTC(date.y, date.m - 1, date.d, date.H, date.M, date.S));
      } else {
        formattedCollectionDate = new Date(collection_date); // If it's already a string or Date object
      }

      pool
        .query(InvestorAftercareQueries.importCollection, [
          invoice_no,
          agreement_id,
          amount,
          formattedCollectionDate,
          collection_type,
          bank_name,
          reference_no,
          description,
          penality,
          user_id,
        ])
        .then((result, error) => {
          if (error) console.log(error);
          else if (result) console.log("Registered: ", result);
        });
    });
    console.log("reading and saving excel completed");
  } catch (error) {
    //throw error;
    console.log(error);
  } finally {
    console.log("api: collection registration finished");
  }
  return true;
};

export default {
  registerCollection,
  getCollections,
  updateCollection,
  deleteCollection,
  RegisterFinanceRule,
  getFinanceRules,
  updateFinanceRule,
  deleteFinanceRule,
  registerRentalRate,
  getRentalRates,
  updateRentalRate,
  deleteRentalRate,
  registerLeaseRate,
  getLeaseRates,
  updateLeaseRate,
  deleteLeaseRate,
  importExistingCollections,
  saveCollectionToDatabase,
};
