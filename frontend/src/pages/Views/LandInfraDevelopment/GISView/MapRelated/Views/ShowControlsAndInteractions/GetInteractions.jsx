import { useEffect } from "react";
import { Interactions, SelectInteraction, ModifyInteraction, DrawInteraction } from "../../Interactions";

export default function GetInteractions({
  isSelectable = true,
  isEditable = false,
  setSelectedFeature,
  showPopup = true,
  additionalInteraction = null,
  measureEnabled = false,
  onMeasurement
}) {
  useEffect(() => {
    //console.log("reminder")
  }, []);
  return (
    <Interactions>
      {isSelectable && <SelectInteraction setSelectedFeature={setSelectedFeature} showPopup={showPopup} />}
      {isEditable && <ModifyInteraction />}
      {additionalInteraction && additionalInteraction}
      {measureEnabled && <DrawInteraction />}
    </Interactions>
  );
}
