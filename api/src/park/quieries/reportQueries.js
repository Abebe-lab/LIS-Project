//Finance Report Queries
const getArrears = `SELECT * FROM public.view_fin_arrears`;
const getInvestorPaymentHistory = `SELECT * FROM public.view_fin_investor_payment_history`;
const getLatePaymentsSummary = `SELECT * FROM public.view_fin_late_payments_summary`;
const getUncollectedPayments = `SELECT * FROM public.view_fin_uncollected_payments`;
const getUpcomingDues = `SELECT * FROM public.view_fin_upcoming_dues`;
const getFinanceSummary = `SELECT * FROM public.view_finance_summary`;
//Operation Report Queries
const getInvestorActiveContracts = `SELECT * FROM view_oper_active_contracts`;
const getProspectiveInvestors = `SELECT p_investor_id as id, company_name, contact_person, phone_no, email, nationality_origin as country,form_of_business as business, description, status, documents_attached FROM eic_potential_investor`;
const getInvestorByIndustry = `SELECT * FROM view_oper_activity_by_industry`;
const getInvestorDailyActivityLog = `SELECT * FROM view_oper_daily_activity_log`;
const getInvestorActivityQauarterlySummary = `SELECT * FROM view_oper_investor_activity_quarterly_summary`;
const getInvestorActivitySummary = `SELECT * FROM view_oper_investor_activity_summary`;
const getParkQuarterlySummary = `SELECT * FROM view_oper_quarterly_summary_by_park`;
const getOperationSupervisorSummary = `SELECT * FROM view_oper_supervisor_summary`;
//EIC Report queries
const getEICRequestWithDetail = `SELECT * FROM view_eic_request_with_detail`;
const getEICRequestProgress = `SELECT * FROM view_eic_request_progress`;
const getEICAdminReport = `SELECT * FROM view_eic_admin_report;`;
const getEICProposalSummary = `SELECT * FROM view_eic_proposal_summary;`;
const getEICRequestByTime = `SELECT * FROM fn_eic_request_status_by_time(DATE(NOW() - INTERVAL '1 year'),DATE( NOW()));`;
const getAvailableSpaces = `SELECT * FROM view_eic_available_spaces`;
//GIS Report Queries
const getGISActiveContractsByPark = `SELECT * FROM view_gis_active_contracts_by_park`;
const getGISParkOccupancyByBuildingArea = `SELECT * FROM view_gis_building_area_per_park`;
const getGISParcelsByOccupancy = `SELECT * FROM view_gis_group_parcels_by_occupancy`;
const getGISParkOccupancyByParcel = `SELECT * FROM view_gis_parcel_ratio_per_park`;
const getGISParkOccupancyPerIndustry = `SELECT * FROM view_gis_park_by_industry`;
const getGISParkOccupancyPerActiveParcel = `SELECT * FROM view_gis_park_by_occupancy_ratio`;
const getGISShedVSParcelDevelopment = `SELECT * FROM view_gis_shed_vs_parcel_development`;
const getGISZoneRatioPerPark = `SELECT * FROM view_gis_zone_ratio_per_park`;
const getGISParkOccupancySummary = `SELECT * FROM view_gis_park_occupancy_summary`;
const getGISRoadRatioPerPark = `SELECT * FROM view_gis_road_ratio_per_park`;
const getGISParkOccupancyByGreenArea = `SELECT * FROM view_gis_green_area_ratio_per_park`;
const getWasteTreatmentPlants = `SELECT * FROM view_gis_waste_treatment`;
//System Admin Queries
const getSADepartmentSummary = `SELECT * FROM view_sa_department_summary`;
const getSADepartmentUserCount = `SELECT * FROM view_sa_department_user_count`;
const getSAInactiveUsersLog = `SELECT * FROM view_sa_inactive_users_log`;
const getSAUserActivityByRole = `SELECT * FROM view_sa_user_activity_by_role`;
//Executive Queries
//const get
//common queries
const getInvestors = `SELECT * FROM investor`;
const getInvestorsByParkAndSector = `SELECT * FROM public.view_report_investor_by_park_and_sector;`;

export default {
  getArrears,
  getInvestorPaymentHistory,
  getLatePaymentsSummary,
  getUncollectedPayments,
  getUpcomingDues,
  getFinanceSummary,
  getInvestorActiveContracts,
  getProspectiveInvestors,
  getInvestorActivityQauarterlySummary,
  getInvestorByIndustry,
  getInvestorDailyActivityLog,
  getInvestorPaymentHistory,
  getInvestorActivitySummary,
  getParkQuarterlySummary,
  getOperationSupervisorSummary,
  getEICAdminReport,
  getEICProposalSummary,
  getEICRequestProgress,
  getEICRequestWithDetail,
  getEICRequestByTime,
  getAvailableSpaces,
  getGISActiveContractsByPark,
  getGISParcelsByOccupancy,
  getGISParkOccupancyByBuildingArea,
  getGISParkOccupancyByParcel,
  getGISParkOccupancyPerActiveParcel,
  getGISParkOccupancyPerIndustry,
  getGISParkOccupancySummary,
  getGISParkOccupancyByGreenArea,
  getGISShedVSParcelDevelopment,
  getGISZoneRatioPerPark,
  getGISRoadRatioPerPark,
  getSADepartmentSummary,
  getSADepartmentUserCount,
  getSAInactiveUsersLog,
  getSAUserActivityByRole,
  getInvestors,
  getInvestorsByParkAndSector,
  getWasteTreatmentPlants,
};
