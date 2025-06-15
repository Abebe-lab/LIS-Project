import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SquareChartContainer,
  IPDCPieChart,
} from "../../../../components/Charts";
import { CurrencyExchange } from "@mui/icons-material";
import { CircularProgress, Typography } from "@mui/material";

import {ExecuteApiRequest, GetDataFromApiWithParams} from "../../../../services/api/ExecuteApiRequests";

const FinanceQuarterlyCollectionVsArrear = () => {
  const [financialSummary, setFinancialSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFinanceSummary = async () => {
      try {
        const response = await GetDataFromApiWithParams("dashboard/executives/financeSummary");
        //console.log(response);
        setFinancialSummary(response || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching finance summary:", error);
      }
    };

    fetchFinanceSummary();
  }, []);

  return (
    <Link to="/collectionDetail">
      {!isLoading ? (
        financialSummary && financialSummary.length ? (
          <SquareChartContainer
            THECHART={
              <IPDCPieChart
                data={financialSummary}
                showButton={false}
                nameKey="category"
                dataKey="total"
                withHole={true}
              />
            }
            title="Collection vs Arrear"
            link="/collectionDetail"
            showMoreButton={false}
            avatar={<CurrencyExchange />}
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

export default FinanceQuarterlyCollectionVsArrear;
