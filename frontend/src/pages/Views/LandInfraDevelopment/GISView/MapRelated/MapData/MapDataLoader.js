import { GetDataFromApiWithParams } from "../../../../../../services/api/ExecuteApiRequests";
async function fetchData(targetAPI) {
  try {
    const data = await GetDataFromApiWithParams(targetAPI);
    return data;
  } catch (err) {
    console.log(err);
  }
  return null;
}
export async function loadParks() {
  try {
    const park = await fetchData("parks");
    if (park && park?.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Park Boundary",
        features: park.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            feature: "PARK",
            id: row?.id,
            abbrevation: row?.abbrevation,
            name: row?.name,
            developed_by: row?.developed_by,
            specialization: row?.specialization,
            region: row?.region,
            zone: row?.zone,
            city: row?.city,
            woreda: row?.woreda,
            address: row?.region + " , " + row?.zone + " , " + row?.city + " , " + row?.woreda,
            area_on_plan: row?.area_on_plan,
            measured_area: parseInt(row?.measured_area / 10000) + " Ha.",
            current_status: row?.current_status,
            description: row?.description,
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}
export async function loadBlocks() {
  try {
    const blocks = await fetchData("blocks");
    if (blocks && blocks.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Blocks",
        features: blocks.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            feature: "BLOCK",
            id: row?.id,
            block_no: row?.block_no,
            park_id: row?.park_id,
            name: row?.name,
            planned_parcels: row?.planned_parcels,
            description: row?.description,
            existing_parcels: row?.existing_parcels,
            status: row?.status,
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadParcels() {
  try {
    const parcels = await fetchData("parcels");
    if (parcels && parcels.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Parcels",
        features: parcels.map(row => ({
          type: "Feature",
          geometry: row?.geometry,
          properties: {
            feature: "PARCEL",
            local_shed_parcel_no: row?.local_shed_no,
            upin: row?.upin,
            id: row?.upin,
            name: row?.name,
            block_no: row?.block_no,
            planned_for: row?.planned_for,
            current_function: row?.current_function,
            tenant_company: row?.tenant_company,
            nationality_origin: row?.nationality_origin,
            measured_area: row?.measured_area + " M2",
            description: row?.description,
            type: row?.type,
            no_of_buildings: row?.no_of_buildings,
            no_of_planned_buildings: row?.no_of_planned_buildings,
            occupancy_status: row?.occupancy_status,
          },
          id: row?.upin,
        })),
      };
      //console.log("parcels");
      //      console.log(geoJson);
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}

export async function loadSheds() {
  const sheds = await fetchData("sheds");
  //console.log("Sheds");
  //console.log(sheds);
  try {
    if (sheds && sheds.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "SHEDS",
        features: sheds.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            feature: "SHEDS",
            id: row?.id,
            utilization: row?.status_utilization,
            upin: row?.upin,
            measured_area: row?.measured_area?.toFixed(2),
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
export async function loadRoads() {
  const roads = await fetchData("roads");
  //console.log("roads");
  //console.log(roads);
  try {
    if (roads && roads.length > 0) {
      const geoJson = {
        feature: "ROAD",
        type: "FeatureCollection",
        label: "roads",
        features: roads.map(row => ({
          type: "Feature",
          geometry: row?.geometry,
          properties: {
            feature: "ROAD",
            id: row?.id,
            name: row?.name,
            type: row?.type,
            shape_type: row?.shape_type,
            description: row?.description,
            capacity: row?.capacity,
            unit_of_measure: row?.unit_of_measure,
            sub_type: row?.sub_type,
            width: row?.width,
          },
          id: row?.id,
        })),
      };
      //      console.log('roads');
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadBuildings() {
  try {
    const buildings = await fetchData("buildings");
    //console.log("buildings");
    //console.log(buildings);

    if (buildings && buildings.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "building",
        features: buildings.map(row => ({
          type: "Feature",
          geometry: row?.geometry,
          properties: {
            feature: "BUILDING",
            id: row?.id,
            name: row?.name,
            building_type: row?.building_type, //residential, office, federal camp, police station, health station, OSS, security Post, auxilary house, car park, hut/tukul
            no_of_floors: row?.no_of_floors,
            measured_area: row?.measured_area?.toFixed(2),
            description: row?.description,
          },
          id: row?.id,
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadOtherInfrastructure() {
  try {
    const infras = await fetchData("others");
    if (infras && infras.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Other Infrastructures",
        features: infras.map(row => ({
          type: "Feature",
          geometry: row?.geometry,
          properties: {
            feature: "Other Infrastructures",
            id: row?.id,
            name: row?.name,
            type: row?.type,
          },
          id: row?.id,
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadGreenAreas() {
  try {
    const green = await fetchData("greenarea");
    //console.log("green load");
    //console.log(green);
    if (green && green.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Green Area",
        features: green.map(row => ({
          type: "Feature",
          geometry: row?.geometry,
          properties: {
            feature: "GREEN AREA",
            id: row?.id,
            name: row?.name,
            description: row?.description,
            shape_type: row?.shape_type,
            type: row?.type,
          },
          id: row?.id,
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadGCPS() {
  try {
    const GCPs = await fetchData("GCPs");
    if (GCPs && GCPs.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "GCP",
        features: GCPs.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            feature: "GCP",
            id: row?.id,
            point_name: row?.point_name,
            reading_no: row?.reading_no,
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}

export async function loadWasteDisposals() {
  try {
    const waste = await fetchData("wasteDisposals");
    if (waste && waste.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Waste Disposals",
        features: waste.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            feature: "WASTE DISPOSAL",
            id: row?.id,
            type: row?.type,
            name: row?.name,
            capacity: row?.capacity + " " + row?.unit_of_measure,
            technology: row?.technology,
            description: row?.description,
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadStorages() {
  try {
    const storages = await fetchData("storages");
    if (storages && storages.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Storages",
        features: storages.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            feature: "STORAGE",
            id: row?.id,
            type: row?.type,
            name: row?.name,
            capacity: row?.capacity + " " + row?.unit_of_measure,
            technology: row?.technology,
            description: row?.description,
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadWaters() {
  try {
    const waters = await fetchData("waters");
    if (waters && waters.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Water",
        features: waters.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            feature: "WATER",
            id: row?.id,
            type: row?.type,
            name: row?.name,
            capacity: row?.capacity + " " + row?.unit_of_measure,
            technology: row?.technology,
            description: row?.description,
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadPowers() {
  try {
    const powers = await fetchData("powers");
    if (powers && powers.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Power",
        features: powers.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            id: row?.id,
            feature: "POWER",
            type: row?.shape_type,
            name: row?.name,
            capacity_to_serve: row?.capacity_to_serve,
            output: row?.output + " " + row?.unit_of_measure,
            capacity: row?.capacity + " " + row?.unit_of_measure,
            description: row?.description,
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadCommunications() {
  try {
    const communications = await fetchData("communications");
    if (communications && communications.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Communications",
        features: communications.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            feature: "COMMUNICATION",
            id: row?.id,
            name: row?.name,
            type: row?.shape_type,
            capacity_to_serve: row?.capacity_to_serve,
            output: row?.output + " " + row?.unit_of_measure,
            description: row?.description,
          },
        })),
      };
      //      console.log("communication", geoJson);
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadUnapprovedImports() {
  try {
    const imported = await fetchData("imports/unapprovedImportsForMap");
    if (imported && imported?.length > 0) {
      const geoJson = imported.filter(row => row !== null);
      //      console.log(geoJson)
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadUnapprovedSplitAndMerges() {
  try {
    const imported = await fetchData("unapprovedSplitAndMergeData");
    if (imported && imported?.length > 0) {
      const geoJson = imported.filter(row => row !== null);
      //      console.log(geoJson)
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadImportedFiles() {
  try {
    const imported = await fetchData("import");
    if (imported && imported.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Imported Files",
        features: imported.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            feature: "IMPORTED FILES",
            id: row?.id,
            name: row?.name,
            description: row?.description,
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadSurveyDatas() {
  try {
    const survey = await fetchData("surveys");
    if (survey && survey.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Survey Datas",
        features: survey.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            id: row?.id,
            feature: "SURVEY",
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadPlans() {
  try {
    const plans = await fetchData("plans");

    if (plans && plans.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Plan Datas",
        features: plans.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            id: row?.id,
            name: row?.name,
            feature: "PLANS",
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadZones() {
  try {
    const survey = await fetchData("zones");
    if (survey && survey.length > 0) {
      const geoJson = {
        type: "FeatureCollection",
        label: "Zone Datas",
        features: survey.map(row => ({
          type: "Feature",
          id: row?.id,
          geometry: row?.geometry,
          properties: {
            id: row?.id,
            name: row?.name,
            feature: "ZONES",
          },
        })),
      };
      return geoJson;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return null;
}
export async function loadParcelGrouping() {
  try {
    const data = await fetchData("parcels/grouping");
    //console.log(`loadParcelGrouping executed successfully with data:`, data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
