import pool from "../../../db.js";
const executeQuery = async (res, query, params, successMessage = null, notFoundMessage = null) => {
  console.log("[execution started]");
  try {
    const result = await pool.query(query, params);

    if (result?.rowCount === 0) {
      return res.status(201).json({ data: [], message: notFoundMessage || "not found" });
    }
    console.log("[execution successfull]");
    return res.json(result.rows || { message: successMessage || "Successfully executed!" });
  } catch (err) {
    console.log("[erreor in db execution, executeQuery]: ", err.message);
    res.status(500).send(err.message || "Server Error");
  }
};

const executeQueryAndGetRows = async (res, query, params, successMessage = "Executed", notFoundMessage = null) => {
  try {
    const result = await pool.query(query, params);
    //console.log("result", result);
    return result.rows;
  } catch (err) {
    console.log(err.message);
    //return null;
  }
};
const executeQueryAndGetResultWithoutRes = async (query, params) => {
  try {
    const result = await pool.query(query, params);
    return result;
  } catch (err) {
    console.log("[erreor in db execution, executeQueryAndGetResultWithoutRes]: ", err.message);
    throw err;
  }
};
const executeQueryAndGetResult = async (res, query, params, successMessage, notFoundMessage = null) => {
  try {
    const result = await pool.query(query, params);
    //console.log(result);
    return result;
  } catch (err) {
    console.log("[erreor in db execution, executeQueryAndGetResult]: ", err.message);
    // return null;
  }
};

export { executeQuery, executeQueryAndGetRows, executeQueryAndGetResult, executeQueryAndGetResultWithoutRes };
