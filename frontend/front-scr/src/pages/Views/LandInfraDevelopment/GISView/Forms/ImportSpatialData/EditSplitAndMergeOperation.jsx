import { memo, useEffect, useState, useRef } from "react";
import { GetDataFromApiWithParams } from "../../../../../../services/api/ExecuteApiRequests";
import IPDCFinalTable from "../../../../../../components/IPDCFinalTable";
import { Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";

//prettier-ignore
const EditSplitAndMergeOperation = () => {

    const [unapprovedData, setUnapprovedData] = useState([]);
    const componentRef = useRef();
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMyImport = async () => {
          const resultRow = await GetDataFromApiWithParams(`unapprovedSplitAndMergeData/${localStorage.getItem('user-id')}`);
          if (resultRow.length > 0 && resultRow) {
            setUnapprovedData(resultRow);
            const cols = (await resultRow.length) ? Object.keys(resultRow[0]) : [];
            setSelectedColumns(cols);
            setUnapprovedData(resultRow);
          }
          setLoading(false);
          //console.log(resultRow);
        };
        fetchMyImport();
      }, []);  
  
  return (
    <Container>
      {loading && <div>Loading...</div>}
      <Link to="/ViewUnapprovedSplitAndMerge"><><MapIcon /><Typography>Go to Map View</Typography></></Link>
      {unapprovedData?.length ? (
        <IPDCFinalTable
          ref={componentRef}
          data={unapprovedData}
          setData={setUnapprovedData}
          selectedColumns={selectedColumns}
          title="Unapproved Split and Merge Operation"
          attachmentLink="file_path"
          hasAttachment={true}
          isDeletable={true}
          targetPoint="ViewUnapprovedSplitAndMerge"
          deleteKey="id"
        />
      ):<><Box><Typography>No unapproved, split and merge operation, data available</Typography></Box></>}
    </Container>
  );
};

export default memo(EditSplitAndMergeOperation);
