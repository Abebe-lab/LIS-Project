import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SquareChartContainer,
} from "../../../../components/Charts";
import { CurrencyExchange } from "@mui/icons-material";
import { CircularProgress,  Typography } from "@mui/material";

import DisplayTableInGrid from "../../../../utils/DisplayTableInGrid";

import {GetDataFromApiWithParams} from "../../../../services/api/ExecuteApiRequests";

const FinanceSummaryCard = () => {
  const [financialSummary, setFinancialSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFinanceSummary = async () => {
      try {
        const response = await GetDataFromApiWithParams("dashboard/executives/financeSummary")
        console.log(response);
        setFinancialSummary(response || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching finance summary:", error);
      }
    };

    fetchFinanceSummary();
  }, []);

  return (
    <Link to="/financeSummary">
      {!isLoading ? (
        financialSummary && financialSummary.length ? (
          <SquareChartContainer
            THECHART={<><DisplayTableInGrid data={financialSummary} /></>}
            title="Land & Shed Revenue"
            link="/financeSummary"
            showMoreButton={false}
            avatar={<CurrencyExchange/>}
          />
        ) : (
          <SquareChartContainer
            THECHART={<Typography>No data to fetch</Typography>}
            title="Land & Shed Revenue"
            link="/financeSummary"
            showMoreButton={false}
            avatar={<CurrencyExchange/>}
          />
        )
      ) : (
        <CircularProgress />
      )}
    </Link>
  );
};

export default FinanceSummaryCard;
