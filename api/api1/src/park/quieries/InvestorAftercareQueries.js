/*const importAgreement = `SELECT fun_insert_contract_agreement(
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, ARRAY[$16], 
      ARRAY[$17], $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31,$32
    );`;*/
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
const getPaymentSchedule=`SELECT * FROM public.contract_agreement_payment_schedule WHERE agreement_id=$1;`;
const getUpinFromShedNo=`SELECT upin FROM parcels WHERE park_id = $1 AND local_shed_no=$2;`;
const getUpinFromShedNoAndParkName=`SELECT par.upin
                                          FROM parks p
                                          INNER JOIN parcels par ON p.id = par.park_id
                                          WHERE p.name ILIKE '%' || $1 || '%'
                                            AND par.local_shed_no=$2;`;
const getTenantIdFromName=`SELECT id FROM investor WHERE company_name ILIKE '%' || $1 || '%';`;
const getParkIdFromName=`SELECT id FROM parks WHERE name ILIKE '%' || $1 || '%';`;
const importCollection = `INSERT INTO public.fin_payment(invoice_no, agreement_id, amount, payment_date, payment_type, bank_name, reference_no, description, if_late_penality_interest_amount, recieved_by)
	                                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
const importTenant = `INSERT INTO public.investor(id, tin_no, company_name, contact_person, phone_no, mobile_no, email, website, nationality_origin, description,contact_person_position,capital)
							                    				VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12);`;
const saveInitialActivities=`INSERT INTO public.investor_activity(investor_id, employment, export_amount, import_substitution, activity_period_start_from, activity_period_to, import, linkage,linkage_money, description)
	                                                        VALUES (ipdc_functions.get_investor_by_agreement_id($1),$2, $3, $4, $5, $6, $7, $8, $9, 'INITIAL VALUE') returning no;`
const isAgreementImported=`SELECT count(id)	FROM public.contract_agreement WHERE id=$1;`;
const importAgreementPaymentSchedule=`INSERT INTO 
          public.contract_agreement_payment_schedule(agreement_id, from_year_or_date, to_yr_or_date, value)
	        VALUES ($1, $2, $3, $4);`;
export default {
  importTenant,
  importAgreement,
  importAgreementPaymentSchedule,
  getPaymentSchedule,

  importCollection,
  getUpinFromShedNo,
  getUpinFromShedNoAndParkName,
  getTenantIdFromName,
  getParkIdFromName,
  saveInitialActivities,
  isAgreementImported,
};
