import React, { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Typography, Paper } from "@mui/material";
import ViewMap from "./ViewMap";
import { FloatingRightSingleFormNearTop } from "../../../../../../styles/Form/FormStyles";
import { MergeForm, SplitForm } from "../../Forms";

const EditMap = () => {
  //const [isEditable, setIsEditable] = useState(false);
  const [selectedFeatureOnMap, setSelectedFeatureOnMap] = useState(null);
  //------------SHOW AND HIDE SPLIT AND MERGE FORM
  const [showSplitForm, setShowSplitForm] = useState(false);
  const [showMergeForm, setShowMergeForm] = useState(false);

  const handleMergeButton = () => {
    //setIsEditable(false);
    setShowMergeForm(!showMergeForm);
    if (showSplitForm) {
      setShowSplitForm(false);
    }
    console.log("show Merge form");
  };

  const handleSplitButton = () => {
    //setIsEditable(false);
    setShowSplitForm(!showSplitForm);
    if (showMergeForm) {
      setShowMergeForm(false);
    }
    console.log("show split form");
  };

  return (
    <>
      <Box>
        <ToggleButtonGroup exclusive sx={{ float: "right", position: "fixed", right: 10, zIndex: 1000000 }}>
          <ToggleButton key={"Consolidate"} value={"Consolidate"} onClick={handleMergeButton}>
            <Typography color={"gray"}>Consolidate</Typography>
          </ToggleButton>
          <ToggleButton key={"Subdivide"} value={"Subdivide"} onClick={handleSplitButton}>
            <Typography color={"gray"}>Subdivide</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {showSplitForm && <SplitForm selectedFeatureOnMap={selectedFeatureOnMap} />}
      {showMergeForm && <MergeForm selectedFeatureOnMap={selectedFeatureOnMap} />}

      <Box sx={{ position: "relative", height: "90vh", overflow: "visible" }}>
        <ViewMap
          setSelectedFeatureOnMap={setSelectedFeatureOnMap}
          isEditable={false}
          showLegend={true}
          showPopup={false}
        />
      </Box>
    </>
  );
};

export default React.memo(EditMap);
