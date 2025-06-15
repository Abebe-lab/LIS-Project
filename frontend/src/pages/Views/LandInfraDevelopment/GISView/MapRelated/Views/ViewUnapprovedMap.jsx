import React, { useState, useEffect, useRef } from "react";
import { Grid, Checkbox, FormControlLabel, Button,CircularProgress  } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SatelliteIcon from "@mui/icons-material/SatelliteAltRounded";
import DirectionsOffIcon from "@mui/icons-material/DirectionsOff";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { pink } from "@mui/material/colors";
import { Interactions, SelectInteraction } from "../Interactions";

import GetControls from "./ShowControlsAndInteractions/GetControls";

import ShowSpatialFeatureDialog from "../ShowSpatialFeatureDialog";

import { DEFAULT_CENTER } from "../Util/Util";
import MapDataProvider from "../MapData/MapDataProvider";

import NavigateToPark from "./NavigateToPark";
import DefaultMap from "./DefaultMap";
import { UpdateAndGetResponse } from "../../../../../../services/api/ExecuteApiRequests";
import { Cancel } from "@mui/icons-material";
import useDecodedUser from "../../../../../../services/hooks/useDecodedUser";

const ViewUnapprovedMap = () => {
  const showPopup = true;
  const decodedUser = useDecodedUser();
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [dialogKey, setDialogKey] = useState(0);
  const previousFeatureIdRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const [showLegend, setShowLegend] = useState(false);
  const [showSateliteImage, setShowSateliteImage] = useState(false);

  //const [message,setMessage]=useState(null);
  //for selection change
  useEffect(() => {
    const currentFeatureId = selectedFeature?.[0]?.getId();
    if (currentFeatureId !== previousFeatureIdRef.current) {
      setDialogKey(prevKey => prevKey + 1);
      previousFeatureIdRef.current = currentFeatureId;
    }
  }, [selectedFeature]);
  const handleApproveImport = async () => {
    setIsLoading(true); // Set loading to true
    try {
      const result = await UpdateAndGetResponse("imports/approve");
      if (result) {
        toast.success(result.message, {
          position: "top-right",
          autoClose: 3000, // Close after 3 seconds
        });
        window.location.href="/viewMap"
      }
    } finally {
      setIsLoading(false); // Set loading back to false
    }
  };

  const handleDeclineImports = async () => {
    setIsLoading(true); // Set loading to true
    try {
      console.log("handle decline clicked");
      const result = await UpdateAndGetResponse("imports/decline");
      console.log(result);
      if (result) {
        toast.success(result.message, {
          position: "top-right",
          autoClose: 3000, // Close after 3 seconds
        });
      }
    } catch (error) {
      console.log(error);
    }finally {
      setIsLoading(false); // Set loading back to false
    }
  };

  const controls = <GetControls showLegend={showLegend} />;

  const interactions = (
    <Interactions>
      <SelectInteraction setSelectedFeature={setSelectedFeature} showPopup={true} />
    </Interactions>
  );
  const handleLegendToggle = () => setShowLegend(!showLegend);

  return (
    <>
      <>
        <ToastContainer />
      </>
      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <NavigateToPark center={center} setCenter={setCenter} />
        </Grid>
        <Grid item xs={4} md={4} alignContent={"center"} sx={{ display: "flex", justifyContent: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showLegend}
                onChange={handleLegendToggle}
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
                icon={<FilterListOffIcon />}
                checkedIcon={<FilterListIcon />}
              />
            }
            label={showLegend ? "Hide Legend" : "Show Legend"}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={showSateliteImage}
                onChange={e => setShowSateliteImage(e.target.checked)}
                checkedIcon={<SatelliteIcon />}
                icon={<DirectionsOffIcon />}
                color="success"
              />
            }
            label={showSateliteImage ? "Hide Satellite" : "Show Satellite"}
          />
        </Grid>
        {decodedUser && decodedUser?.department_id?.toUpperCase() === "GIS" && decodedUser?.role?.toUpperCase() === "HEAD" && (
          <Grid item xs={4} md={4} sx={{ display: "flex", justifyContent: "flex-end" }} gap={1}>
             {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <>
                <Button
                  color="success"
                  endIcon={<ArrowRightIcon sx={{ fill: "white" }} />}
                  onClick={handleApproveImport}
                  variant="contained"
                  disabled={isLoading}
                >
                  Approve Import
                </Button>
                <Button
                  color="warning"
                  endIcon={<Cancel sx={{ fill: "red" }} />}
                  onClick={handleDeclineImports}
                  variant="contained"
                  disabled={isLoading}
                >
                  Decline Import
                </Button>
              </>
            )}
          </Grid>
        )}
      </Grid>
      <MapDataProvider>
        <DefaultMap
          controls={controls}
          interactions={interactions}
          center={center}
          showPark={true}
          showBlocks={false}
          showParcels={true}
          showInfras={false}
          showGreenAreas={false}
          showUnaprovedImports={true}
          showSateliteImage={showSateliteImage}
        />
      </MapDataProvider>
      {showPopup && selectedFeature && selectedFeature[0]?.getId() && (
        <ShowSpatialFeatureDialog
          key={dialogKey}
          spatialInfo={selectedFeature[0]?.getProperties()}
          setShowWhenReady={true}
        />
      )}
    </>
  );
};

export default ViewUnapprovedMap;
