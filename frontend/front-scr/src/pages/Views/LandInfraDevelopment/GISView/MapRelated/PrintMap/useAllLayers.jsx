import React, { useEffect, useContext, useRef, useCallback, useMemo } from "react";
import useMapData from "../hooks/useMapData.jsx";
import MapContext from "../Map/MapContext.js";
import { VectorLayer } from "../Layers";
import { getSelectedStyle, getProjectedVector, getProjectedFromAdindan } from "../Util/Util.js";
import {
  getParcelColorByOccupancy,
  getParcelColorByCountry,
  getParcelColorBySector,
} from "../Style/ParcelCatgorizationByColor.jsx";
import { occupiedParcelStyle, infraStyle, parkStyle } from "../Style/MapStyle.js";
import { getNonParcelFeatureStyle } from "../Style/NonParcelStyler.jsx";
import { Modify } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
//import useMapData from "../hooks/useMapData.jsx";
//import { fromCircle } from "ol/geom/Polygon.js";

//prettier-ignore
const useAllLayers = ({ parcelsCategory = null, isEditable = false}) => {
  const { map } = useContext(MapContext);
  const { park, blocks, parcels, sheds, buildings, otherInfras, greenAreas, importeds, roads, gcps,
    wasteDisposals, waters, powers, communications, storages, surveyDatas, plans, unapprovedImports, unapprovedSplitAndMerges,zones } = useMapData();
  const { parcelGrouping } = useMapData();

  const [countries, sectors, occupancyStatuses] = useMemo(() => {
    const uniqueCountries = new Set();
    const uniqueSectors = new Set();
    const uniqueOccupancyStatuses = new Set();
//console.log(parcelGrouping);
    parcelGrouping?.length && parcelGrouping?.forEach((item) => {
      uniqueCountries.add(item.nationality_origin);
      uniqueSectors.add(item.current_function);
      uniqueOccupancyStatuses.add(item.occupancy_status);
    });

    return [[...uniqueCountries], [...uniqueSectors], [...uniqueOccupancyStatuses]];
  }, [parcelGrouping]);

  const parcelLayerRef = useRef(null); // Create a ref for the parcel layer

  const getParcelStyle = useCallback(
    (feature) => {
      switch (parcelsCategory) {
        case "OCCUP":
          return getParcelColorByOccupancy(feature, occupancyStatuses);
        case "COUNTRY":
          return getParcelColorByCountry(feature, countries);
        case "FUNC":
          return getParcelColorBySector(feature, sectors);
        default:
          return getParcelColorBySector(feature); // Default style
      }
    },
    [parcelsCategory, occupancyStatuses, countries, sectors],
  );
  useEffect(() => {
    if (parcelLayerRef.current) {
      parcelLayerRef.current.setStyle(getParcelStyle); // Update the style
    }
  }, [parcelsCategory, getParcelStyle]);

  useEffect(() => {
    if (map && isEditable) {
      const vectorLayers = map
        .getLayers()
        .getArray()
        .filter((layer) => layer && layer.getSource() instanceof VectorSource);

      vectorLayers.forEach((layer) => {
        const modifyInteraction = new Modify({
          source: layer.getSource(),
        });
        //todo: addplot
        map.addInteraction(modifyInteraction);
      });

      // Cleanup function
      return () => {
        map
          .getInteractions()
          .getArray()
          .forEach((interaction) => {
            if (interaction instanceof Modify) {
              map.removeInteraction(interaction);
            }
          });
      };
    }
  }, [map, isEditable]);
  /*useEffect(() => {
    if (powers) {
      console.log(powers);
    } else {
      console.log("no power");
    }
    console.log(powers);
  }, [map, powers]);*/
  return (
    <>
    {park && (
        <VectorLayer title="Park Boundary" source={getProjectedFromAdindan(park)} style={getSelectedStyle(parkStyle, true, "id")}
          zIndex={1}
        />
      )}
       {/*"CADASTRE"*/}
       {blocks && (
        <VectorLayer
          title="Block"
          source={getProjectedVector(blocks)}
          style={(feature)=>getNonParcelFeatureStyle(feature,"#beb297",false)}
          zIndex={2}
        />
      )}
      {parcels && (
        <VectorLayer
          ref={parcelLayerRef}
          title="Parcel"
          source={getProjectedVector(parcels)}
          style={getParcelStyle}
          zIndex={4}
        />
      )}
      {sheds && (
        <VectorLayer
          title="Sheds"
          source={getProjectedVector(sheds)}
          style={(feature)=>getNonParcelFeatureStyle(feature,"#987db7",false)}
          zIndex={3}
        />
      )}
      {buildings && (
        <VectorLayer
          title="Buildings"
          source={getProjectedVector(buildings)}
          style={(feature)=>getNonParcelFeatureStyle(feature,"#E9DFC9",false,null,null,0.5,"white")}
          zIndex={6}
        />
      )}
       {/*"PLANS AND OTHER"*/}
      {storages && (
        <VectorLayer
          title="Storages"
          source={getProjectedVector(storages)}
          style={getSelectedStyle(infraStyle, false)}
          zIndex={6}
        />
      )}
       {importeds && (
        <VectorLayer
          title="Imported"
          source={getProjectedVector(importeds)}
          style={getSelectedStyle(infraStyle, false)}
          zIndex={7}
        />
      )}
      {roads && (
        <VectorLayer
          title="Roads"
          source={getProjectedVector(roads)}
          style={(feature)=>getNonParcelFeatureStyle(feature,"grey")}
          zIndex={15}
        />
      )}
      {otherInfras && (
        <VectorLayer
          title="Other Infrastructures"
          source={getProjectedVector(otherInfras)}
          style={(feature)=>getNonParcelFeatureStyle(feature,"grey")}
          zIndex={15}
        />
      )}
      
      
      {surveyDatas && (
        <VectorLayer
          title="Survey Datas"
          source={getProjectedVector(surveyDatas)}
          style={getSelectedStyle(infraStyle, false)}
          zIndex={15}
        />
      )}
      {plans && (
        <VectorLayer
          title="Plans"
          source={getProjectedVector(plans)}
          style={getSelectedStyle(occupiedParcelStyle, false)}
          zIndex={15}
        />
      )}
      {zones && (
        <VectorLayer
          title="Zones"
          source={getProjectedVector(zones)}
          style={getSelectedStyle(occupiedParcelStyle, false)}
          zIndex={15}
        />
      )}
       {greenAreas && (
        <VectorLayer
          title="Green Area"
          source={getProjectedVector(greenAreas)}
          style={(feature)=>getNonParcelFeatureStyle(feature,"green",true,"id")}
          zIndex={16}
        />
      )}
      {/*"UTILITIES"*/}
      {waters && (
        <VectorLayer
          title="Waters"
          source={getProjectedVector(waters)}
          style={(feature)=>getNonParcelFeatureStyle(feature,"lightblue",true,"name","white",0.5)}
          zIndex={20}
        />
      )}
      {powers && (
        <VectorLayer
          title="Powers"
          source={getProjectedVector(powers)}
          style={(feature)=>getNonParcelFeatureStyle(feature,"red",true,"id","white")}
          zIndex={20}
        />
      )}
      {communications && (
        <VectorLayer
          title="Communications"
          source={getProjectedVector(communications)}
          style={(feature)=>getNonParcelFeatureStyle(feature,"blue",true,"id","white")}
          zIndex={20}
        />
      )}
     
      {wasteDisposals && (
        <VectorLayer
          title="Waste Disposal"
          source={getProjectedVector(wasteDisposals)}
          style={(feature)=>getNonParcelFeatureStyle(feature,'rgba(170, 66, 173, 0.75)',true,"technology")}
          zIndex={20}
        />
      )}
      {gcps && (
        <VectorLayer
          title="GCPS"
          source={getProjectedVector(gcps)}
          style={getSelectedStyle(infraStyle, false)}
          zIndex={20}
        />
      )}
      {
        //NOT YET IMPLEMENTED, to be shown at th etop
      }
      {unapprovedImports && (
        unapprovedImports.map((ui, index) => (
        <VectorLayer
          key={index}
          title="Unapproved Imports"
          source={getProjectedVector(ui)}
          style={(feature)=>getNonParcelFeatureStyle(feature,"red",false,null,null,0.75,"black")}
          zIndex={30}
        />
        ))        
      )}
      {unapprovedSplitAndMerges && (
        unapprovedSplitAndMerges.map((ui, index) => (
        <VectorLayer
          key={index}
          title="Unapproved Split and Merge"
          source={getProjectedVector(ui)}
          style={(feature)=>getNonParcelFeatureStyle(feature,"red",false,null,null,0.75,"black")}
          zIndex={30}
        />
        ))        
      )}
    </>
  );
};

export default useAllLayers;
