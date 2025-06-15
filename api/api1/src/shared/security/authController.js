import pool from "../../../db.js";
import authQueries from "../../park/quieries/authQueries.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import { uploader } from "../../park/utils/uploader.js";
import {
  executeQuery,
  executeQueryAndGetResult,
  executeQueryAndGetRows,
  executeQueryAndGetResultWithoutRes,
} from "../../park/utils/dbHandler.js";
import utilitiesQueries from "../../park/quieries/utilitiesQueries.js";
import loggingController from "./loggingController.js";
import utilitiesController from "../../park/controllers/utilitiesController.js";
//**************REFRESH TOKENS************************ */
//let refreshTokens = [];
const upload = multer({ dest: "uploads/profilePicture" });
//=====================LOGOUT=============================
const logout = async (req, res) => {
  console.log("[api: logout start]");
  try {
    const userId = req.params.id;
    //refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    //prettier-ignore
    const result=await executeQueryAndGetResult(res, authQueries.registerLogs, 
      ["LOGOUT", new Date(),JSON.stringify(req?.body),userId]);
    //console.log("logged out result: ", result);
    return result && res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(501);
  }
  console.log("[api: logout end]");
};
//=======================END LOGOUT===============================
//=======================LOGIN===============================
const loginUser = async (req, res) => {
  console.log("[login started...]");
  const { username, password } = req.body;
  //console.log("un: ",username,"pw:", password);
  try {
    const resultRow = await executeQueryAndGetRows(res, authQueries.doesUsernameExist, [username]);
    //console.log(resultRow);
    const currentUser = resultRow[0];
    if (!currentUser) {
      console.log("user does not exist");
      return res.status(404).json({ message: "Username not in the system, Please try again." });
    }
    const passwordMatch = await bcrypt.compare(password, currentUser.password);
    if (!passwordMatch) {
      console.log("password does not exist");
      return res.status(401).json({ accessToken: null, message: "Invalid password, Please try again." });
    }
    if (currentUser.status.toUpperCase() === "NEW") {
      return res.status(402).json({
        message: "Your access request has not been activated yet, Please inform system admin to activate the user.",
      });
    } else if (currentUser.status.toUpperCase() !== "ACTIVE" && currentUser.status.toUpperCase() !== "RESET") {
      return res.status(403).json({
        message:
          "Your account has been suspended or there may be a system problem, Please contact the system administrator.",
      });
    } /*else if (
      currentUser?.status?.toUpperCase() !== "RESET" &&
      !(await isDeviceAllowed(currentUser?.id, req.headers?.deviceid))
    ) {
      return res.status(404).json({
        message: "The device is not allowed, Please inform system admin to allow the device or use forgot email.",
      });
    }*/
    const user = {
      id: currentUser.id,
      full_name: currentUser.full_name,
      park_id: currentUser.park_id,
      department_id: currentUser.department_id,
      email: currentUser.email,
      username: currentUser.username,
      role: currentUser.role,
      phone: currentUser.phone,
      title: currentUser.title,
      profile_picture: currentUser.profile_picture,
      description: currentUser.description,
      status: currentUser.status,
    };
    await executeQueryAndGetRows(res, utilitiesQueries.registerLog, [
      "LOGIN",
      new Date(),
      { User: currentUser.full_name },
      currentUser.id,
    ]);
    const log = await loggingController.registerLog(res, "LOGIN", { User: currentUser.full_name }, currentUser.id);
    console.log("[logged login]");
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "180m" }); //, { expiresIn: "15m" }
    //const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    //refreshTokens.push(refreshToken); // Add refresh token to the array
    res.status(200).send({ user: user, accessToken: accessToken });
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
};

//==================DELETE USER===============================
const deleteUser = (req, res) => {
  try {
    const userId = req.params.userId;
    pool.query(authQueries.deleteUser, [userId], (error, results) => {
      if (error) console.log(error);
      if (results.rows.length === 0) {
        res.send("no such user");
      }
      res.status(200).send("user deleted succesfully!");
    });
  } catch (error) {
    console.log(error);
  }
};
//=================END DELETE USER=============================//
//*************************REGISTER USER*****************************
// Define file filter and limits
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Invalid file type");
    error.code = "INVALID_FILE_TYPE";
    return cb(error, false);
  }
  cb(null, true);
};
//const upload = uploader('uploads/profilePictures', fileFilter, { fileSize: 5 * 1024 * 1024 }); // 5MB limit
const registerUser = async (req, res) => {
  console.log("[api: registration started]");
  const { park_id, department_id, full_name, gender, email, username, password, description, role, phone, title } =
    req.body;
  //console.log(park_id, department_id, full_name, gender, email, username, password, description, role, phone);
  const profilePicturePath = await uploader(req, "profilePicture");
  try {
    //prettier-ignore
    const userCheckResult = await executeQueryAndGetResult(res, authQueries.checkUserExistence, 
                              [full_name, department_id, email, username ]);
    if (userCheckResult.rows.length > 0) {
      return res.status(400).json("User with this credential(username, email, full name) already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    //prettier-ignore
    const result = await executeQueryAndGetResult(res, authQueries.registerUser, 
      [ park_id, department_id, full_name, gender, email, phone, username, hashedPassword, role, description, profilePicturePath, title,]);

    const newUser = result.rows[0];
    // Generate a JWT token for the newly registered user //const accessToken = generateAccessToken(newUser);//const refreshToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET);
    //prettier-ignore
    const execRes = await executeQueryAndGetResult( res, authQueries.alertForAdminAboutConfirmation,
      [newUser.full_name], "Successful");
    //    console.log(execRes);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    if (error.code === "INVALID_FILE_TYPE") {
      return res.status(400).json({ error: "Invalid file type. Only JPEG and PNG are allowed." });
    }
    res.status(500).json({ error: error.message });
  } finally {
    console.log("api: user registration finsihed");
  }
};
//*************************END REGISTER USER*************************

//=================GET USERS=============================//
const getUsers = async (req, res) => {
  try {
    const results = await executeQueryAndGetResult(res, authQueries.getUsers);
    return res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
  }
};
const getUsersSummary = async (req, res) => {
  try {
    const results = await executeQueryAndGetResult(res, authQueries.getUsersSummary);
    return res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (req, res) => {
  console.log("[get users by id started]");
  try {
    const id = req.params.id;
    const results = await executeQueryAndGetResult(res, authQueries.getUserById, [id]);
    return res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
  }
  console.log("[get users by id finished]");
};
//=================END GET USERS===========================//
const changePassword = async (req, res) => {
  console.log("[api: change password started]");
  try {
    const { userId, newPW, deviceInfo } = req.body;
    if (newPW === "" || !newPW) return;
    const hashedPassword = await bcrypt.hash(newPW, 10);
    //    console.log(hashedPassword);
    const result = await executeQueryAndGetResult(res, authQueries.changePassword, [userId, hashedPassword]);
    if (result) {
      console.log("[change password params]", req.params);
      console.log("[change password body]", req.body);
      const result2 = await executeQueryAndGetResult(res, authQueries.saveAllowedDevices, [
        userId,
        deviceInfo,
        deviceInfo?.deviceId,
      ]);
      console.log(result2);
      res.status(200).send("password changed succesfully!");
    }
  } catch (err) {
    console.log(err);
    // res.status(401).send("error on saving!"+err);
  }
  console.log("[api: change password finished]");
};
const getSystemLog = (req, res) => {
  console.log("get system log started");
  try {
    pool.query(authQueries.getSystemLog, (error, results) => {
      if (error) console.log(error);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
  }
  console.log("get system log finished");
};

const activateDeactivateUser = async (req, res) => {
  const { id } = req.params;
  console.log("api: activate user started for ", id);
  const result = await executeQuery(res, authQueries.activateDeactivateUser, [id]);
  console.log("api: activate user finished");
};
const resetCompleted = async (req, res) => {
  console.log("api: restting completed started for  user ", id);
  try {
    const { id } = req.params;
    /*const result=executeQueryAndGetRows(res, authQueries.resetCompleted, [id]);
    if(result){

    }*/
    pool.query(authQueries.resetCompleted, [id], (error, results) => {
      if (error) console.log(error);
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.log(err);
  }
  console.log("api: resetting");
};
const resetPassword = async (req, res) => {
  console.log("api: reset password started...");
  try {
    let email = req.body.email;
    if (!email || email.length === 0) email = req.params.email;
    const user = await executeQueryAndGetRows(res, "SELECT * FROM users WHERE email=$1", [email]);
    if (!user || user?.length === 0) {
      console.log(`No user with ${email} exists in the system, Please check the email and try again.`);
      return res.status(401).json({
        message: `No user with ${email} exists in the system, Please check the email and try again.`,
      });
    }
    const randomPassword = Math.random().toString(36).slice(2, 10);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    utilitiesController.sendEmail(
      email,
      "IPDC-LIS: Password Reset",
      `A new password has been generated for your IPDC-LIS account: ${randomPassword}. Please remember to change this password as soon as you log in.`
    );
    const updatedUserInfo = await executeQuery(res, `UPDATE users SET password=$2, status='RESET' WHERE id=$1;`, [
      user[0].id,
      hashedPassword,
    ]);
    if (updatedUserInfo) {
      //res.send("Seuccesfully updated password");
    }
  } catch (error) {
    console.log(error);
  }
  console.log("api: reset password finished...");
};
const isDeviceAllowed = async (userId, deviceInfoProvided) => {
  console.log("[Checking is device allowed]");
  //note: allowed all devices registered on db to access
  try {
    const usersDevices = await executeQueryAndGetResultWithoutRes(authQueries.getUserDevices, [deviceInfoProvided]); //userId,
    // console.log("[usersDevice]", "user id: "+userId,"Device: "+ deviceInfoProvided, usersDevices.rowCount);
    return !!usersDevices.rowCount;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export default {
  loginUser,
  logout,
  registerUser,
  activateDeactivateUser,
  deleteUser,
  getUsers,
  getUsersSummary,
  getUserById,
  changePassword,
  getSystemLog,
  upload,
  resetCompleted,
  resetPassword,
};
