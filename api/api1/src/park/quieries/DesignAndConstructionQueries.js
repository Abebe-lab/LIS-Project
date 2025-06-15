//===================BUILDIG PERMIT
const addBuildingPermit = `INSERT INTO public.building_permit(permit_no, requested_on, request_type, agreement_id, expected_starting_date, expected_finishing_date, consultant_id, contructor_id, owner_commitment_path, contractor_comitment_path, consultant_comitment_path, no_of_residence_bldgs, no_of_commercial_bldgs, no_of_sheds, no_of_other_bldgs, other_bldg_description, modification_details, plan_archtectural_path, plan_structural_path, plan_sanitary_path, plan_electrical_path, plan_electro_mechanical_path,plan_environmental_path, plan_other_path, permit_registered_by, request_registered_on, permit_issued_by, issued_on, status, description)
                                                      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30);`;
const updateBuildingPermit = `UPDATE public.building_permit
                              SET permit_no=$1, requested_on=$2, request_type=$3, agreement_id=$4, expected_starting_date=$5, expected_finishing_date=$6, consultant_id=$7, contructor_id=$8, owner_commitment_path=$9, contractor_comitment_path=$10, consultant_comitment_path=$11, no_of_residence_bldgs=$12, no_of_commercial_bldgs=$13, no_of_sheds=$14, no_of_other_bldgs=$15, other_bldg_description=$16, modification_details=$17, plan_archtectural_path=$18, plan_structural_path=$19, plan_sanitary_path=$20, plan_electrical_path=$21, plan_electro_mechanical_path=$22,plan_environmental_path=$23, plan_other_path=$24, permit_registered_by=$25, request_registered_on=$26, permit_issued_by=$27, issued_on=$28, status=$29, description=$30
                              WHERE id=$31;`;
const deleteBuildingPermit = `DELETE FROM public.building_permit WHERE id=$1 OR permit_no=$2;`;
const getBuildingPermitById = `SELECT * FROM public.building_permit WHERE id=$1;`;
const getBuildingPermitByPermitNo = `SELECT * FROM public.building_permit WHERE permit_no=$1;`;
const getAllBuildingPermits = `SELECT * FROM public.building_permit;`;
//===================OCCUPANCY PERMIT
const addOccupancyPermit = `INSERT INTO public.occupancy_permit(building_permit_id, requested_on,  request_registered_by, description, attached_signed_form)
                                                         VALUES($1, $2, $3, $4, $5);`;
const updateOccupancyPermit = `UPDATE public.occupancy_permit SETpermit_no=$1, requested_on=$2, building_permit_id=$3, request_form_attached_path=$4, request_registered_by=$5, request_registered_on=$6, permit_issued_by=$7, issued_on=$8, status=$9, description=$10 WHERE id=$11;`;
const deleteOccupancyPermit = `DELETE FROM public.occupancy_permit WHERE id=$1 OR permit_no=$2;`;
const getOccupancyPermitById = `SELECT * FROM public.occupancy_permit WHERE id=$1;`;
const getOccupancyPermitByPermitNo = `SELECT * FROM public.occupancy_permit WHERE id=$1;`;
const getAllOccupancyPermits = `SELECT * FROM public.occupancy_permit;`;
const addComment = `INSERT INTO building_permit_Comment(permit_no,commented_by,comment,comment_type) 
 VALUES ($1, $2, $3, $4);`;
const getBuildingPermitReport = `SELECT * FROM view_des_bp_report;`;
export default {
  addBuildingPermit,
  updateBuildingPermit,
  deleteBuildingPermit,
  getBuildingPermitById,
  getBuildingPermitReport,
  getBuildingPermitByPermitNo,
  getAllBuildingPermits,
  addOccupancyPermit,
  updateOccupancyPermit,
  deleteOccupancyPermit,
  getOccupancyPermitById,
  getOccupancyPermitByPermitNo,
  getAllOccupancyPermits,
  addComment,
};
