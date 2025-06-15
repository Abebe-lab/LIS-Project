const addContractor = `INSERT INTO contractor (name, class, license_no, tin_no, origin_country, address_region, address_city,address_subcity, address_woreda, address_house_no, contact_person_name, telephone, email,description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id;`;
const updateContractor = `UPDATE contractor SET name = $1, class = $2, license_no = $3, tin_no = $4, origin_country = $5, address_region = $6, address_city = $7,address_subcity=$8, address_woreda = $9, address_house_no = $10, contact_person_name = $11, telephone = $12, email = $13, description = $14 WHERE id = $15;`;
const deleteContractor = `DELETE FROM contractor WHERE id = $1;`;
const getContractorById = `SELECT * FROM contractor WHERE id = $1;`;
const getAllContractors = ` SELECT * FROM contractor;`;
const addConsultant = `INSERT INTO consultant (name, class, license_no, tin_no, origin_country, address_region, address_city,address_subcity, address_woreda, address_house_no, contact_person_name, telephone, email,description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id;`;
const updateConsultant = `UPDATE consultant SET name = $1, class = $2, license_no = $3, tin_no = $4, origin_country = $5, address_region = $6, address_city = $7,address_subcity=$8, address_woreda = $9, address_house_no = $10, contact_person_name = $11, telephone = $12, email = $13, description = $14 WHERE id = $15;`;
const deleteConsultant = `DELETE FROM consultant WHERE id = $1;`;
const getConsultantById = `SELECT * FROM consultant WHERE id = $1;`;
const getAllConsultants = `SELECT * FROM consultant;`;

export default {
	addContractor,
	updateContractor,
	deleteContractor,
	getContractorById,
	getAllContractors,
	addConsultant,
	updateConsultant,
	deleteConsultant,
	getConsultantById,
	getAllConsultants,
};
