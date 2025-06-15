import utilitiesQueries from "../quieries/utilitiesQueries.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { executeQuery, executeQueryAndGetResult, executeQueryAndGetRows } from "../utils/dbHandler.js";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_NAME, //"gmail", // Use Gmail service
  port: process.env.EMAIL_PORT, // Standard Gmail port for secure connections
  secure: false, // Use TLS for secure connection
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const addPreference = async (req, res) => {
  console.log("add preference started...");
  //console.log(req.user);//console.log(req.body);
  try {
    const { userId, darkMode, notificationPreference, preferredLanguage, username, email, phone } = req.body;

    const results = await executeQueryAndGetResult(res, utilitiesQueries.addPreference, [
      userId,
      darkMode,
      notificationPreference,
      preferredLanguage,
    ]);
    if (results) {
      const results2 = await executeQueryAndGetResult(res, utilitiesQueries.updateUserFromPref, [
        userId,
        username,
        email,
        phone,
      ]); //res.status(201).send(results);
      if (results2) {
        console.log("prefrerence created");
        res.send("preference added succesfully!");
      }
    }
  } catch (err) {
    console.log("add preference error...");
    console.log(err.message);
  }
  console.log("add preference finished...");
};
const getPreferences = async (req, res) => {
  console.log("get preference started...");
  try {
    const { id } = req.params;

    const result = await executeQueryAndGetResult(res, utilitiesQueries.getPreferences, [id]);
    //console.log("get preference result...");       //console.log(result);
    if (result) {
      res.send(result.rows);
    }
  } catch (err) {
    console.log(err);
  }
  console.log("get preference finished...");
};
const updatePreference = async (req, res) => {
  console.log("update preference started...");
  //console.log(req.body);
  try {
    const { userId, darkMode, notificationPreference, preferredLanguage, username, email, phone } = req.body;
//console.log(req.body)
    const results = await executeQueryAndGetResult(res, utilitiesQueries.updatePreference, [
      userId,
      darkMode,
      notificationPreference,
      preferredLanguage,
    ]);
    if (results) {
      const results2 = await executeQueryAndGetResult(res, utilitiesQueries.updateUserFromPref, [
        userId,
        username,
        email,
        phone,
      ]);
      if (results2) {
        console.log("prefrerence updated");
        res.send("preference updated succesfully!");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("can't update information, please correct the information");
  }
  console.log("update preference finished...");
};
const deletePreference = async (req, res) => {
  console.log("delete preference started...");
  try {
    const user_id = req.params.user_id;
    const results = executeQueryAndGetResult(res, utilitiesQueries.deletePreference, [user_id]);
    console.log("[Results]", results);
    res.status(200).send("preference deleted succesfully!");
    console.log("preference deleted");
  } catch (err) {
    console.log(err);
    res.status(400).send("can't delete information, please correct the information");
  }
  console.log("delete preference finished...");
};
//======================search
const search = async (req, res) => {
  console.log("search started...");
  try {
    const { term } = req.params;
    console.log(term);

    const results = await executeQueryAndGetResult(
      res,
      `SELECT 'user' as table_name, park_id, department_id, full_name,  email as e1, description,phone FROM users`
    );
    //console.log(results);
    if (results) {
      res.send(results.rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
  console.log("search finished...");
};

const sendEmail = async (to, subject, text) => {
  console.log("api: sending email...");
  const mailOptions = { from: "assefa.samuel@gmail.com", to, subject, text };
  console.log("content", to, subject, text);
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info?.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
  console.log("api: email sent...");
};
const getSystemConfig = async (req, res) => {
  console.log("[get system config] started");
  try {
    const results = await executeQueryAndGetResult(res, utilitiesQueries.getSystemConfig);
    results && res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
  }
  console.log("api: get system config ended");
};
/////////////////////=====================UPDATE

const updateSystemConfig = async (req, res) => {
  console.log("api: update system config started");
  try {
    console.log(req.body);
    const { siteName, maintenanceMode, maxUsers, theme } = req.body;
    if (!req.body) return;
    const results = await executeQueryAndGetResult(res, utilitiesQueries.updateSystemConfig, [
      siteName,
      maintenanceMode,
      maxUsers,
      theme,
    ]);
    res.status(200).send("system config updated succesfully!");
    console.log("system config updated", results);
  } catch (err) {
    console.log(err);
  }
  console.log("api: update system config ended");
};

export default {
  addPreference,
  getPreferences,
  updatePreference,
  deletePreference,
  search,
  getSystemConfig,
  updateSystemConfig,
  sendEmail,
};
/*const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});*/
