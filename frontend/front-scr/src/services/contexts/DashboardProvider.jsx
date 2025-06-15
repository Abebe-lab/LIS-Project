// Dashboard Provider
import React, { useState, useEffect } from "react";
import DashboardContext from "./DashboardContext";
import ExecuteApiRequest from "../api/ExecuteApiRequest";
import { GetDataFromApiWithParams } from "../api/ExecuteApiRequests";

export const DashboardProvider = ({ children }) => {
  const [referredResponses, setReferredResponses] = useState([]);
  const [parkIndustryData, setParkIndustryData] = useState([]);
  const [parkOccupancyData, setParkOccupancyData] = useState([]);
  const [financialSummary, setFinancialSummary] = useState([]);
  const [investorSummary, setInvestorSummary] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const [referredRes, parkIndustry, parkOccupancy, financeSummary, invSummary] = await Promise.all([
        GetDataFromApiWithParams("dashboard/referedStatus"),
        GetDataFromApiWithParams("dashboard/parkBySector"),
        GetDataFromApiWithParams("dashboard/financeSummary"),
        GetDataFromApiWithParams("dashboard/investorSummary"),
      ]);
      setReferredResponses(referredRes);
      setParkIndustryData(parkIndustry);
      setParkOccupancyData(parkOccupancy);
      setFinancialSummary(financeSummary);
      setInvestorSummary(invSummary);
    } catch (error) {
      console.error("Failed to fetch dashboard data: ", error);
      console.log("Error response:", error.response);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        referredResponses,
        parkIndustryData,
        parkOccupancyData,
        financialSummary,
        investorSummary,
        fetchDashboardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
