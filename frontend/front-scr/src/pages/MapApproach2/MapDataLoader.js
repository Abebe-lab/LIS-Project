import { GetDataFromApiWithParams } from "../../services/api/ExecuteApiRequests";

const fetchSpatialData = async (layerName) => {
  try {
    const data = await GetDataFromApiWithParams(layerName);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export async function loadPark() {
  const park = await fetchSpatialData("parks");
  if (park) {
    const geoJson = {
      type: "FeatureCollection",
      label: "Park Boundary",
      features: park.map((row) => ({
        type: "Feature",
        id: row.id,
        geometry: row.geometry,
        properties: {
          id: row?.id,
          abbrevation: row?.abbrevation,
          name: row?.name,
          developed_by: row?.developed_by,
          specialization: row?.specialization,
          address: row?.region + " , " + row?.zone + " , " + row?.city + " , " + row?.woreda,
          area_on_plan: row?.area_on_plan,
          measured_area: parseInt(row?.measured_area / 10000) + " Ha.",
          current_status: row?.current_status,
          feature: "PARK",
          description: row?.description,
        },
      })),
    };
    return geoJson;
  }
}
export async function loadBlocks() {
  const responseData = await GetDataFromApiWithParams("blocks");

  const blocks = await responseData;
  if (blocks) {
    const geoJson = {
      type: "FeatureCollection",
      label: "Blocks",
      features: blocks.map((row) => ({
        type: "Feature",
        id: row.id,
        geometry: row.geometry,
        properties: {
          id: row.id,
          block_no: row.block_no,
          park_id: row.park_id,
          name: row.name,
          planned_parcels: row.planned_parcels,
          description: row.description,
          existing_parcels: row.existing_parcels,
          status: row.status,
        },
      })),
    };
    return geoJson;
  }
}
export async function loadParcels() {
  const parcels = await fetchSpatialData("parcels");
  if (parcels) {
    const geoJson = {
      type: "FeatureCollection",
      label: "Parcels",
      features: parcels.map((row) => ({
        type: "Feature",
        id: row.upin,
        geometry: row.geometry,
        properties: {
          upin: row.upin,
          id: row.upin,
          name: row.name,
          block_no: row.block_no,
          planned_for: row.planned_for,
          current_function: row.current_function,
          description: row.description,
          type: row.type,
          no_of_buildings: row.no_of_buildings,
          no_of_planned_buildings: row.no_of_planned_buildings,
          status: row.status,
        },
      })),
    };
    console.log("parcels");
    //      console.log(geoJson);
    return geoJson;
  }
}
export async function loadRoads() {
  const roads = await fetchSpatialData("roads");
  //  console.log(roads);
  if (roads) {
    const geoJson = {
      type: "FeatureCollection",
      label: "roads",
      features: roads.map((row) => ({
        type: "Feature",
        geometry: row.geometry,
        properties: {
          id: row.id,
          name: row.name,
        },
        id: row.id,
      })),
    };
    //      console.log('roads');
    return geoJson;
  }
}
export async function loadInfrastructure() {
  const infras = await fetchSpatialData("other");
  //console.log(infras);
  if (infras) {
    const geoJson = {
      type: "FeatureCollection",
      label: "Other Infrastructure",
      features: infras.map((row) => ({
        type: "Feature",
        geometry: row.geometry,
        properties: {
          id: row.id,
          type: row.type,
        },
        id: row.id,
      })),
    };
    return geoJson;
  }
}
export async function loadGreenArea() {
  const green = await fetchSpatialData("greenarea");
  //  console.log('green load');
  if (green) {
    const geoJson = {
      type: "FeatureCollection",
      label: "Green Area",
      features: green.map((row) => ({
        type: "Feature",
        geometry: row.geometry,
        properties: {
          id: row.id,
          name: row.name,
        },
        id: row.id,
      })),
    };
    return geoJson;
  }
}
export async function loadImportedFiles() {
  const imported = await fetchSpatialData("import");

  if (imported) {
    const geoJson = {
      type: "FeatureCollection",
      label: "Imported Files",
      features: imported.map((row) => ({
        type: "Feature",
        id: row.id,
        geometry: row.geometry,
        properties: {
          id: row.id,
        },
      })),
    };
    return geoJson;
  }
}
