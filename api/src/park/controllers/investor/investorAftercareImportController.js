import { executeQueryAndGetRows } from "../../utils/dbHandler.js";
import InvestorAftercareQueries from "../../quieries/InvestorAftercareQueries.js";
import XLSX from "xlsx";
import pool from "../../../../db.js";
import dateHelpers from "../../utils/dateHelpers.js";
import FinanceController from "../financeController.js";
import { CleanAndConvertArea, convertTextToNumber } from "../../utils/ConversionHelper.js";
import { uploadExcelFile } from "../../utils/uploader.js";
import InvestorAndAgreementController from "./InvestorAndAgreementController.js";
import InvestorAndAgreementQueries from "../../quieries/InvestorAndAgreementQueries.js";
//import tryCatchWrapper from "../../utils/ErrorHandler.js";

//import { body } from "express-validator";
const getSanitizedAgreementRow = async (res, row) => {
  try {
    if (!row || !row.park_name) return null;

    //console.log("park name: ", row.park_name);
    //const park_id = await getParkId(res, row.park_name);
    //console.log("Park id: ", park_id);
    //if (park_id === "") {
    //console.log("Park anme error!");
    //}
    const upin = await getUpinFromShedNoAndParkName(res, row.park_name, row.shed_parcel_no);
    if (upin === "") {
      // return null;
      console.log("no upin found for ", row?.shed_parcel_no, " in park ", row?.park_name);
    }
    const tenant_id = await getTenantIdFromName(res, row?.company_name);
    if (tenant_id === "") {
      //return null;
      console.log("no tenant found for ", company_name);
    }
    console.log(row.park_name, upin || "upin testing", tenant_id);

    const sanitizedRow = [
      tenant_id || "",
      upin || "",
      row.agreement_id || "",
      row.land_tenure || "",
      row.investment_type?.trim(),
      dateHelpers.convertToDate(row.date_of_contract_signing),
      dateHelpers.convertToDate(row.contract_renewal_date),
      dateHelpers.convertToDate(row.moe_signing_date),
      row.production_capacity || 0,
      dateHelpers.convertToDate(row.handover_date),
      dateHelpers.convertToDate(row.re_handover_date),
      dateHelpers.convertToDate(row.production_commencement_date),
      row.market_destination ? row.market_destination?.split(",").map((item) => item?.trim()) : [],
      row.intl_brands_link ? row.intl_brands_link?.split(",").map((item) => item?.trim()) : [],
      row.waste_disposal_method || "",
      row.export_capacity || 0,
      row.employee_capacity || 0,
      row.monthly_rent_lease || 0,
      dateHelpers.convertToDate(row.grace_period_ending_date),
      row.security_deposit || 0,
      row.advance_payment || 0,
      row.annual_management_service_fee || 1.5,
      row.agreement_currency || row.payment_mode?.trim() || "",
      Number(row.contract_period_in_months) || 0, // Ensure numeric
      row.description?.trim() || "",
      row.status?.trim() || "",
      row.late_charge_fee || 0,
      dateHelpers.convertToDate(row.next_payment_expected),
      dateHelpers.convertToDate(row.last_payment),
      row.shed_parcel_area_in_m2 ? CleanAndConvertArea(row.shed_parcel_area_in_m2) : 0,
      row.shed_parcel_no || "",
    ];
    return sanitizedRow;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const saveEachPaymentSchedule = async (res, row) => {
  try {
    const paymentSchedule = row.payment_rate_json;
    const agreement_id = row.agreement_id;
    if (paymentSchedule) {
      const parsedData = JSON.parse(paymentSchedule);
      parsedData &&
        parsedData.length > 0 &&
        parsedData.map(async (item, index) => {
          console.log("each schedule :", index);
          console.log(item);
          const res = await executeQueryAndGetRows(res, InvestorAftercareQueries.importAgreementPaymentSchedule, [
            agreement_id,
            item["start_date"] || item["start_year"] || 0,
            item["end_date"] || item["end_year"] || 0,
            item["usd_value"] || item["value"] || 0,
          ]);
        });
    }
  } catch (error) {
    console.log(error);
  }
};
const saveInitialActivities = async (res, row) => {
  try {
    const initialActivities = [
      row.agreement_id,
      convertTextToNumber(row.no_of_Employee),
      0,
      0,
      new Date("7/1/2023"),
      new Date("6/30/2024"),
      0.0,
      convertTextToNumber(row.Linkage_in_count_2016_e_c),
      convertTextToNumber(row.Linkage_in_currency_2016_e_c),
    ];
    const activityNo = await executeQueryAndGetRows(
      res,
      InvestorAftercareQueries.saveInitialActivities,
      initialActivities
    );
    return activityNo;
  } catch (error) {
    console.log(error);
  }
};
const isAgreementImported = async (req, agreement_id) => {
  try {
    const agrementExists = await executeQueryAndGetRows(req, InvestorAftercareQueries.isAgreementImported, [
      agreement_id,
    ]);
    return agrementExists[0].count > 0;
  } catch (error) {
    console.log(error);
  }
};
const saveAgreementToDatabase = async (req, res, buffer) => {
  console.log("api: saveAgreementToDatabase");
  const workbook = XLSX.readFile(buffer);
  const worksheet = workbook.Sheets["agreements"];
  const allExcelRow = XLSX.utils.sheet_to_json(worksheet);
  try {
    if (allExcelRow) {
      allExcelRow.map(async (row, index) => {
        if (!row) return;
        console.log("Record: ", index);
        const sanitizedRow = await getSanitizedAgreementRow(res, row);
console.log("Sanitized Row: ", sanitizedRow);
        if (sanitizedRow) {
          const agreementId = await executeQueryAndGetRows(res, InvestorAftercareQueries.importAgreement, sanitizedRow);
          console.log("agreement id: ", agreementId);
          //IMPORTING
          if (agreementId) {
            if (row.payment_rate_json?.length > 0) {
              console.log("JSON:", row.payment_rate_json);
              const eachPt = await saveEachPaymentSchedule(res, row);
            }
            const activitNo = await saveInitialActivities(res, row);
            console.log("activit no =", activitNo);
          }
          console.log("Saving each parcel to agreement");
          console.log("agreement id:", agreementId[0].id, "   upin:", sanitizedRow[1]);
          //prettier-ignore
          const resultOfEachAgreementToParcel = await executeQueryAndGetRows(
                res, InvestorAndAgreementQueries.addAgreementOfEachParcel, [agreementId[0].id, sanitizedRow[1]] );
          console.group("parcel - agreement :", resultOfEachAgreementToParcel);
        } else {
          console.log("could not record no: ", index);
        }
      });
    }
    console.log("import done");
  } catch (error) {
    console.log(error);
  }
};
const saveTenantToDatabase = async (req, res, buffer) => {
  try {
    const workbook = XLSX.readFile(buffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const allExcelRow = XLSX.utils.sheet_to_json(worksheet);
    allExcelRow.map(async (row, index) => {
      const {
        id,
        tin_no,
        name,
        contact_person,
        phone_no,
        mobile_no,
        email,
        website,
        nationality_origin,
        description,
        position,
        investment_capital,
      } = row;
      console.log(row);
      if (!name) return; //if no company name but other info stop
      console.log("Company name: ", name);
      const result = await pool.query(InvestorAftercareQueries.importTenant, [
        id,
        tin_no,
        name,
        contact_person,
        phone_no?.toString().substring(0, 20), // Trim to 20 characters
        mobile_no?.toString().substring(0, 20), // Trim to 20 characters
        email,
        website,
        nationality_origin,
        description,
        position,
        convertTextToNumber(investment_capital),
      ]);
      if (result) console.log("Registered: ", index);
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("reading and saving excel completed");
  }
  return true;
};

const ImportExistingTenantAgreementOrCollection = async (req, res) => {
  console.log("api-start: ImportExistingTenant!");
  if (!req.body) return res.statu(400).send("No data provided!");
  if (!(await validateSheet(req, res))) return res.statu(400).send("Invalid Sheet!");
  const { importType } = req.body;
  console.log("impor type: ", importType);
  try {
    uploadExcelFile(req, res, "existing_tenant").then((uploadResponse) => {
      if (uploadResponse) {
        //console.log("upload response:",importType);
        if (importType === "companies") {
          console.log("companies started...");
          saveTenantToDatabase(req, res, uploadResponse).then((resut) =>
            res.status(201).send("Importing existing tenant added succesfully!")
          );
        } else if (importType === "agreements") {
          saveAgreementToDatabase(req, res, uploadResponse).then((resut) =>
            res.status(201).send("Importing existing agreement added succesfully!")
          );
        } else if (importType === "collection") {
          FinanceController.saveCollectionToDatabase(req, res, uploadResponse).then((resut) =>
            res.status(201).send("Importing existing collection added succesfully!")
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error on Importing spreadsheet!");
  } finally {
    console.log("api-end: ImportExistingTenant!");
  }
};

export default {
  ImportExistingTenantAgreementOrCollection,
};
//****************UTILITIES */
const validateSheet = async (req, res) => {
  return true;
};
/*const getParkId = async (res, parkName) => {
  const rows = await executeQueryAndGetRows(res, InvestorAftercareQueries.getParkIdFromName, [parkName]);
  return rows && (rows[0].id || "");
};
const getParksId = async (res, parkName) => {
  const rows = await executeQueryAndGetRows(res, InvestorAftercareQueries.getParkIdFromName, [parkName]);
  return rows && rows;
};*/
const getTenantIdFromName = async (res, company_name) => {
  const rows = await executeQueryAndGetRows(res, InvestorAftercareQueries.getTenantIdFromName, [company_name]);
  return rows && (rows[0]?.id || "");
};
const getUpinFromShedNoAndParkName = async (res, parkName, localParcelNo) => {
  const rows = await executeQueryAndGetRows(res, InvestorAftercareQueries.getUpinFromShedNoAndParkName, [
    parkName,
    localParcelNo,
  ]);
  return rows && (rows[0]?.upin || "");
};
////const sanitizedRows = await Promise.all();
/*    allExcelRow.map(async (row, index) => {
      const cleanParameters = await getSanitizedAgreementRow(row);
      const {
        park_name,
        land_tenure,
        company_name,
        agreement_id,
        shed_parcel_no,
        shed_parcel_area_in_m2,
        investment_type,
        date_of_contract_signing,
        contract_renewal_date,
        moe_signing_date,
        handover_date,
        re_handover_date,
        grace_period_ending_date,
        production_commencement_date,
        first_export_date,
        market_destination,
        intl_brands_link,
        waste_disposal_method,
        production_capacity,
        export_capacity,
        employee_capacity,
        monthly_rent_lease,
        security_deposit,
        advance_payment,
        annual_management_service_fee,
        payment_mode,
        contract_period_in_months,
        description,
        late_charge_fee,
        next_payment_expected,
        last_payment,
        status,
      } = row;
      const shed_parcel_area_cleaned = shed_parcel_area_in_m2 ? CleanAndConvertArea(shed_parcel_area_in_m2) : 0;
      const market_destination_array = market_destination
        ? market_destination.split(",").map((item) => item?.trim())
        : [];
      const intl_brands_link_array = intl_brands_link ? intl_brands_link?.split(",")?.map((item) => item?.trim()) : [];
      //console.log("----------row data stated----------");
      //console.log(row);
      const park_id = await getParkId(res, park_name); //(await executeQueryAndGetRows(res, InvestorAftercareQueries.getParkIdFromName, [park_name])[0].id) || "";
      if (park_id === "") {
        res.status(201).send("Please correct park name first!");
      }
      //console.log("Park id: ",park_id,park_name)
      const upin = await getUpinFromShedNo(res, park_id, shed_parcel_no);
      if (upin === "") {
        console.log("no upin found for ", shed_parcel_no, " in park ", park_name);
      }
      console.log("upin id: ", park_id, park_name);
      const tenant_id = company_name && (await getTenantIdFromName(res, company_name));
      if (tenant_id === "") {
        console.log("no tenant found for ", company_name);
      }
      console.log(park_id, upin, tenant_id);
      const result = await pool.query(InvestorAftercareQueries.importAgreement, [
        tenant_id,
        upin,
        agreement_id,
        land_tenure,
        investment_type,
        dateHelpers.convertToDate(date_of_contract_signing),
        dateHelpers.convertToDate(contract_renewal_date),
        dateHelpers.convertToDate(moe_signing_date),
        production_capacity,
        dateHelpers.convertToDate(handover_date),
        dateHelpers.convertToDate(re_handover_date),
        dateHelpers.convertToDate(production_commencement_date),
        market_destination_array,
        intl_brands_link_array,
        waste_disposal_method,
        export_capacity,
        employee_capacity,
        monthly_rent_lease,
        dateHelpers.convertToDate(grace_period_ending_date),
        security_deposit,
        advance_payment,
        annual_management_service_fee,
        payment_mode,
        contract_period_in_months,
        description,
        status,
        late_charge_fee,
        dateHelpers.convertToDate(next_payment_expected),
        dateHelpers.convertToDate(last_payment),
        shed_parcel_area_cleaned,
        shed_parcel_no,
      ]);
      //result && console.log(`Agreement saved ${1}`);
    });*/

//others to be used
//////////initial activity
///payment rate
/*     
      dateHelpers.convertToDate(row.first_export_date),    

     ,*/

/*       
const extractedData = paymentSchedule.map(item => {
  return {
    start_date: item.start_date,
    end_date: item.end_date,
    usd_value: item.usd_value
  };
});
const ps=paymentSchedule[0];

        const each = await executeQueryAndGetRows(res, InvestorAftercareQueries.importAgreementPaymentSchedule, [
          agreement_id,
          ps["start_date"] || ps["start_year"] || 0,
          ps["end_date"] || ps["end_year"] || 0,
          ps["usd_value"] || ps["value"] || 0,
        ]);
        console.log("Each payment schedule result :", each);
      }*/
