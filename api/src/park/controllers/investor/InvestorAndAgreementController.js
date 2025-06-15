import InvestorAndAgreementQueries from "../../quieries/InvestorAndAgreementQueries.js";
import {
  executeQuery,
  executeQueryAndGetResult,
  executeQueryAndGetResultWithoutRes,
  executeQueryAndGetRows,
} from "../../utils/dbHandler.js";
import { validationResult } from "express-validator";
import { fileUploader, uploader } from "../../utils/uploader.js";

const addNewInvestor = async (req, res) => {
  console.log("[api: add new investor started]");
  if (!validationResult(req).isEmpty()) return res.status(400).json({ errors: validationResult(req).array() });
  try {
    // console.log(req.files, req.file);
    const fileSaved = await uploader(req, "investors");
    const rows = await executeQueryAndGetRows(
      res,
      InvestorAndAgreementQueries.addNewInvestor,
      // prettier-ignore
      [req?.body?.tin_no,req?.body?.company_name,req?.body?.contact_person,req?.body?.phone_no,req?.body?.mobile_no,req?.body?.email,
        req?.body?.website,req?.body?.nationality_origin,req?.body?.description,req?.body?.contact_person_position,req?.body?.capital_in_usd,
        fileSaved,
      ]
    );
    if (!rows) res.status(400).send("Error occured while saving");
    console.log("investor id", rows[0].id);
    return res.status(200).send({ message: "Investor added succesfully!" });
  } catch (err) {
    console.log(err);
  }
  console.log("[api: add new investor ended]");
};

//============EIC - add prospective investor

const addProspectiveInvestor = async (req, res) => {
  console.log("[api: add prospective investor started]");
  try {
    const parsedData = JSON.parse(req.body.data);
    const planBasePath = `prospectives/${parsedData.tin_no ? parsedData.tin_no : "_000"}`;
    console.log("planned path: ", planBasePath);
    const documents_attached = [
      {
        license: req.files["license"] ? await fileUploader(req.files["license"][0], `${planBasePath}/license`) : null,
        legalDocumet: req.files["legal_documents"]
          ? await fileUploader(req.files["legal_documents"][0], `${planBasePath}/legal`)
          : null,
        proposal: req.files["proposal"]
          ? await fileUploader(req.files["proposal"][0], `${planBasePath}/proposal`)
          : null,
        application: req.files["application"]
          ? await fileUploader(req.files["application"][0], `${planBasePath}/application`)
          : null,
      },
    ];
    const result = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.addProspectiveInvestor, [
      parsedData.tin_no,
      parsedData.company_name,
      parsedData.contact_person,
      parsedData.phone_no,
      parsedData.mobile_no,
      parsedData.email,
      parsedData.website,
      parsedData.nationality_origin,
      parsedData.description,
      parsedData.documents_attached,
    ]);
    if (result) {
      res.status(201).send("Prospective investor added succesfully!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("System error occured, Please try again!");
  } finally {
    console.log("[api: add prospective investor finished]");
  }
};
//--------------------------UPDATE-------------
const updateInvestorInfo = async (req, res) => {
  console.log("[api: update investor info started]");
  try {
    const tin_no = req.params.tin_no;
    const results = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.updateInvestorInfo, [tin_no]);
    if (results.rows.length === 0) {
      return res.status(200).send("Investor updated succesfully!");
    }
  } catch (err) {
    console.log(err);
  }
  console.log("[api: update investor info ended]");
};
const updateProspectiveInvestorInfo = async (req, res) => {
  console.log("[api: update prospective investor info started]");
  try {
    const tin_no = req.params.tin_no;
    const results = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.updateProspectiveInvestorInfo, [
      tin_no,
    ]);
    if (results.rows.length === 0) {
      return res.send("no such prospective investor");
    }
    return res.status(200).send("Prospective investor updated succesfully!");
  } catch (err) {
    console.log(err);
  }
  console.log("[api: update prospective investor info ended]");
};

//--------------------------END UPDATE
//===============DELETE INVESTOR INFO AND PROSPECTIVE INVESTOR INFO
const deleteInvestorInfo = async (req, res) => {
  console.log("[api: delete investor info started]");
  try {
    const tin_no = req.params.tin_no;

    const results = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.deleteInvestorInfo, [tin_no]);
    if (results.rows.length === 0) {
      res.send("no such investor");
    }
    res.status(200).send("Investor deleted succesfully!");
  } catch (err) {
    console.log(err);
  }
  console.log("[api: delete investor info ended]");
};

const deleteProspectiveInvestorInfo = async (req, res) => {
  console.log("[api: delete prospective investor info started]");
  try {
    const tin_no = req.params.tin_no;
    //delete prospective investor info from database using tin_no
    const results = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.deleteProspectiveInvestorInfo, [
      tin_no,
    ]);
    if (results.rows.length === 0) {
      res.send("no such prospective investor");
    }
    res.status(200).send("Prospective investor deleted succesfully!");
  } catch (err) {
    console.log(err);
  }
  console.log("[api: delete prospective investor info ended]");
};
//=============== END DELETE
//----------------GET INFO
const getInvestorsInfo = async (req, res) => {
  console.log("[api: get investors info started]");
  try {
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.getInvestorsInfo);
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get investors info ended]");
};
const getInvestorsByParkAndSector = async (req, res) => {
  console.log("[api: get investors by park and sector started]");
  try {
    const results = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.getInvestorsByParkAndSector);
    return res.status(200).send(results.rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get investors by park and sector ended]");
};

const getProspectiveInvestorsInfo = async (req, res) => {
  console.log("[api: get prospective investors info started]");
  try {
    const results = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.getProspectiveInvestorsInfo);
    res.status(200).send(results.rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get prospective investors info ended]");
};
const getInvestorInfoById = async (req, res) => {
  console.log("[api: get investor info by id started]");
  try {
    const id = req?.params?.id || req?.body?.id;

    const rows = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.getInvestorInfoById, [id]);
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get investor info by id ended]");
};
const getProspectiveInvestorInfoByTinNo = async (req, res) => {
  console.log("[api: get prospective investor info by tin no started]");
  try {
    const tin_no = req.params.tin_no;
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.getProspectiveInvestorsInfo, [tin_no]);

    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get prospective investor info by tin no ended]");
};

//TODO: ADD AGREEMENT
const addAgreementOfEachParcel = async (agreement_id, upins) => {
  if(!upins) return;
  try {
    upins.map(
      async (eachUpin) =>
        await executeQueryAndGetResultWithoutRes(InvestorAndAgreementQueries.addAgreementOfEachParcel, [
          agreement_id,
          eachUpin,
        ])
    );
  } catch (error) {
    console.log(error);
  }
};
const addAgreement = async (req, res) => {
  console.log("[api: agreement registration started]");
  //console.log("body", req.body);
  try {
    const mou_attachment = await fileUploader(req.file, "agreements");
    if(!req.body || req.body.length===0) res.status(402).send({message: "No information sent with the request"});
        //prettier-ignore
    const { tenant_id, upin, ownership_type, investment_type, contract_issue, contract_renewal, moe_signed, production_capacity,
      handover_date, rehandover_date, production_commencement_date, market_destination, intl_brands_link, disposal_method,
      export_capacity, employee_capacity, monthly_rent, grace_period_ending_date, security, advance_payment, annual_mngmnt_service_fee,
      payment_mode, late_charge_fee, contract_period, description, agreement_id, current_status, penality_rate, linkage, area_as_per_contract_in_m2,
    } = req.body;
    //area is the main calculating factor
    const noOfAgreements=await executeQueryAndGetResult(res,InvestorAndAgreementQueries.getAgreementById,[agreement_id])
    if(noOfAgreements.rows.length>0){
    //prettier-ignore
    return res.status(402).send("Agreement identification already registered, Please try again!");
  }
  const results = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.addAgreement, [
    tenant_id, upin, 1, ownership_type || "", investment_type || "", contract_issue || "1900-01-01", contract_renewal || "1900-01-01",
    moe_signed || "1900-01-01", production_capacity || 0.0, handover_date || "1900-01-01", rehandover_date || "1900-01-01",
    production_commencement_date || "1900-01-01", market_destination || null, intl_brands_link || null, disposal_method || "", 
    export_capacity || 0.0, employee_capacity || 0, monthly_rent || 0.0, grace_period_ending_date || "1900-01-01",
    security || 0.0, advance_payment || 0.0, annual_mngmnt_service_fee || 0.0, payment_mode || "USD", 
    late_charge_fee || 0.0, contract_period || 0, description || "", linkage || { company: "N/A" }, agreement_id,mou_attachment
  ]);
    console.log("rows : ",results?.rows[0]);
    if (results) {
      await addAgreementOfEachParcel(agreement_id, upin);
      console.log("agreement saved");
      return res.status(201).send("Investor added succesfully!");
    }
  } catch (ex) {
    console.log(ex.message);
    return res.status(401).send("Error on saving agreement, Please try again!");
  }
  console.log("[api: agreement registration ended]");
};

//TODO: SUSPEND AGREEMENT
const suspendAgreement = async (req, res) => {
  console.log("[api: suspend agreement started]");
  const agreement_id = req?.params?.id || req?.body?.agreement_id;
  if (!agreement_id) return res.status(400).send("No agreement id provided");
  const results = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.suspendAgreement, [agreement_id]);
  if (!results) res.status(500).send("Error occured while saving");
  return res.status(200).send("Agreement was successfully suspended!");
  console.log("[api: suspend agreement ended]");
};
//TODO: RESUME AGREEMENT
const resumeAgreement = async (req, res) => {
  console.log("[api: resume agreement started]");
  const agreement_id = req?.params?.id || req?.body?.agreement_id;
  if (!agreement_id) return res.status(400).send("No agreement id provided");
  const results = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.resumeAgreement, [agreement_id]);
  if (!results) res.status(500).send("Error occured while saving");
  return res.status(200).send("Agreement was successfully resumed!");
  console.log("[api: resume agreement ended]");
};
//TODO: DELETE AGREEMENT
const deleteAgreement = async (req, res) => {
  console.log("[api: delete agreement started]");
  try {
    const agreement_id = req?.params?.id || req?.body?.agreement_id;
    if (!agreement_id) return res.status(400).send("No agreement id provided");
    const results = await executeQueryAndGetResult(res, InvestorAndAgreementQueries.deleteAgreement, [agreement_id]);
    if (!results) res.status(500).send("Error occured while saving");
    return res.status(200).send("Agreement was successfully resumed!");
  } catch (err) {
    console.log(err);
  }
  console.log("[api: delete agreement ended]");
};
//TODO: GET AGREEMENT BY UPIN OR TIN_NO OR COMPANY NAME
const getAgreementByUPINorTINorName = async (req, res) => {
  console.log("[api: get agreement by upin or tin or company name started]");
  try {
    const agreement_id = req?.params?.id || req?.body?.agreement_id;
    if (!agreement_id)
      return res.status(400).send({ message: "Wrong UPIN/TIN provided, Please provide correct UPIN/TIN" });
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.getAgreementByUPINorTINorCompany, [
      agreement_id,
    ]);

    return res.status(200).send(rows || []);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Error occured while saving" });
  } finally {
    console.log("[api: get agreement by upin or tin or company name ended]");
  }
};
const getAgreementById = async (req, res) => {
  console.log("[api: get agreement by id started]");
  try {
    const agreement_id = req?.params?.id || req?.body?.agreementId;
    if (!agreement_id)
      return res.status(400).send({ message: "Wrong agreement id provided, Please provide correct agreement id!" });
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.getAgreementById, [agreement_id]);
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get agreement by id ended]");
};

//TODO: GET ALL AGREEMENT
const getAgreements = async (req, res) => {
  console.log("[api: get all agreements started]");
  try {
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.getAgreementsWithDetail);
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get all agreements ended]");
};
const getAgreementsByParkId = async (req, res) => {
  console.log("[api: get all agreements by park id started]");
  try {
    const park_id = req.params.park_id;
    console.log("park_id", park_id);
    if (!park_id) return res.status(400).send("No park id provided");
    if (!park_id) return res.status(400).send("No park id provided");
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.getAgreementsByParkId, [park_id]);
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get all agreements by park id ended]");
};

const getAgreementsWithDetail = async (req, res) => {
  console.log("[api: get all agreements started]");
  try {
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.getAgreementsWithDetail);
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get all agreements ended]");
};
/*const getInvestorInPark= async (req, res) => {
  console.log("[api: get investor in park started]");
  try {
    const rows=await executeQueryAndGetRows(res, InvestorAndAgreementQueries.getInvestorInPark);
    return res.status(200).send(rows)
  }catch(err){
    console.log(err);
  }
}*/
const updateAgreement = async (req, res) => {
  console.log("[api: update agreement started]");
  try {
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.updateAgreement, [
      req.body.tenant_id,
      req.body.upin,
      1, //rrr
      req.body.ownership_type,
      req.body.investment_type,
      req.body.contract_issue ? req.body.contract_issue : "1900-01-01",
      req.body.contract_renewal ? req.body.contract_renewal : "1900-01-01",
      req.body.moe_signed ? req.body.moe_signed : "1900-01-01",
      req.body.production_capacity ? req.body.production_capacity : 0.0,
      req.body.handover_date ? req.body.handover_date : "1900-01-01",
      req.body.rehandover_date ? req.body.rehandover_date : "1900-01-01",
      req.body.production_commencement_date ? req.body.production_commencement_date : "1900-01-01",
      req.body.market_destination ? [req.body.market_destination] : [],
      req.body.intl_brands_link ? [req.body.intl_brands_link] : [],
      req.body.disposal_method,
      req.body.export_capacity ? req.body.export_capacity : 0.0,
      req.body.employee_capacity ? req.body.employee_capacity : 0,
      req.body.monthly_rent ? req.body.monthly_rent : 0.0,
      req.body.grace_period_ending_date ? req.body.grace_period_ending_date : "1900-01-01",
      req.body.security ? req.body.security : 0.0,
      req.body.advance_payment ? req.body.advance_payment : 0.0,
      req.body.annual_mngmnt_service_fee ? req.body.annual_mngmnt_service_fee : 0.0,
      req.body.payment_mode,
      req.body.late_charge_fee ? req.body.late_charge_fee : 0.0,
      req.body.contract_period ? req.body.contract_period : 0,
      req.body.description,
      req.body.linkage ? req.body.linkage : 0,
    ]);
    return results && res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: update agreement ended]");
};
const terminateAgreement = async (req, res) => {
  console.log("[api: terminate agreement started]");
  try {
    const agreement_id = req?.body?.agreement_id || req?.params?.id;
    if (!agreement_id) return res.status(400).send("No agreement number provided");
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.terminateAgreement, [agreement_id]);
    if (!rows) return res.status(500).send("Error occured while saving");
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: terminate agreement ended]");
};
//----------------END AGREEMENT
//---------------INVESTOR ACTIVITY
const addInvestorActivity = async (req, res) => {
  console.log("[api: add new investor activity started]");
  if (!validationResult(req).isEmpty()) return res.status(400).json({ errors: validationResult(req).array() });
  console.log(req.body);
  try {
    const investorActivityData = [
      req?.body?.investor_id || req?.params?.investor_id, //1
      new Date(), //2
      req?.body?.activity_type === "employment" ? req?.body?.amount : 0, //3
      req?.body?.activity_type === "export" ? req?.body?.amount : 0, //4
      req?.body?.activity_type === "import_substitution" ? req?.body?.amount : 0, //5
      req?.body?.activity_period_start_from, //6
      req?.body?.activity_period_to, //7
      req?.body?.description, //8
      req?.body?.activity_type === "import" ? req?.body?.amount : 0, //9
      req?.body?.activity_type === "linkage" ? req?.body?.amount : 0, //10
      req?.body?.activity_type === "linkage" ? req?.body?.amount : 0, //11
    ];
    const results = await executeQueryAndGetResult(
      res,
      InvestorAndAgreementQueries.addInvestorActivity,
      investorActivityData
    );
    if (!results) return res.status(401).send("Error occured while saving");
    return res.status(201).send("Investor activity information has been saved successfully!");
  } catch (err) {
    console.log(err);
  }
  console.log("[api: add new investor activity ended]");
};
const addTerminationRequest = async (req, res) => {
  console.log("[api: add termination request started]");
  try {
    const agreement_id = req?.body?.agreement_id || req?.params?.id;
    if (!agreement_id) return res.status(400).send("No agreement id provided"); //agreement_id, request_date, reason, description, request_letter_path returnning no
    const signed_letter_path = req.file
      ? await fileUploader(req.file, "/termination_request" + (agreement_id ? "/" + agreement_id : ""))
      : null;
    const terminationRequestData = [
      req?.params?.id,
      req?.body?.request_date,
      req?.body?.reason,
      req?.body?.description,
      signed_letter_path,
    ];
    await executeQuery(
      res,
      InvestorAndAgreementQueries.addTerminationRequest,
      terminationRequestData,
      "Contract Termination request information has been saved successfully!"
    );
  } catch (error) {
    console.log(error);
  }
  console.log("[api: add termination request ended]");
};
const addPropertyTransfer = async (req, res) => {
  console.log("[api: add property transfer started]");
  if (!validationResult(req).isEmpty()) return res.status(400).json({ errors: validationResult(req).array() });
  try {
    // console.log(req.files, req.file);
    const { agreement_id, date_of_transfer, transfered_from, transfered_to, reason, description, registered_by } =
      JSON.parse(req.body.data);
    console.log(JSON.parse(req.body.data));
    const fileSaved = await uploader(req, "propertyTransfer");
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.addPropertyTransfer, [
      agreement_id,
      transfered_from,
      transfered_to,
      reason,
      description,
      date_of_transfer,
      registered_by,
      fileSaved,
    ]);
    if (!rows) res.status(400).send("Error occured while saving");
    console.log("transfer id: ", rows[0]?.id);
    return res.status(200).send({ message: "add property transfer succesfully!" });
  } catch (err) {
    console.log(err);
  }
  console.log("[api: add property transfer ended]");
};
const getPropertyTransfer = async (req, res) => {
  console.log("[api: get all property transfer]");
  try {
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.getPropertyTransfer);
    return res.status(201).send(rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get all property transfer]");
};
const getPropertyTransferById = async (req, res) => {
  console.log("[api: get property transfer by id]");
  try {
    const id = req.params.id;
    console.log("id", id);
    if (!id) return res.status(400).send("no id");
    const rows = await executeQueryAndGetRows(res, InvestorAndAgreementQueries.getPropertyTransferById, [id]);
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get property transfer by id]");
};

const getNewAgreementIdByParkId = async (req, res) => {
  console.log("[api: get new agreement id by park id]");
  try {
    const park_id = req.params.parkId || "";
    console.log("park_id", park_id);
    const result = await executeQueryAndGetResultWithoutRes(InvestorAndAgreementQueries.getNewAgreementIdByParkId, [
      park_id,
    ]);
    console.log(result);
    res.status(200).send(result.rows[0] || []);
  } catch (err) {
    console.log(err);
  }
  console.log("[api: get new agreement id by park id]");
};

export default {
  addNewInvestor,  
  addAgreementOfEachParcel,
  addTerminationRequest,
  updateInvestorInfo,
  deleteInvestorInfo,
  getInvestorsInfo,
  getInvestorsByParkAndSector,
  getInvestorInfoById,
  //getInvestorInPark,
  addInvestorActivity,
  addAgreement,
  updateAgreement,
  deleteAgreement,
  getAgreements,
  getAgreementsWithDetail,
  getAgreementById,
  getAgreementByUPINorTINorName,
  getAgreementsByParkId,
  suspendAgreement,
  resumeAgreement,
  terminateAgreement,
  addProspectiveInvestor,
  updateProspectiveInvestorInfo,
  deleteProspectiveInvestorInfo,
  getProspectiveInvestorsInfo,
  getProspectiveInvestorInfoByTinNo,
  addPropertyTransfer,
  getPropertyTransfer,
  getPropertyTransferById,
  getNewAgreementIdByParkId,
};
