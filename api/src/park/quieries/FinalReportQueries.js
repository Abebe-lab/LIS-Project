import ReportQueries from "./reportQueries.js";
export const FinanceReportQueries = {
  getArrears: ReportQueries.getArrears,
  getInvestorPaymentHistory: ReportQueries.getInvestorPaymentHistory,
  getLatePaymentsSummary: ReportQueries.getLatePaymentsSummary,
  getUncollectedPayments: ReportQueries.getUncollectedPayments,
  getUpcomingDues: ReportQueries.getUpcomingDues,
  getFinanceSummary: ReportQueries.getFinanceSummary,
  };
  
  export const OperationReportQueries = {
    getInvestorActiveContracts,
    getInvestorByIndustry,
    getInvestorDailyActivityLog,
    getInvestorActivityQauarterlySummary,
    getInvestorActivitySummary,
    getParkQuarterlySummary,
    getOperationSupervisorSummary,
  };
  
  export const EICReportQueries = {
    getEICRequestWithDetail,
    getEICRequestProgress,
    getEICReferenceByTime,
    getEICAdminReport,
    getEICProposalSummary,
  };
  
  export const GISReportQueries = {
    getGISActiveContractsByPark,
    getGISParkOccupancyByBuildingArea,
    getGISParcelsByOccupancy,
    getGISParkOccupancyByParcel,
    getGISParkOccupancyPerIndustry,
    getGISParkOccupancyPerActiveParcel,
    getGISParkOccupancySummary,
    getGISShedVSParcelDevelopment,
    getGISZoneRatioPerPark,
    getGISRoadRatioPerPark,
    getGISParkOccupancyByGreenArea,
  };
  
  export const SystemAdminQueries = {
    getSADepartmentSummary,
    getSADepartmentUserCount,
    getSAInactiveUsersLog,
    getSAUserActivityByRole,
  };
  
  export const CommonQueries = {
    getInvestors,
  };
  
  export default {
    ...FinanceReportQueries,
    ...OperationReportQueries,
    ...EICReportQueries,
    ...GISReportQueries,
    ...SystemAdminQueries,
    ...CommonQueries,
  };
  