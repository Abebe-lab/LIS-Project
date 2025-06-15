import gjv from "geojson-validation";
import * as turf from "@turf/turf";
import gisGetMapDataQueries from "../../quieries/gis/gisGetMapDataQueries.js";
import gisImportDataQueries from "../../quieries/gis/gisImportDataQueries.js";

import { executeQueryAndGetResultWithoutRes, executeQueryAndGetRows } from "../../utils/dbHandler.js";
const isGeojsonValid = async (geojsonData) => {
  try {
    return gjv.validate(geojsonData);
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
};
const validateProjecton = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const validateWithinPark = async (parkId, features) => {
  try {
    const result = await executeQueryAndGetResultWithoutRes(gisGetMapDataQueries.getParkById, [parkId]);
    const parkInfo = result.rows[0];
    console.log("park_info", parkInfo);
    if (!parkInfo || !parkInfo?.geometry) {
      throw new Error("Invalid park information or missing geometry");
    }

    const parkGeometry = parkInfo?.geometry;
    //console.log("features:",features)
    // Ensure features is an array of GeoJSON features
    if (!Array.isArray(features)) {
      throw new Error("Features must be an array of GeoJSON features");
    }

    // Iterate over each feature and check if it's within the park
    for (const feature of features) {
      console.log("cheking feature", feature, " to ", parkGeometry);
      if (!turf.booleanWithin(feature, parkGeometry)) {
        console.log("enered once");
        return false; // Early return if any feature is not within the park
      }
    }

    return true; // All features are within the park
  } catch (error) {
    console.error("Error validating features within park:", error);
    return false;
  }
};
const validateWithinBlock = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
const validateWithinParcel = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
const convertToCorrectProjection = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
const isThereOverlapOfFeatures = async (layer_name,  features,geom_attribute_name='boundary') => {
  try {
    for (const feature of features) {
      const overlapQuery = `
              SELECT id FROM ${layer_name} 
              WHERE ST_Intersects(ST_GeomFromGeoJSON($1), ${geom_attribute_name});
          `;
      const rows = await executeQueryAndGetResultWithoutRes(overlapQuery, [JSON.stringify(feature.geometry)]);
      if (rows.length > 0) {
        return true; // Overlap found
      }
    }
    return false; // No overlaps found
  } catch (error) {
    console.error("Error checking for overlaps:", error.stack);
    throw error;
  } finally {
    await client.end();
  }
};
// Mock function to ask for user confirmation (replace with actual implementation)
function askUserForConfirmation() {
  return new Promise(resolve => {
      // Here you would ask the user for confirmation, for example through an API or CLI prompt
      setTimeout(() => resolve(true), 1000); // Mock delay for confirmation
  });
}
// Main function to orchestrate the process
async function manageParcels(features, tableName) {
  try {
      const hasOverlap = await checkForOverlaps(features, tableName);
      if (hasOverlap) {
          const confirm = await askUserForConfirmation();
          if (confirm) {
              await replaceOverlappingParcels(features, tableName);
          } else {
              console.log('Insertion cancelled due to overlap.');
          }
      } else {
          // No overlaps, insert all features directly
          for (const feature of features) {
              await client.query(`
                  INSERT INTO ${tableName} (boundary) 
                  VALUES (ST_GeomFromGeoJSON($1))
              `, [JSON.stringify(feature.geometry)]);
          }
          console.log('All new parcels inserted without overlap.');
      }
  } catch (error) {
      console.error('Error managing parcels:', error.message);
  }
}
export default {
  isGeojsonValid,
  validateProjecton,
  validateWithinPark,
  validateWithinBlock,
  validateWithinParcel,
  convertToCorrectProjection,
  isThereOverlapOfFeatures,
};
