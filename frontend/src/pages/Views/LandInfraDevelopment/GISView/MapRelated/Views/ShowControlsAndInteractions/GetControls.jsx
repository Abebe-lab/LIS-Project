import { useEffect } from "react";
import { Controls, ZoomControl, ScaleLineControl, AttributionControl } from "../../Controls";
import { LegendControl } from "../../Legend/LegendControl";
export default function GetControls({
  showZoomControl = true,
  showLegend = true,
  showScaleLine = true,
  showAttribute = true,
}) {
  useEffect(() => {
    //console.log("common called and, show legend is :", showLegend);
  }, [showLegend]);
  return (
    <Controls>
      {showZoomControl && <ZoomControl />}
      {showScaleLine && <ScaleLineControl />}
      {showAttribute && <AttributionControl />}
      {showLegend && <LegendControl />}
    </Controls>
  );
}
