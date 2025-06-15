import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;
const pool = new Pool({
  database: process.env.DB,
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
});
export default pool;
