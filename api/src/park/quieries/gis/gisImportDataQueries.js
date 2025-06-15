const importBlock = `INSERT INTO public.blocks(id, block_no, park_id, name, boundary, planned_parcels, description, existing_parcels)
                                       VALUES (get_next_block_no(), COALESCE($2, get_next_block_no()), get_park_id($1), 'N/A', ST_GeomFromGeoJSON($1::json), 0, 'N/A', 0);`;
const importParcel = `INSERT INTO public.parcels(upin, block_no, name, planned_for, current_function, description, boundary, type, no_of_buildings, no_of_planned_buildings, park_id,local_shed_no)
                                             VALUES (get_new_upin(ST_GeomFromGeoJSON($2::json)), get_block_no(ST_GeomFromGeoJSON($2::json)), 'N/A', 'Not set', 'Not set', 'Not set', ST_GeomFromGeoJSON($2::json), 'N/A', 0, 0,get_park_id(ST_GeomFromGeoJSON($2::json)), $1);`;
const importBuilding = `INSERT INTO public.building(park_id,boundary) VALUES ($1,ST_GeomFromGeoJSON($2::json))`;
const importShed = `INSERT INTO public.sheds(upin, shed_id,geom) 
                                      VALUES (get_upin_by_location(ST_GeomFromGeoJSON($1)),$2,ST_GeomFromGeoJSON($1)) returning id;`;
const importRoad = ``;
const importInfrastructure = `INSERT INTO public.infra_$8(park_id, type, name, description, geom, capacity, unit_of_measure)
                            VALUES ($1, $2, $3, $4, ST_GeomFromGeoJSON($5::json), $6, $7)  returning id;`;
const importTheRest = `INSERT INTO public.${2}(geom) VALUES (ST_GeomFromGeoJSON($1::json))`;
const saveUnapprovedSpatalData = `INSERT INTO gis_import_approval(imported_by, file_path, feature_name,layer_name, park_id,category) VALUES ($1, $2, $3, $3,$4,$5);`;
const saveApproval = `UPDATE public.gis_import_approval SET approved_on=now(), approved_by=$2, approval_comment=$3, attachment_for_approval=$4 WHERE id=$1;`;
const getImportedForApproval = `SELECT * FROM public.gis_import_approval WHERE id=$1;`;
const getUnapprovedSpatialData = `SELECT * FROM gis_import_approval WHERE status='NEW';`;
const deleteUnapprovedImport = `DELETE FROM public.gis_import_approval WHERE id=$1;`;
const approveImports = `UPDATE public.gis_import_approval SET approved_on=now(), approved_by=$2, status='APPROVED' WHERE id=$1;`;
const declineImport = `UPDATE public.gis_import_approval SET approved_on=now(), approved_by=$2, status='DECLINED' WHERE id=$1;`;
const diableOverlappedParcel=`UPDATE public.parcels SET status='DISABLED' WHERE ST_Intersects(ST_GeomFromGeoJSON($1), boundary)`;
export default {
  importBlock,
  importParcel,
  importBuilding,
  importShed,
  importRoad,
  importInfrastructure,
  importTheRest,
  saveUnapprovedSpatalData,
  saveApproval,
  getImportedForApproval,
  getUnapprovedSpatialData,
  deleteUnapprovedImport,
  approveImports,
  declineImport,
  diableOverlappedParcel,
};
