import { useContext } from "react";
import { MapDataContext } from "../MapData/MapDataContext.js";
const useMapData = () => {  
  const {
    park,
    blocks,
    parcels,
    sheds,
    buildings,
    infras,
    greenAreas,
    importeds,
    roads,
    gcps,
    wasteDisposals,
    waters,
    powers,
    communications,
    otherInfras,
    storages,
    surveyDatas,
    plans,
    parcelGrouping,
    unapprovedImports,
    unapprovedSplitAndMerges, 
  } = useContext(MapDataContext);
  return {
    park,
    blocks,
    parcels,
    sheds,
    buildings,
    infras,
    greenAreas,
    importeds,
    roads,
    gcps,
    wasteDisposals,
    waters,
    powers,
    communications,
    otherInfras,
    storages,
    surveyDatas,
    plans,
    parcelGrouping,
    unapprovedImports,
    unapprovedSplitAndMerges,
  };
};

export default useMapData;
