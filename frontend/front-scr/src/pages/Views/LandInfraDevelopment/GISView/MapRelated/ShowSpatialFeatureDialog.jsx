import React, { useEffect, useState } from "react";
//prettier-ignore
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Paper, Typography,  Grid,
} from "@mui/material";
import Draggable from "react-draggable";
import * as turf from "@turf/turf";
//import ExecuteApiRequest from "../../../../../services/api/ExecuteApiRequest";
import useDecodedUser from "../../../../../services/hooks/useDecodedUser";

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
const ShowSpatialFeatureDialog = ({ spatialInfo, setShowWhenReady }) => {
  const decodedUser = useDecodedUser();
  const [showCoordinate, setShowCoordinate] = useState(false);
  const [simplifiedPolygon, setSimplifiedPolygon] = useState();

  const { geometry, ...attributes } = spatialInfo;
  const [open, setOpen] = useState(true);
  useEffect(() => {
    //console.log(geometry.getExtent());
    const initialSetup = async () => {
      try {
        if (
          decodedUser?.department_id?.toUpperCase() === "GIS" ||
          decodedUser?.department_id?.toUpperCase() === "MP" ||
          decodedUser?.department_id?.toUpperCase() === "LI"
        ) {
          setShowCoordinate(true);
          console.log("[Geometry type is] ",geometry.getType());
          setSimplifiedPolygon(geometry);
          if (geometry?.getType() === "Polygon" && (attributes?.feature?.toUpperCase() === "PARCEL" || attributes?.feature?.toUpperCase() === "BLOCK")) {
            const simplifiedPolygonTemp = turf.polygonSmooth(turf.polygon(geometry.getCoordinates()[0]),{iterations: 2})||geometry;
          alert(simplifiedPolygonTemp);
            setSimplifiedPolygon(simplifiedPolygonTemp);
            // Use the simplified polygon
          } 
        } else setShowCoordinate(false);        
      } catch (error) {
        console.log(error);
      }

    };
    initialSetup();
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move", backgroundColor: "#42a147", padding: "1px", marginBottom: "10px" }}
          id="draggable-dialog-title"
        >
          <Typography variant="h5" align="center" color={"#FFFFFF"}>
            {" "}
            {attributes?.feature?.charAt(0)?.toUpperCase() + attributes?.feature?.slice(1)?.toLowerCase()} Spatial
            Information Details{" "}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {spatialInfo && (
              <>
                <Grid container spacing={1} paddingX={5}>
                  {Object.entries(attributes).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <Grid item xs={6} md={4}>
                        <Typography variant="body1">
                          {key.replace(/_/g, " ").replace(/\b\w/g, char => char.toUpperCase())}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} md={8}>
                        <Typography variant="body1" fontWeight="bold">
                          {value === null || value === "" ? "Not Available" : value}
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  ))}

                  {showCoordinate && simplifiedPolygon && (
                    <Grid item xs={12}>
                      <Typography variant="h6" weight="bold">
                        Coordinates
                      </Typography>
                      {JSON.stringify(simplifiedPolygon.getCoordinates()[0])}
                    </Grid>
                  )}
                </Grid>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ShowSpatialFeatureDialog;
