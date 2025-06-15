//===================IMPORT SPATIAL DATA//IMPORT PARK BOUNDARY WITH DETAIL
const importBlock = `INSERT INTO public.blocks(id, block_no, park_id, name, boundary, planned_parcels, description, existing_parcels)
	                                      VALUES(get_next_block_no(), get_next_block_no(), get_park_id($1),'N/A', st_geomfromgeojson($1), 0, 'N/A', 0);`;
const importParcel = `INSERT INTO public.parcels(upin, block_no, name, planned_for, current_function, description, boundary, type, no_of_buildings, no_of_planned_buildings, park_id,local_shed_no)
	                                        VALUES(get_new_upin(st_geomfromgeojson($1)), get_block_no(st_geomfromgeojson($1)), 'N/A', 'Not set', 'Not set', 'Not set', st_geomfromgeojson($1), 'N/A', 0, 0,get_park_id(st_geomfromgeojson($1)),$2);`;
const importInfra = `INSERT INTO public.infra_road(geom) VALUES (st_geomfromgeojson($1));`;
const importGreen = `INSERT INTO public.infra_green_area(geom) VALUES (st_geomfromgeojson($1));`;
const importSurvey = `INSERT INTO public.gcp_survey_points(park_id, points, point_no, description)
	                                                  VALUES($1, $2, $3, $4);`;
const importShapeFile = `INSERT INTO public.imported_file( geom, posted_by, feature_name, file_path) 
                                                  VALUES( st_geomfromgeojson($1), $2, $3, $4);`;
const updateSurveys = `UPDATE public.gcp_survey_points SET park_id=$2, points=$3, point_no=$4, description=$5, approved_on=$6 WHERE no=$1;`;
const updateParkInfo = `UPDATE public.parks SET name=$2, region=$3,  description=$4 WHERE id=$1;`;
const updateBlock = `UPDATE public.blocks SET  block_no=$2, name=$3, planned_parcels=$4, existing_parcels=$5, description=$6 WHERE id=$1;`;
const updateParcel = `UPDATE public.parcels SET upin=$1, name=$2, planned_for=$3, current_function=$4, description=$5, type=$6, no_of_planned_buildings=$7, no_of_buildings=$8 WHERE upin=$1;`;
const updateGreenArea=`UPDATE public.infra_green_area SET name=$2, type=$3, description=$4 WHERE id=$1;`
const deleteSurveys = `DELETE FROM gcp_survey_points WHERE  point_no $1;`;

const mergeParcel = `INSERT INTO public.parcels(upin, block_no, name, planned_for, current_function, description, boundary, type, no_of_buildings, no_of_planned_buildings,status)
                    										VALUES (get_new_upin(get_parcel_by_upin($1)::geometry), get_block_no(get_parcel_by_upin($1)), 'N/A', 'Not set', 'N/A', 'Merged', get_merged_feature($1,$2), 'N/A', 0, 0,'Merged');`;
const mergeParcelDeactivate = `UPDATE parcels SET status='DEACTIVE', description=$3 WHERE upin=$1 or upin=$2;`;
const splitParcel = `INSERT INTO public.parcels(upin, block_no, name, planned_for, current_function, description, boundary, type, no_of_buildings, no_of_planned_buildings)
                                        VALUES (get_new_upin(st_geomfromtext(st_astext($1))), get_block_no(st_geomfromtext(st_astext($1))), 'N/A', 'Not set', 'Not set', 'Not set', st_geomfromtext(st_astext($1)), $2, 0, 0);`;
const approveSplitParcel = `UPDATE public.tmp_parcel_to_split SET approved_by=$2, approval_date=$3, approval_description=$4 WHERE id=$1;`;
const splitParcelDeactivate = `UPDATE parcels SET status='DEACTIVATE' WHERE upin=$1;`;
const approveMergeParcel = `UPDATE public.tmp_parcels_to_merge SET approved_by=$2, approval_date=$3, approval_description=$4 WHERE id=$1;`;
const approveMergeParcelUpdate = `UPDATE public.parcels SET name=$3,description=$4,boundary=(SELECT tobe_merged FROM view_unapproved_tobe_merged WHERE upin_1=$id or upin_2=$1) WHERE upin=$1;`;
const saveParcelToMerge=`INSERT INTO public.gis_merge_or_split(park_id, type_of_edit, upin_1, upin_2_to_merge, ordered_by, description, attachment_for_order)
			                                                 VALUES (ipdc_functions.get_park_by_upin($2),$1, $2, $3, $4, $5, $6);`;
const saveParcelToSplit=`INSERT INTO public.gis_merge_or_split(park_id, type_of_edit, upin_1, points_to_split, ordered_by, description, attachment_for_order)
                                                       VALUES (ipdc_functions.get_park_by_upin($2),$1, $2, $3, $4, $5, $6);`;
export default {
  importBlock,
  importParcel,
  importInfra,
  importGreen,
  importSurvey,
  importShapeFile,
  updateParkInfo,
  updateBlock,
  updateParcel,
  updateGreenArea,
  updateSurveys,
  deleteSurveys,
  mergeParcel,
  mergeParcelDeactivate,
  splitParcel,
  approveSplitParcel,
  splitParcelDeactivate,
  splitParcelDeactivate,
  approveMergeParcel,
  approveMergeParcelUpdate,
  saveParcelToMerge,
  saveParcelToSplit,
};
