//================USER MANAGEMENT-
//AUTHENTICATION
const checkUserExistence = `SELECT id FROM users WHERE (full_name=$1 AND department_id=$2) OR email=$3 OR username=$4`;
const registerUser = `INSERT INTO public.users(park_id, department_id, full_name, gender, email,phone, username, password, role, description,  profile_picture, title)
	                                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12) RETURNING id;`;
const alertForAdminAboutConfirmation = `INSERT INTO public.message_inhouse(
  title, description, status, response_for, sent_from, sent_to)
VALUES ('New User Requered Confirmation','New User Requered Confirmation for $1','Pending',-1,1,(SELECT id FROM users WHERE department = 'SA' AND role = 'head'));`;
//    HO, , 1, Elilta Tadele, female, eliltatadele@gmail.com, head of ict, null, sa, Head, $2b$10$v5iAb9yxviRn5lHPw8mawezc3OzOy1bfYskxc2RbPPrGaF093m6nW, null, NEW, 2
const doesUsernameExist = "SELECT * FROM users WHERE username = $1";
//UPDATE USER
const updateUser = `UPDATE users SET park_id=$2, department_id=$3, full_name=$4, gender=$5, email=$6, username=$7, password=$8, description=$9, role=$10, phone=$11 WHERE users.id=$1`;
//DELETE USER
const deleteUser = "DELETE FROM public.users WHERE id=$1";
//GET USER/s
const getUsers = `SELECT * FROM view_user_full_details;`;
const getUsersSummary = `SELECT * FROM view_sa_user_summary;`; //`SELECT case when park_id='000' then 'HO' else park_id end as park_id, department_id, id,title, full_name, gender, email, phone, role, description,profile_picture, status From users`;
const getUserById = "SELECT * FROM view_user_full_details WHERE id = $1";
//================END USER MANAGEMENT
//===================DEPARTMENT
const checkDepartmentExists = `SELECT id FROM department WHERE name=$1 AND park_id=$2`;
const registerDepartment = `INSERT INTO public.department(id, name, park_id, description) VALUES ($1,$2, $3, $4)`;
const updateDepartment = `UPDATE department SET name=$2, park_id=$3, description=$4 WHERE id=$1`;
const deleteDepartment = `DELETE FROM department WHERE id=$1`;
const getDepartments = `SELECT * FROM department`;
const getDepartmentById = `SELECT * FROM department WHERE id = $1`;
const changePassword = `UPDATE users SET password=$2, status = CASE
                                                                WHEN status = 'RESET' THEN 'active'
                                                                ELSE status
                                                              END
                        WHERE id=$1`;
const resetCompleted = `UPDATE users SET status='active' WHERE id=$1`;
const getSystemLog = `SELECT * FROM public.view_sa_user_logs ORDER BY action_time DESC `;
const activateDeactivateUser = `UPDATE users
SET status = CASE
    WHEN status = 'active' THEN 'inactive'
    WHEN status = 'NEW' THEN 'RESET'
    WHEN status!='RESET' then 'active'
    ELSE status
END
WHERE id = $1;`;

//************CHECK COMPUTER */
const saveAllowedDevices = `INSERT INTO public.users_devices(user_id, device_info,device_id) VALUES ( $1, $2,$3) RETURNING id;`;
const getUserDevices = `SELECT device_info FROM users_devices WHERE device_id=$1;`; //user_id = $1 AND
const registerLogs = `INSERT INTO public.user_logs( action, "timestamp", details, user_id) VALUES ($1, $2, $3,$4);`;
export default {
  checkUserExistence,
  registerUser,
  alertForAdminAboutConfirmation,
  getUsers,
  getUsersSummary,
  getUserById,
  doesUsernameExist,
  updateUser,
  activateDeactivateUser,
  deleteUser,
  checkDepartmentExists,
  registerDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartments,
  getDepartmentById,
  changePassword,
  getSystemLog,
  resetCompleted,
  saveAllowedDevices,
  getUserDevices,
  registerLogs,
};
