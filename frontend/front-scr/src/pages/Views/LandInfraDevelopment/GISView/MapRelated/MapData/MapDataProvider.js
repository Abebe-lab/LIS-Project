import { useState, useEffect } from "react";
import { MapDataContext } from "./MapDataContext.js";
import {
  loadParks,
  loadBlocks,
  loadParcels,
  loadSheds,
  loadBuildings,
  loadGreenAreas,
  loadOtherInfrastructure,
  loadRoads,
  loadImportedFiles,
  loadGCPS,
  loadWasteDisposals,
  loadWaters,
  loadPowers,
  loadCommunications,
  loadStorages,
  loadSurveyDatas,
  loadParcelGrouping,
  loadPlans,
  loadZones,
  loadUnapprovedImports,
  loadUnapprovedSplitAndMerges,
} from "./MapDataLoader";

const MapDataProvider = ({ children }) => {
  const [park, setPark] = useState(null);
  const [blocks, setBlocks] = useState(null);
  const [parcels, setParcels] = useState(null);
  const [sheds, setSheds] = useState(null);
  const [buildings, setBuildings] = useState(null);
  const [imports, setImports] = useState(null);
  const [roads, setRoads] = useState(null);
  const [otherInfras, setOtherInfras] = useState(null);
  const [greenAreas, setGreenAreas] = useState(null);
  const [gcps, setGCPs] = useState(null);
  const [wasteDisposals, setWasteDisposals] = useState(null);
  const [waters, setWaters] = useState(null);
  const [powers, setPowers] = useState(null);
  const [communications, setCommunications] = useState(null);
  const [storages, setStorages] = useState(null);
  const [surveyDatas, setSurveyDatas] = useState(null);
  const [parcelGrouping, setParcelGrouping] = useState(null);
  const [plans, setPlans] = useState(null);
  const [zones, setZones] = useState(null);
  const [unapprovedImports, setUnapprovedImports] = useState(null);
  const [unapprovedSplitAndMerges, setUnapprovedSplitAndMerges] = useState(null);

  useEffect(() => {
    loadParks().then(prks => setPark(prks));
    loadBlocks().then(blks => setBlocks(blks));
    loadParcels().then(prcls => setParcels(prcls));
    loadSheds().then(shds => setSheds(shds));
    loadBuildings().then(bldgs => setBuildings(bldgs));
    loadGreenAreas().then(grns => setGreenAreas(grns));
    loadOtherInfrastructure().then(infraOther => setOtherInfras(infraOther));
    loadRoads().then(rds => setRoads(rds));
    loadImportedFiles().then(impts => setImports(impts));
    loadGCPS().then(gcps => setGCPs(gcps));
    loadPowers().then(pwrs => setPowers(pwrs));
    loadWasteDisposals().then(wstDis => setWasteDisposals(wstDis));
    loadWaters().then(wtrs => setWaters(wtrs));
    loadCommunications().then(commn => setCommunications(commn));
    loadStorages().then(strg => setStorages(strg));
    loadSurveyDatas().then(surv => setSurveyDatas(surv));
    loadParcelGrouping().then(parGrp => setParcelGrouping(parGrp));
    loadPlans().then(plns => setPlans(plns));
    loadZones().then(zns => setZones(zns));
    loadUnapprovedImports().then(unapp => setUnapprovedImports(unapp));
    loadUnapprovedSplitAndMerges().then(unapp => setUnapprovedSplitAndMerges(unapp));
  }, []);

  useEffect(() => {
    //console.log("always loads data");
  }, []);

  return (
    <MapDataContext.Provider
      value={{
        park,
        setPark: setPark,
        parcels,
        setParcels: setParcels,
        sheds,
        setSheds: setSheds,
        buildings,
        setBuildings: setBuildings,
        blocks,
        setBlocks: setBlocks,
        otherInfras,
        setOtherInfras: setOtherInfras,
        greenAreas,
        setGreenAreas: setGreenAreas,
        roads: roads,
        setRoads: setRoads,
        gcps: gcps,
        setGCPs: setGCPs,
        communications: communications,
        setCommunications: setCommunications,
        powers: powers,
        setPowers: setPowers,
        wasteDisposals: wasteDisposals,
        setWasteDisposals: setWasteDisposals,
        waters: waters,
        setWaters: setWaters,
        storages: storages,
        setStorages: setStorages,
        imports: imports,
        setImports: setImports,
        surveyDatas: surveyDatas,
        setSurveyDatas: setSurveyDatas,
        parcelGrouping: parcelGrouping,
        setParcelGrouping: setParcelGrouping,
        plans: plans,
        setPlans: setPlans,
        zones: zones,
        setZones: setZones,
        unapprovedImports: unapprovedImports,
        setUnapprovedImports: setUnapprovedImports,
        unapprovedSplitAndMerges: unapprovedSplitAndMerges,
        setUnapprovedSplitAndMerges: setUnapprovedSplitAndMerges,
      }}
    >
      {children}
    </MapDataContext.Provider>
  );
};

export default MapDataProvider;
