const addNewInvestor = `INSERT INTO public.investor( tin_no, company_name, contact_person, phone_no, mobile_no, email, website, nationality_origin, description,contact_person_position,capital,attachment_path)
											VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9,$10, $11,$12) RETURNING id;`;
const addProspectiveInvestor = `INSERT INTO public.eic_potential_investor(tin_no, company_name, contact_person, phone_no, mobile_no, email, website, nationality_origin, description, documents_attached)
														    VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, ARRAY [$10]) returning p_investor_id;`;
const importAgreement = `INSERT INTO contract_agreement(
                                  tenant_id, upin, id, ownership_type, investment_type, 
                                  contract_issued_on, contract_renewal_date, moe_signed_on, production_capacity, handover_date, 
                                  rehandover_date, production_commencement_date, market_destination, intl_brands_link, disposal_method, 
                                  export_capacity, employee_capacity, monthly_rent, grace_period_ending_date, security, 
                                  advance_payment, annual_mngmnt_service_fee, payment_mode, contract_period_in_months, description, 
                                  status, late_charge_fee,  next_payment_expected, last_payment, area_for_calculation,local_parcel_no)
                                  VALUES($1::TEXT, $2::TEXT, $3::TEXT, $4::TEXT, $5::TEXT, 
                                $6, $7, $8, $9::DOUBLE PRECISION, $10, 
                                $11, $12, ARRAY[$13], ARRAY[$14], $15::TEXT, 
                                $16::DOUBLE PRECISION, $17::INTEGER, $18::DOUBLE PRECISION, $19, $20::DOUBLE PRECISION, 
                                $21::DOUBLE PRECISION, $22::DOUBLE PRECISION, $23::TEXT, $24::integer, $25::TEXT, 
                                $26::TEXT, ($27)::JSON, $28, $29, $30,$31) returning id;`;
const addAgreement = `INSERT INTO public.contract_agreement (
                          tenant_id, upin, rrr_id, ownership_type, investment_type, 
                          contract_issued_on, contract_renewal_date, moe_signed_on, production_capacity, handover_date, 
                          rehandover_date, production_commencement_date, market_destination, intl_brands_link, disposal_method, 
                          export_capacity, employee_capacity, monthly_rent, grace_period_ending_date, security, 
                          advance_payment, annual_mngmnt_service_fee, payment_mode, late_charge_fee, contract_period_in_months, 
                          description, linkage,id,mou_attachment) 
													VALUES ($1::TEXT, $2::TEXT, $3::integer, $4::TEXT, $5::TEXT, 
                                $6, $7, $8, $9::DOUBLE PRECISION, $10, 
                                $11, $12, ARRAY[$13], ARRAY[$14], $15::TEXT, 
                                  $16::DOUBLE PRECISION, $17::INTEGER, $18::DOUBLE PRECISION, $19, $20::DOUBLE PRECISION, 
                                  $21::DOUBLE PRECISION, $22::DOUBLE PRECISION,  $23::TEXT, ($24)::JSON, $25::INTEGER, 
                                  $26::TEXT,$27::JSON,$28, $29) RETURNING id;`;
const suspendAgreement = `UPDATE public.contract_agreement SET current_status='SUSPENDED' WHERE agreement_no=$1;`;
const resumeAgreement = `UPDATE public.contract_agreement SET current_status='RESUMED' WHERE agreement_no=$1;`;
const terminateAgreement = `UPDATE public.contract_agreement SET current_status='TERMINATED' WHERE agreement_no=$1;`;
const deleteAgreement = `DELETE FROM public.contract_agreement WHERE agreement_no=$1;`;
const getAgreementByUPINorTINorCompany = `SELECT * FROM public.agreement_with_detail_view WHERE upin=$1 OR id=$1 OR tin_no=$1`;
const getAgreementById = `SELECT * FROM public.agreement_with_detail_view WHERE id=$1`;
const getAgreementsWithDetail = `SELECT * FROM public.agreement_with_detail_view;`;
const getAgreements=`SELECT * FROM public.contract_agreement;`;
const updateAgreement = `UPDATE public.contract_agreement
								SET tenant_id=$2, upin=$3, rrr_id=$4, ownership_type=$5, investment_type=$6, contract_issue=$7, contract_renewal=$8, moe_signed=$9, production_capacity=$10, handover_date=$11, rehandover_date=$12, production_commencement_date=$13, market_destination=$14, intl_brands_link=$15, disposal_method=$16, export_capacity=$17, employee_capacity=$18, monthly_rent=$19, grace_period_ending_date=$20, security=$21, advance_payment=$22, annual_mngmnt_service_fee=$23, payment_mode=$24, late_charge_fee=$25, contract_period=$26, description=$27, agreement_no=$28, linkage=to_json($29) 
								WHERE agreement_no=$1;`;
const updateInvestorInfo = `UPDATE public.investor SET company_name = $2, contact_person = $3, phone_no = $4, mobile_no = $5, email = $6, website = $7, nationality_origin = $8, description = $9 WHERE tin_no = $1;`;
const updateProspectiveInvestorInfo = `UPDATE public.eic_potential_investor SET company_name = $2, contact_person = $3, phone_no = $4, mobile_no = $5, email = $6, website = $7, nationality_origin = $8, description = $9 WHERE tin_no = $1;`;
const deleteInvestorInfo = `DELETE FROM public.investor WHERE tin_no = $1;`;
const deleteProspectiveInvestorInfo = `DELETE FROM public.eic_potential_investor WHERE tin_no = $1;`;

const getInvestorInfoById = `SELECT * FROM public.investor WHERE id = $1;`;
const getProspectiveInvestorInfoByTinNo = `SELECT * FROM public.eic_potential_investor WHERE tin_no = $1;`;
const getInvestorsInfo = `SELECT * FROM public.investor;`;
const getInvestorsByParkAndSector=`SELECT * FROM public.view_report_investor_by_park_and_sector;`;
const getProspectiveInvestorsInfo = `SELECT * FROM public.eic_potential_investor;`;

const addInvestorActivity=`INSERT INTO public.investor_activity(
	              investor_id, recorded_on, employment, export_amount, import_substitution, activity_period_start_from, 
                activity_period_to, description, import, linkage, linkage_money)
	              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING no;`;
const addTerminationRequest=`INSERT INTO public.contract_agreement_termination_request(agreement_id, request_date, reason, description, request_letter_path)
	VALUES ($1, $2, $3, $4, $5) RETURNING no;`;
const getAgreementsByParkId=`SELECT * FROM public.agreement_with_detail_view WHERE park_id=$1;`;
const addPropertyTransfer=`INSERT INTO public.property_transfer(agreement_id, transfered_from, transfered_to, reason, description, date_of_transfer, registered_by, attachment_path)
	                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`;
const getPropertyTransfer=`SELECT * FROM property_transfer;`;
const getPropertyTransferById=`SELECT * FROM property_transfer WHERE id=$1;`;
const getNewAgreementIdByParkId=`SELECT ipdc_functions.get_new_agreement_id($1) as new_id`;

const addAgreementOfEachParcel=`INSERT INTO public.contract_agreement_to_parcel(agreement_id, upin) VALUES ($1,$2);`
export default {
  addAgreement,
  addAgreementOfEachParcel,
  addTerminationRequest,  
  updateAgreement,
  deleteAgreement,
  getAgreements,
  getAgreementsWithDetail,
  getAgreementByUPINorTINorCompany,
  getAgreementById,
  getAgreementsByParkId,
  suspendAgreement,
  resumeAgreement,
  terminateAgreement,
  addInvestorActivity,
  addNewInvestor,
  updateInvestorInfo,
  deleteInvestorInfo,
  getInvestorsInfo,
//  getInvestorInPark,
  getInvestorsByParkAndSector,
  getInvestorInfoById,
  addProspectiveInvestor,
  updateProspectiveInvestorInfo,
  deleteProspectiveInvestorInfo,
  getProspectiveInvestorsInfo,
  getProspectiveInvestorInfoByTinNo,
  addPropertyTransfer,
  getPropertyTransfer,
  getPropertyTransferById,
  getNewAgreementIdByParkId,
};
