const addPreference = `INSERT INTO user_preference (user_id, enable_dark_mode, notification_preference, preferred_language)
    VALUES ($1, $2, $3, $4)ON CONFLICT (user_id) DO UPDATE 
    SET 
      enable_dark_mode = $2,
      notification_preference = $3,
      preferred_language = $4;`;

const updateUserFromPref = `UPDATE users SET username = $2, email = $3, phone = $4 WHERE id = $1`;
const getPreferences = `SELECT * FROM user_preference WHERE user_id=$1`;
const updatePreference = `UPDATE user_preference SET enable_dark_mode=$2, notification_preference=$3, preferred_language=$4 WHERE user_id=$1;`;
const deletePreference = `DELETE FROM user_preference WHERE user_id=$1`;
//search
const search = `SELECT "user" as table_name, park_id, department_id, full_name,  email as e1, description,phone FROM users`; 
const registerLog = `INSERT INTO public.user_logs( action, "timestamp", details, user_id) VALUES ($1, $2, $3,$4) returning id;`;
const getLogsByUserId = `SELECT * FROM user_logs WHERE user_id = $1 ORDER BY timestamp DESC`;
const getLogs=`SELECT * FROM user_logs ORDER BY timestamp DESC`;
const getSystemConfig=`SELECT * FROM public.system_config`;
const updateSystemConfig = `UPDATE public.system_config SET site_name=$1, maintainance_mode=$2, max_users=$3, theme=$4`;
export default {
  addPreference,
  updateUserFromPref,
  getPreferences,
  updatePreference,
  deletePreference,
  search,
  registerLog,
  getLogsByUserId,
  getLogs,
  getSystemConfig,
  updateSystemConfig,
};