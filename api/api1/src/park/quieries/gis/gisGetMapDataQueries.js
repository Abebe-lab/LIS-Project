//*************GET SPATIAL DATA
const getParks = `SELECT id, name, region, st_asgeojson(parks.compound_boundary)::json AS geometry, specialization, developed_by, area_on_plan, current_status, description, abbrevation, zone, city, st_asgeojson(parks.center_of_park)::json AS center_of_park, pid, woreda, address, st_area(parks.compound_boundary) as measured_area  FROM public.parks ORDER BY id`;
const getParkById = `SELECT id, name, region, st_asgeojson(parks.compound_boundary)::json AS geometry, specialization, developed_by, area_on_plan, current_status, description, abbrevation, zone, city, st_asgeojson(parks.center_of_park)::json AS center_of_park, pid, woreda, address FROM public.parks WHERE id=$1`;
const getBlocks = `SELECT id, block_no, park_id, name, st_asgeojson(blocks.boundary)::json as geometry, planned_parcels, existing_parcels,description FROM public.blocks WHERE status='ACTIVE'`;
const getBlocksById = `SELECT id, block_no, park_id, name, st_asgeojson(blocks.boundary)::json as geometry, planned_bldgs, description FROM public.blocks WHERE block_no=$1`;
const getParcels = `SELECT * FROM ipdc_functions.view_gis_parcel_summary WHERE status ilike 'ACTIVE' or status ilike 'MERGED' or status ilike 'reserved';`;
const getBuildings = `SELECT block_id, bldg_id, bldg_no, name, st_asgeojson(boundary)::json as geometry,st_area(boundary) as measured_area, description, building_type, if_associated_to_upin, park_id, id, no_of_floors FROM public.building;`;
const getParcelByUPIN = `SELECT * FROM view_gis_parcel_summary WHERE upin=$1`;
const getParcelByOccupancy = `SELECT * FROM public.view_occupied_unoccupied_parcels WHERE status=$1`;
const getUnapprovedMerge = `SELECT * FROM view_gis_parcel_summary WHERE status='MERGED';`;
const getImportedParcels = `SELECT id, st_asgeojson(geom)::json as geometry, posted_by, posted_on, feature_name, file_path FROM public.imported_file`;
const getParcelsWithOnwer = `SELECT * FROM public.view_parcels_with_owners`;
const getParcelsInPark = `SELECT * FROM view_gis_parcel_summary WHERE park_id=$1`;
const getAvailableParcelsInPark = `SELECT * FROM view_gis_parcel_summary WHERE (occupancy_status LIKE 'Vacant') AND park_id=$1`;
//getting
const getRoads = `SELECT park_id, type, description, ST_AsGeoJSON(geom)::json as geometry, id, sub_type, width, name, capacity, unit_of_measure, approved_on, shape_type
	                            FROM public.infra_road;`;
const getGCPs = `SELECT park_id, park_name, gcp_id,geom,description FROM view_gcps_detail;`;
const getWater = `SELECT type, park_id, id, name, shape_type, description, ST_AsGeoJSON(geom)::json as geometry, capacity, unit_of_measure FROM public.infra_water;`;
const getPower = `SELECT type, park_id, id, name, shape_type, description, ST_AsGeoJSON(geom)::json as geometry, output, capacity_to_serve, associated_to_pow_id, unit_of_measure FROM public.infra_power;`;
const getCommunication = `SELECT type, park_id, id, name, shape_type, description, ST_AsGeoJSON(geom)::json as geometry, sub_type, capacity_to_serve, associated_to_comm_id, unit_of_measure FROM public.infra_communication;`;
const getWasteDisposal = `SELECT park_id, id, type, name, shape_type, description, ST_AsGeoJSON(geom)::json as geometry, capacity, unit_of_measure, technology FROM public.infra_waste_disposal;`;
const getStorages = `SELECT park_id, id, type, name, shape_type, description, ST_AsGeoJSON(geom)::json as geometry, capacity, unit_of_measure FROM public.infra_storage;`;
const getParcelOccupancyStatusWithDetail = `SELECT * FROM view_parcel_occupancy_status`;
const getParcelOccupancyStatusWithDetailByUIPN = `SELECT * FROM view_parcel_occupancy_status WHERE upin=$1`;
const getParcelWithDetail = `SELECT * FROM gis_parcels_detail_for_summary;`;
const getParcelsGrouping = `SELECT DISTINCT  nationality_origin, current_function, occupancy_status FROM public.view_gis_parcel_summary;`;
//const getview_gis_parcel_summary
const getSurveys = `SELECT * FROM gcp_survey_points`;
const getSurveysById = `SELECT * FROM gcp_survey_points WHERE  point_no $1`;
const getOtherInfrastructure = `SELECT park_id, type, description, st_asgeojson(geom)::json as geometry, id FROM public.infra_other;`;
const getPlans = `SELECT id, park_id, description,st_asgeojson(geom)::json as geometry, attributes_value FROM public.plans;`;
const getZones = `SELECT park_id, name, description, st_asgeojson(boundary)::json as geometry FROM public.zones;`;
const getSheds = `SELECT upin, status_utilization, st_asgeojson(ST_Transform(st_force3d(geom::geometry),4326))::json as geometry, id,st_area(geom) as measured_area FROM public.sheds;`;
const getGreenArea = `SELECT id, name, st_asgeojson(geom)::json as geometry,type, description FROM infra_green_area`;

const getUnapprovedSpatialData = `SELECT * FROM gis_import_approval WHERE status='NEW';`;
const getUnapprovedSpatialDataByUserId = `SELECT * FROM public.gis_import_approval WHERE status='NEW' AND imported_by=$1;`;
const getUnapprovedSpatialDataById = `SELECT * FROM public.gis_import_approval WHERE status='NEW' AND id=$1;`;
const getUnapprovedSplitAndMergeData=`SELECT * FROM ipdc_functions.gis_view_all_split_and_merge WHERE status='NEW';`;
const getUnapprovedSplitAndMergeDataByUserId=`SELECT * FROM ipdc_functions.gis_view_all_split_and_merge WHERE status='NEW' AND ordered_by=$1;`;

export default {
  getParks,
  getParkById,
  getParcels,
  getSheds,
  getBuildings,
  getParcelsGrouping,
  getParcelByUPIN,
  getParcelsWithOnwer,
  getParcelByOccupancy,
  getParcelsInPark,
  getAvailableParcelsInPark,
  getUnapprovedMerge,
  getImportedParcels,
  getBlocks,
  getBlocksById,
  getRoads,
  getGCPs,
  getWater,
  getPower,
  getCommunication,
  getWasteDisposal,
  getStorages,
  getParcelOccupancyStatusWithDetail,
  getParcelOccupancyStatusWithDetailByUIPN,
  getParcelWithDetail,
  getSurveys,
  getSurveysById,
  getOtherInfrastructure,
  getPlans,
  getZones,
  getGreenArea,
  getUnapprovedSpatialData,
  getUnapprovedSpatialDataByUserId,
  getUnapprovedSpatialDataById,
  getUnapprovedSplitAndMergeData,
  getUnapprovedSplitAndMergeDataByUserId,
};
