import { memo, useEffect, useState, useRef } from "react";
import { GetDataFromApiWithParams } from "../../../../../../services/api/ExecuteApiRequests";
import IPDCFinalTable from "../../../../../../components/IPDCFinalTable";
import { Box, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import MapIcon from "@mui/icons-material/Map";

//prettier-ignore
const EditImportedData = () => {

    const [unapprovedData, setUnapprovedData] = useState([]);
    const componentRef = useRef();
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMyImport = async () => {
          const resultRow = await GetDataFromApiWithParams(`unapprovedSpatialData/${localStorage.getItem('user-id')}`);
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
      <Link to="/ViewUnapprovedMap"><><MapIcon /><Typography>Go to Map View</Typography></></Link>
      {unapprovedData?.length ? (
        <IPDCFinalTable
          ref={componentRef}
          data={unapprovedData}
          setData={setUnapprovedData}
          selectedColumns={selectedColumns}
          title="Unapproved spatial data"
          attachmentLink="file_path"
          hasAttachment={true}
          isDeletable={true}
          targetPoint="unapprovedSpatialData"
          deleteKey="id"
        />
      ):<><Box><Typography>No unapproved, imported spatial data, available</Typography></Box></>}
    </Container>
  );
};

export default memo(EditImportedData);
