import reportQueries from "../quieries/reportQueries.js";
import { executeQueryAndGetRows } from "../utils/dbHandler.js";

const getReportsByDepartment = async (req, res) => {
  console.log("api: reports by department started!");
  try {
    const { department, reportType } = req.params;
    console.log("Department:" + department, "    AND   ", "Report Type:" + reportType);
    let query = "";

    switch (department) {
      case "finance":
        if (reportType === "activeContracts") query = reportQueries.getInvestorActiveContracts;
        else if (reportType === "investorsByParkAndSector") query = reportQueries.getInvestorsByParkAndSector;
        else if (reportType === "investors") query = reportQueries.getInvestors;
        else if (reportType === "paymentHistory") query = reportQueries.getInvestorPaymentHistory;
        else if (reportType === "arrears") query = reportQueries.getArrears;
        else if (reportType === "overdue") query = reportQueries.getLatePaymentsSummary;
        else if (reportType === "uncollected") query = reportQueries.getUncollectedPayments;
        else if (reportType === "dues") query = reportQueries.getUpcomingDues;
        else if (reportType === "summary") query = reportQueries.getFinanceSummary;
        break;
      case "eic":
      case "promo":
        if (reportType === "activeContracts") query = reportQueries.getInvestorActiveContracts;
        else if (reportType === "availableSpaces") query = reportQueries.getAvailableSpaces;
        else if (reportType === "prospectiveInvestors") query = reportQueries.getProspectiveInvestors;
        else if (reportType === "investorsByParkAndSector") query = reportQueries.getInvestorsByParkAndSector;
        else if (reportType === "investors") query = reportQueries.getInvestors;
        else if (reportType === "adminReport") query = reportQueries.getEICAdminReport;
        else if (reportType === "referenceByTime") query = reportQueries.getEICRequestByTime;
        else if (reportType === "requestProgress") query = reportQueries.getEICRequestProgress;
        else if (reportType === "referredDetail") query = reportQueries.getEICRequestWithDetail;
        break;
      case "operation": //investor_aftercare
        if (reportType === "activeContracts") query = reportQueries.getInvestorActiveContracts;
        else if (reportType === "investorsByParkAndSector") query = reportQueries.getInvestorsByParkAndSector;
        else if (reportType === "investors") query = reportQueries.getInvestors;
        else if (reportType === "invActQuarterly") query = reportQueries.getInvestorActivityQauarterlySummary;
        else if (reportType === "invByIndustry") query = reportQueries.getInvestorByIndustry;
        else if (reportType === "invDaily") query = reportQueries.getInvestorDailyActivityLog;
        else if (reportType === "invSummary") query = reportQueries.getInvestorActivitySummary;
        else if (reportType === "ParkQuarterly") query = reportQueries.getParkQuarterlySummary;
        else if (reportType === "summary") query = reportQueries.getOperationSupervisorSummary;
        else if (reportType === "paymentHistory") query = reportQueries.getInvestorPaymentHistory;
        else if (reportType === "arrears") query = reportQueries.getArrears;
        else if (reportType === "overdue") query = reportQueries.getLatePaymentsSummary;
        else if (reportType === "uncollected") query = reportQueries.getUncollectedPayments;
        else if (reportType === "dues") query = reportQueries.getUpcomingDues;
        else if (reportType === "financialSummary") query = reportQueries.getFinanceSummary;
        break;
      case "gis":
        if (reportType === "ratioSummary") query = reportQueries.getGISParkOccupancySummary;
        else if (reportType === "buiding") query = reportQueries.getGISParkOccupancyByBuildingArea;
        else if (reportType === "parcel") query = reportQueries.getGISParkOccupancyByParcel;
        else if (reportType === "occupancy") query = reportQueries.getGISParcelsByOccupancy;
        else if (reportType === "activeParcel") query = reportQueries.getGISParkOccupancyPerActiveParcel;
        else if (reportType === "zoneRatio") query = reportQueries.getGISZoneRatioPerPark;
        else if (reportType === "industryRation") query = reportQueries.getGISParkOccupancyPerIndustry;
        else if (reportType === "shedVSParcelDevelopment") query = reportQueries.getGISShedVSParcelDevelopment;
        else if (reportType === "roadRatioPerPark") query = reportQueries.getGISRoadRatioPerPark;
        else if (reportType === "greenArea") query = reportQueries.getGISParkOccupancyByGreenArea;
        else if (reportType === "wasteTreatment") query = reportQueries.getWasteTreatmentPlants;
        break;
      case "sa":
        if (reportType === "departmentSumary") query = reportQueries.getSADepartmentSummary;
        else if (reportType === "departmentUserCount") query = reportQueries.getSADepartmentUserCount;
        else if (reportType === "inactiveUsersLog") query = reportQueries.getSAInactiveUsersLog;
        else if (reportType === "activityByRole") query = reportQueries.getSAUserActivityByRole;
        break;
      case "executives":
        if (reportType === "parkActivities") query = reportQueries.getSADepartmentSummary;
        else if (reportType === "investorsByParkAndSector") query = reportQueries.getInvestorsByParkAndSector;
        else if (reportType === "invActQuarterly") query = reportQueries.getInvestorActivityQauarterlySummary;
        else if (reportType === "investors") query = reportQueries.getInvestors;
        else if (reportType === "mapByOccupancy") query = reportQueries.getSADepartmentUserCount;
        else if (reportType === "parcelsWithOwners") query = reportQueries.getSAInactiveUsersLog;
        else if (reportType === "weeklyReport") query = reportQueries.getSAUserActivityByRole;
        else if (reportType === "organizationReport") query = reportQueries.getSAUserActivityByRole;
        else if(reportType==="financeReport") query=reportQueries.getFinanceSummary;
        break;
      case "shared":
        if (reportType === "investorsByParkAndSector") query = reportQueries.getInvestorsByParkAndSector;
        break;
      default:
        return res.status(400).json({ message: "Invalid department or report type" });
    }
    // console.log(query);
    const result = await executeQueryAndGetRows(res, query); //pool.query(query);
    //console.log(result.rows);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  } finally {
    console.log("api: reports by department finished!");
  }
};

export default {
  getReportsByDepartment,
};
