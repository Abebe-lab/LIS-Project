import React, { useState } from "react";
import { GetParcelsInPark } from "../../CommonData/CommonData";
import { ParkList } from "../../PreRenderedComponents";
import { IPDCReportTemplate } from "../../../../../components";
import { Grid, CircularProgress, Button } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function ParcelList() {
  const [data, setData] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchParcelsInPark = async () => {
    try {
      setLoading(true);
      if (selectedPark) {
        let tempParcel = await GetParcelsInPark(selectedPark?.id, false);
        //remove geometry from parcel
        const filteredParcel = tempParcel?.map(({ geometry, ...rest }) => rest);
        //console.log(filteredParcel);
        filteredParcel && filteredParcel?.length > 0
          ? setData(filteredParcel)
          : setData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <CircularProgress />;
  return (
    <>
      <Grid container className="no-print" spacing={2} ml={1} mb={2}>
        <Grid item xs={12} md={6}>
          <ParkList
            selectedPark={selectedPark}
            setSelectedPark={setSelectedPark}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            startIcon={<Search />}
            onClick={fetchParcelsInPark}
            variant="contained"
            color="primary"
            fullWidth={true}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <>
        {data && data?.length > 0 ? (
          <IPDCReportTemplate
            data={data}
            setData={setData}
            defaultTitle="Parcels List"
            isEditable={false}
            isPrintable={false}
            showWhatToDisplay={true}
          />
        ) : (
          <div>No Investor</div>
        )}
      </>
    </>
  );
}
