const getParkOccupancy = `SELECT * FROM dashboard_occupancy_summary;`;
const getParksSummary = `SELECT * FROM view_oper_investor_activity_quarterly_summary;`;
const getParksBySector = `SELECT * FROM dashboard_occupancy_summary;`; //make it count instead of area
const getParksBySectorDetail = `SELECT * FROM dashboard_occupancy_summary_per_park_detail;`;
const getFinanceSummary = `SELECT * FROM view_finance_summary;`;
const getReferedVsResponse = `SELECT * FROM dashboard_monthly_request_response_counts;`;
const getInvestorSummary = `SELECT * FROM view_oper_investor_activity_summary;`;
const getActivitiesSummary = `SELECT * FROM dashboard_current_year_oper_summary;`;
const getBPRequestVsResponse = `SELECT * FROM dashboard_bp_request_vs_response;`;
const getOPRequestVsResponse = `SELECT * FROM dashboard_op_request_vs_response;`;

const getUserStastics = `SELECT
to_char(day_of_week, 'FMDay') AS day,
    active_users,
    new_users_count, 
    avg_session_duration as average_duration
    FROM public.dashboard_sa_user_activity;`;
const getSystemHealth = `SELECT to_char(interval_start, 'HH:MI') AS time_slot,
       active_sessions as active,
       active_seconds,
       other_sessions,
       other_seconds,
       idle_sessions as idle,
       idle_seconds
FROM public.dashboard_sa_activity_per_hour;`;
const getImportedVsEdited = `SELECT * FROM dashboard_mp_imported_vs_approved`;
const getLanduseProportion = `SELECT * FROM dashboard_park_occupancy_summary`;
const getParcelToShedRatio = `SELECT * FROM dashboard_mp_parcel_to_shed_ratio`;
export default {
  getParkOccupancy,
  getParksSummary,
  getParksBySector,
  getParksBySectorDetail,
  getFinanceSummary,
  getReferedVsResponse,
  getInvestorSummary,
  getActivitiesSummary,
  getBPRequestVsResponse,
  getOPRequestVsResponse,
  getUserStastics,
  getSystemHealth,
  getImportedVsEdited,
  getLanduseProportion,
  getParcelToShedRatio,
};
