const registerCollection = `INSERT INTO public.fin_payment(invoice_no, agreement_id, amount, payment_date, payment_type, bank_name, reference_no, description, if_late_penality_interest_amount, recieved_by, payment_period,arrear_skipped_amount,arrear_skipping_description,references_path)
	                                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13,$14);`;
//agreement_id	invoice_no	collection_date	collection_type	bank_name	reference_no	amount	penality	description	next payment
const updateNextPaymentDate = `UPDATE public.contract_agreement SET next_payment_expected=$1 WHERE id=$2;`;
const deleteCollection = `DELETE FROM public.fin_payment WHERE id=$1;`;
const getCollections = `SELECT * FROM public.fin_payment;`;
const updateCollection = `UPDATE public.fin_payment SET invoice_no=$2, agreement_id=$3, amount=$4, payment_date=$5, payment_type=$6, bank_name=$7, reference_no=$8, description=$9, if_late_penality_interest_amount=$10, recieved_by=$11 WHERE id=$1`;
//rules
const registerFinanceRule = `INSERT INTO public.fin_fee_rules(title, fee_calculation_type, amount, description, attachment)
                                                        VALUES($1, $2, $3, $4, $5)RETURNING no`;
const getFinanceRules = `SELECT * FROM public.fin_fee_rules`;
const updateFinanceRule = `UPDATE public.fin_fee_rules SET title=$2, fee_calculation_type=$3, amount=$4, description=$5, attachment=$6 WHERE no=$1;`;
const deleteFinanceRule = `DELETE FROM public.fin_fee_rules WHERE no=$1;`;
//rental rates
const registerRentalRate = `INSERT INTO public.fin_rental_rate(park_id, type_of_property, "from", "to", description, adjusted_by, park_name, amount)
	                                                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
const getRentalRates = `SELECT * FROM public.fin_rental_rate;`;
const updateRentalRate = `UPDATE public.fin_rental_rate SET park_id=$2, type_of_property=$3, "from"=$4, "to"=$5, description=$6, adjusted_by=$7, amount=$8 WHERE no=$1;`;
const deleteRentalRate = `DELETE FROM public.fin_rental_rate WHERE no=$1;`;
//lease rates
const registerLeaseRate = `INSERT INTO public.fin_lease_rate(park_id, type_of_property, "from", "to", description, adjusted_by, amount)
	                                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING no;`;
const getLeaseRates = `SELECT * FROM public.fin_lease_rate;`;
const updateLeaseRate = `UPDATE public.fin_lease_rate SET park_id=$2, type_of_property=$3, "from"=$4, "to"=$5, description=$6, adjusted_by=$7, amount=$8 WHERE no=$1;`;
const deleteLeaseRate = `DELETE FROM public.fin_lease_rate WHERE no=$1;`;

export default {
  registerCollection,
  getCollections,
  updateCollection,
  deleteCollection,
  registerFinanceRule,
  getFinanceRules,
  updateFinanceRule,
  deleteFinanceRule,
  registerRentalRate,
  getRentalRates,
  updateRentalRate,
  deleteRentalRate,
  registerLeaseRate,
  getLeaseRates,
  updateLeaseRate,
  deleteLeaseRate,
  updateNextPaymentDate,
};
