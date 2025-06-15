//import "dotenv/config"; //https://www.npmjs.com/package/dotenv
import pool from "../../../db.js";
import DepartmentQueries from "../../park/quieries/DepartmentQueries.js";
import { executeQuery} from "../../park/utils/dbHandler.js";

//=================DEPARTMENTS (REGISTER, GET DEPARTMENTS, GET DEPARTMENTS BY ID)
const registerDepartment = async (req, res) => {
  console.log("[department registration started...]");
  let departmentExists = false;
  try {
    const { id, name, park_id, description, abbrevation } = req.body;
    pool.query(DepartmentQueries.checkDepartmentExists, [name, park_id], (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results && results.rowCount !== 0) {
        console.log("Department already registered!");
        res.status(200).send("Department already registered!");
      } else {
            // Added abbreviation field
        pool.query(DepartmentQueries.registerDepartment, [id, name, park_id, description, abbrevation], (error, results) => {
          if (error) {
            console.log(error);
            res.status(error);
          }
          res.status(201).send("department added succesfully!");
          console.log("[registration successful!]");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("error on saving!");
  }
};
const getDepartmentById = async (req, res) => {
  try {
    const id = req.params.id;
    return await executeQuery(res, DepartmentQueries.getDepartmentById, [id]);
  } catch (err) {
    console.log(err);
  }
};
const getDepartments = (req, res) => {
  try {
    pool.query(DepartmentQueries.getDepartments, (error, results) => {
      if (error) console.log(error);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
  }
};
const updateDepartment = async (req, res) => {
  const departmentId = req.params.userId;
  try {
    const { name, park_id, description } = req.body;
    console.log(req.body);
    await pool.query("BEGIN");
    pool.query(
      DepartmentQueries.updateDepartment,
      [departmentId, name, park_id, description],
      async (error, results) => {
        if (results) {
          await pool.query("COMMIT");
          res.status(201).send("park added succesfully!");
          console.log("department created");
        } else {
          await pool.query("ROLLBACK");
          res.status(400).send("can't update information, please correct the information");
          console.log("no result");
        }
      }
    );
  } catch (err) {
    await pool.query("ROLLBACK");
    console.log("=========error caugth======");
    console.log(err);
  }
};

const deleteDepartment = (req, res) => {
  try {
    const departmentId = req.params.userId;
    pool.query(DepartmentQueries.deleteDepartment, [departmentId], (error, results) => {
      if (error) console.log(error);
      if (results.rows.length === 0) {
        res.send("no such department");
      }
      res.status(200).send("department deleted succesfully!");
    });
  } catch (err) {
    console.log(err);
  }
};
export default {
  registerDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartments,
  getDepartmentById,
};


