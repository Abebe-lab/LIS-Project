import { useEffect, useState, useRef } from "react";
import { GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";
import IPDCFinalTable from "../../../../../components/IPDCFinalTable";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { set } from "lodash";


export default function ApproveImportedSpatialInfo() {
  const [unapprovedData, setUnapprovedData] = useState([]);
  const [unapprovedSplitAndMergeData, setUnapprovedSplitAndMergeData] = useState([]);
  const componentRef = useRef();
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  //saveApproval
  useEffect(() => {
    const fetchUnapprovedData = async () => {
      const resultRow = await GetDataFromApiWithParams("unapprovedSpatialData");
      if (resultRow && resultRow.length > 0 ) {
        setUnapprovedData(resultRow);
        const cols = (await resultRow.length) ? Object.keys(resultRow[0]) : [];
        setSelectedColumns(cols);
        setUnapprovedData(resultRow);
      }
      setLoading(false);
      console.log(resultRow);
    };
    const fetchUnapprovedSplitAndMergeData = async () => {
      const resultRow = await GetDataFromApiWithParams("unapprovedSplitAndMergeData");
      if (resultRow && resultRow.length > 0 ) {
        setUnapprovedSplitAndMergeData(resultRow);
        const cols = (await resultRow.length) ? Object.keys(resultRow[0]) : [];
        setSelectedColumns(cols);
        setUnapprovedSplitAndMergeData(resultRow);
      }
      setLoading(false);
      console.log(resultRow);
    };
    fetchUnapprovedData();
    fetchUnapprovedSplitAndMergeData();
  }, []);
  return (
    <Box>
      {loading && <div>Loading...</div>}
      
      {(!loading && unapprovedData?.length > 0 )? <><Box sx={{ display: "flex", justifyContent: "left" }}>
      <Button
        component={Link}
        to="/ViewUnapprovedMap"
        color="warning"
        endIcon={<ArrowForwardIcon />}
        variant="contained"
      >
        Go to Map View
      </Button>
      </Box>
        <IPDCFinalTable
          ref={componentRef}
          data={unapprovedData}
          setData={setUnapprovedData}
          selectedColumns={selectedColumns}
          title="Unapproved Import Data"
          attachmentLink="file_path"
          hasAttachment={true}
        />
      </>:<>No Import Data to approve</>}
      {(!loading && unapprovedSplitAndMergeData?.length > 0 )? <><Box sx={{ display: "flex", justifyContent: "left" }}>
      <Button
        component={Link}
        to="/ViewUnapprovedSplitAndMergeMap"
        color="warning"
        endIcon={<ArrowForwardIcon />}
        variant="contained"
      >
        Go to Map View
      </Button>
      </Box>
        <IPDCFinalTable
          ref={componentRef}
          data={unapprovedSplitAndMergeData}
          setData={setUnapprovedSplitAndMergeData}
          selectedColumns={selectedColumns}
          title="Unapproved Split and Merge Data"
          attachmentLink="file_path"
          hasAttachment={false}
        />
      </>:<>No Split/Merge Data to approve</>}
    </Box>
  );
}
