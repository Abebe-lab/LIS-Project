import { useContext, useEffect, useMemo } from "react";
import DashboardContext from "../contexts/DashboardContext";

export const useDashboardData = () => {
  const {
    referredResponses,
    parkIndustryData,
    parkOccupancyData,
    financialSummary,
    investorSummary,
  } = useContext(DashboardContext);

  const dashboardData = 
    {
      referredResponses,
      parkIndustryData,
      parkOccupancyData,
      financialSummary,
      investorSummary,
    };
  //}, [referredResponses, parkIndustryData, parkOccupancyData, financialSummary, investorSummary]);

  return dashboardData;
};