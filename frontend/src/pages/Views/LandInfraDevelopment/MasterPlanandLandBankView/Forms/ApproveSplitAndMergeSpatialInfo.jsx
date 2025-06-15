import { useEffect, useState, useRef } from "react";
import { GetDataFromApiWithParams } from "../../../../../services/api/ExecuteApiRequests";
import IPDCFinalTable from "../../../../../components/IPDCFinalTable";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


export default function ApproveSplitAndMergeSpatialInfo() {
  const [unapprovedData, setUnapprovedData] = useState([]);
  const componentRef = useRef();
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  //saveApproval
  useEffect(() => {
    const fetchUnapprovedData = async () => {
      const resultRow = await GetDataFromApiWithParams("unapprovedSplitAndMergeData");
      if (resultRow && resultRow.length > 0 ) {
        setUnapprovedData(resultRow);
        const cols = (await resultRow.length) ? Object.keys(resultRow[0]) : [];
        setSelectedColumns(cols);
        setUnapprovedData(resultRow);
      }
      setLoading(false);
      console.log(resultRow);
    };
    fetchUnapprovedData();
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
          title="Unapproved spatial data"
          attachmentLink="file_path"
          hasAttachment={true}
        />
      </>:<>No Data to approve</>}
    </Box>
  );
}
