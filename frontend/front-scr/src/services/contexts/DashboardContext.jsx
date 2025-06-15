import { createContext } from "react";

const  DashboardContext = createContext({
    referredResponses: [],
    parkIndustryData: [],
    parkOccupancyData: [],
    financialSummary: [],
    investorSummary: [],
    fetchDashboardData: () => {}, // function to trigger data fetching
  });
  export default DashboardContext;