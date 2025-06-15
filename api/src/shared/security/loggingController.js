import authQueries from "../../park/quieries/authQueries.js";
import utilitiesQueries from "../../park/quieries/utilitiesQueries.js";
import { executeQueryAndGetResult, executeQueryAndGetRows } from "../../park/utils/dbHandler.js";
//import jwt from "jsonwebtoken";

const registerLog = async (res, actionTitle, details, userId) => {
  console.log("[register log started]");
  try {
    return await executeQueryAndGetRows(res, utilitiesQueries.registerLog, [actionTitle, new Date(), details, userId]);
  } catch (err) {
    console.log(err);
    return null;
  }
};
/*function stripHeader(obj) {
  // Create a deep copy of the object to avoid modifying the original
  const copy = JSON.parse(JSON.stringify(obj));

  // Recursively iterate through the object to remove the 'header' property
  function removeHeader(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        console.log("header checking",obj[key]['headers']);
        removeHeader(obj[key]);
      } else if (key === 'headers') {
        console.log("header found and deleted")
        delete obj[key];
      }
    }
  }

  removeHeader(copy);
  return copy;
}*/

const loggingMiddleware = async (req, res, next) => {
  console.log("[Started logging]");
  //--------------skip if LOGIN it has its own solution
  console.log(req.url);
  if (
    req.url === "/api/v1/users/login" ||
    req.url === "/api/v1/users/resetPassword" ||
    req.url === "users/resetPassword" ||
    req.url === "/users/login" ||
    req.url.toString().includes("users/resetPassword") ||
    req.url.toString().includes("users/login") ||
    req.url.toString().includes("/uploads/profilePicture")
  ) {
    console.log("skipping logging");
    return next();
  }
  try {
    console.log("[user id]:", req.userId);
    if (!req.userId) return res.status(401).json({ message: "Unauthorized when logging" });
    // Log the action
    console.log("[starting to call logging]");
    const filteredBody = { ...req.body };
    delete filteredBody.headers;

    const logNo = await registerLog(res, `${req.method} ${req.path}`, JSON.stringify(filteredBody), req.userId || "-1");
    console.log("[LoggingMiddleware] Action logged successfully with log no:", logNo);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      //prettier-ignore
      {status: "error", message: "Internal server error during logging", error: process.env.NODE_ENV === "development" ? error.message : undefined,}
    );
  }
};
const getLogs = async (req, res) => {
  console.log("[GetLogs] Fetching all logs");
  try {
    const result = await executeQueryAndGetResult(res, utilitiesQueries.getLogs);
    console.log(`[GetLogs] Successfully retrieved ${result?.rows?.length} logs`);
    res.json(result.rows);
  } catch (error) {
    console.error("[GetLogs] Error retrieving logs:", error);
    res.status(500).json({
      status: "error",
      message: "Error retrieving logs",
      error: process.env.NODE_ENV === "development" ? error.message : "Error",
    });
  }
};

// Get logs by user ID
const getLogsByUserId = async (req, res) => {
  const userId = req.params.id;
  console.log(`[GetLogsByUserId] Fetching logs for user ${userId}`);
  try {
    const result = await executeQueryAndGetResult(res, utilitiesQueries.getLogsByUserId, [userId]);
    //console.log("[results]", result);
    console.log(`[GetLogsByUserId] Retrieved ${result?.rows?.length} logs for user ${userId}`);
    res.json(result.rows);
  } catch (error) {
    console.error(`[GetLogsByUserId] Error retrieving logs for user ${userId}:`, error);
    res.status(500).json({
      status: "error",
      message: "Error retrieving user logs",
      error: process.env.NODE_ENV === "development" ? error.message : "error",
    });
  }
};
export default { registerLog, loggingMiddleware, getLogs, getLogsByUserId };
