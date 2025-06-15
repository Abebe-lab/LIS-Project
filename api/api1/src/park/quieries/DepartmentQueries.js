const checkDepartmentExists = `SELECT id FROM department WHERE name=$1 AND park_id=$2`;
const registerDepartment = `INSERT INTO public.department(id, name, park_id, description, abbrevation) VALUES ($1,$2, $3, $4, $5)`;
const updateDepartment = `UPDATE department SET name=$2, park_id=$3, description=$4 WHERE id=$1`;
const deleteDepartment = `DELETE FROM department WHERE id=$1`;
const getDepartments = `SELECT * FROM department`;
const getDepartmentById = `SELECT * FROM department WHERE id = $1`;

export default {
  checkDepartmentExists,
  registerDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartments,
  getDepartmentById,
};
