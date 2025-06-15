//==========================NEW ID
const getBlockNo = `SELECT block_no FROM blocks st_intersects(boundary,st_geomfromgeojson($1));`;
const getLastUPIN = `SELECT count(upin) FROM parcels where block_no=$1`;
//==========================END NEW ID
//==================CHECK STATEMENTS
const checkBlockNoExists = `SELECT block_no FROM blocks WHERE block_no=$1`;
//==================END CHECK STATEMENTS
const loggingQueries = "INSERT INTO user_logs (user_id, action, details) VALUES ($1, $2,$3)";
const getReferredStatus = `SELECT request_no, p_inv_id, tin_no, company_name, contact_person, phone_no, email, nationality_origin, request_date, purpose, description, status
	FROM public.view_eic_request_with_detail;`;
const getInfrastructures = `SELECT park_id, type, description, st_asgeojson(geom)::json as geometry, id FROM public.infra_road`;
//========================== END GET STATEMENTS

//========================== POST STATEMENTS(add/insert statements)

const addBlockInfo = `UPDATE public.blocks SET block_no=$2, name=$3,  planned_parcels=$4, description=$5, existing_parcels=$6 WHERE id=$1;`;
const addParcelInfo = `UPDATE public.parcels SET name=$2, planned_for=$3, current_function=$4, description=$5, type=$6, no_of_buildings=$7, no_of_planned_buildings=$8 WHERE upin=$1;`;
const referToIPDC = `INSERT INTO public.eic_request_to_ipdc(p_inv_id, request_date, purpose, approved_request_form, associated_documents, description, tin_no)
	                                                      VALUES ($1, $2, $3, $4, ARRAY[$5], $6, $7);`;
const assignParcel = `INSERT INTO public.tenant_to_parcel(agreement_id, parcel_upin, agreed_on, agreement_type, used_for, monthly_payment, perit_date, expected_permit_completion_date, expected_start_date, status, tenant_id) 
                                                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
const parcelToBeMerged = `SELECT st_astext(
                                    st_union(
                                        (SELECT st_astext(boundary) FROM blocks WHERE id=$1)::geometry ,
                                        (SELECT st_astext(boundary) FROM blocks WHERE id=$2)::geometry)
                                      ) as new_parcel`;

//approve merge
const splittedParcels = `SELECT (ST_Dump(get_splitted_parcels($1,$2,$3,$4,$5))).geom as splitted_data`;
//========================== END POST STATEMENTS(update statements)
//========================== DELETE STATEMENTS
const deleteBlock = `DELETE FROM blocks WHERE block_no=$1`;
const deleteParcel = `DELETE FROM parcels where upin=$1`;
const deleteTempFeture = `DELETE FROM imported_file WHERE id=$1`;
//========================== END DELETE STATEMENTS
export default {
  getReferredStatus,
  checkBlockNoExists,
  addBlockInfo,
  addParcelInfo,
  referToIPDC,
  assignParcel,
  deleteBlock,
  deleteParcel,
  parcelToBeMerged,
  deleteTempFeture,
  splittedParcels,
  getInfrastructures,
  getBlockNo,
  getLastUPIN,
  loggingQueries,  
};
