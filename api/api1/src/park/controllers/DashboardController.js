import { executeQuery, executeQueryAndGetResult } from "../utils/dbHandler.js";
import DashboardQueries from "../quieries/DashboardQueries.js";

const getParksSummary = async (req, res) => {
  console.log("api: park summary started!");
  await executeQuery(res, DashboardQueries.getParksSummary);
};
const getParksBySector = async (req, res) => {
  console.log("api: park by sector started!");
  await executeQuery(res, DashboardQueries.getParksBySector);
};
const getParksBySectorDetail = async (req, res) => {
  console.log("api: park by sector detail started!");
  await executeQuery(res, DashboardQueries.getParksBySectorDetail);
};
const getParkOccupancy = async (req, res, buffer) => {
  console.log("api: park occupancy started!");
  await executeQuery(res, DashboardQueries.getParkOccupancy);
};

const getFinanceSummary = async (req, res) => {
  console.log("api: finance summary started!");
  await executeQuery(res, DashboardQueries.getFinanceSummary);
};
const getReferedVsResponse = async (req, res) => {
  console.log("api: refered vs response started!");
  return await executeQuery(res, DashboardQueries.getReferedVsResponse);
};
const getInvestorSummary = async (req, res) => {
  console.log("api: investor summary started!");
  return await executeQuery(res, DashboardQueries.getInvestorSummary);
};
const getActivitiesSummary = async (req, res) => {
  console.log("api: activities summary started!");
  return await executeQuery(res, DashboardQueries.getActivitiesSummary);
};
const getDashboardByDepartment = async (req, res) => {
  console.log("api: dashboard by department started!");
  try {
    const { department, dashboardContent } = req.params;
    console.log("Department:" + department, "    AND   ", "Dashboard Type:" + dashboardContent);
    let query = "";

    switch (department) {
      case "executives":
        if (dashboardContent === "parkBySector") query = DashboardQueries.getParksBySector;
        else if (dashboardContent === "parkByOccupancy") query = DashboardQueries.getParkOccupancy;
        else if (dashboardContent === "parkBySectorDetail") query = DashboardQueries.getParksBySectorDetail;
        else if (dashboardContent === "referedStatus") query = DashboardQueries.getReferedVsResponse;
        else if (dashboardContent === "investorSummary") query = DashboardQueries.getInvestorSummary;
        else if (dashboardContent === "activitiesSummary") query = DashboardQueries.getActivitiesSummary;
        else if (dashboardContent === "parkSummary") query = DashboardQueries.getParksSummary;
        else if (dashboardContent === "financeSummary") query = DashboardQueries.getFinanceSummary;
        break;
      case "finance":
        if (dashboardContent === "financeSummary") query = DashboardQueries.getFinanceSummary;
        break;
      case "designManagement":
        if (dashboardContent === "bprequestVsResponse") {
          query = DashboardQueries.getBPRequestVsResponse;
        } else if (dashboardContent === "oprequestVsResponse") {
          query = DashboardQueries.getOPRequestVsResponse;
        }
        break;
      case "sysAdmin":
        if (dashboardContent === "userStastics") {
          query = DashboardQueries.getUserStastics;
        } else if (dashboardContent === "systemHealth") {
          query = DashboardQueries.getSystemHealth;
        }
        break;
        case "mp":
          if (dashboardContent === "importedAndEdited") {
            query = DashboardQueries.getImportedVsEdited;
          } else if (dashboardContent === "landUseProportion") {
            query = DashboardQueries.getLanduseProportion;
          }else if(dashboardContent==="parcelVsShedRatio"){
            query=DashboardQueries.getParcelToShedRatio;
          }
          break;
      default:
        return res.status(400).json({ message: "Invalid department or dashboard type" });
    }
    // console.log(query);
    if (query !== "") {
      const result = await executeQueryAndGetResult(res, query);
      res.status(200).json(result.rows);
    }
    return null;
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  //console.log("api: reports by department finished!");
};
export default {
  getParkOccupancy,
  getParksSummary,
  getParksBySector,
  getParksBySectorDetail,
  getFinanceSummary,
  getReferedVsResponse,
  getInvestorSummary,
  getActivitiesSummary,
  getDashboardByDepartment,
};
