import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IPDCLineChart,WideChartContainer } from "../../../../../components/Charts";
import {ImportExportOutlined} from "@mui/icons-material";
import { ExecuteApiRequest, GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";

const ImportedAndEditedCard = () => {
  const [importEditSummary, setImportEditSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImportAndEditSummary = async () => {
      try {
        const response = await GetDataFromApiWithParams(`dashboard/mp/importedAndEdited`);
        //console.log(response);
        setImportEditSummary(response || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching import/edit summary:", error);
      }
    };

    fetchImportAndEditSummary();
  }, []);

  return (
    < >
    {importEditSummary && importEditSummary.length ? (
      <WideChartContainer
        THECHART={
          <IPDCLineChart
            data={importEditSummary}
            xDataKeys="import_month"
            yDataKeys={["total_imported", "total_approved"]}
            showButton={false}
          />
        }
        title="Imported vs Approved"
        //link="/importAndEditList"
        showMoreButton={false}
        avatar={<ImportExportOutlined />}
      />
    ) : (
      <WideChartContainer
        THECHART={
          <IPDCLineChart
            data={importEditSummary}
            xDataKeys="import_month"
            yDataKeys={["total_imported", "total_approved"]}
            showButton={false}
          />
        }
        title="Imported vs Approved"
        //link="/importAndEditList"
        showMoreButton={false}
        avatar={<ImportExportOutlined />}
      />
    )}
  </>
  );
};

export default ImportedAndEditedCard;
