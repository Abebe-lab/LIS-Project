import { Router } from "express";
import jwt from "jsonwebtoken";
//to verify mac address
import requestIp from "request-ip";
import getMac from "getmac";
import authQueries from "../quieries/authQueries.js";
import { executeQueryAndGetResult } from "../utils/dbHandler.js";
//import getClientMacAddress from "../utils/getClientMacAddress.js";

const router = Router();

const authenticateToken = (req, res, next) => {
  //console.log("api: authenticate token started");
  try {
    //console.log(req.headers);
    const authHeader = req.headers.authorization;
    //console.log(authHeader,"\n");
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token, "\nuser\n");
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log("Authentication faliled: ", err);
        return res.sendStatus(403);
      }
      req.user = user; //decoded user
      console.log("user\n", req.user);
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
  console.log("api: authenticate token finished");
};

router.use(async (req, res, next) => {
  console.log("api: checking device access started")
  const clientIp = requestIp.getClientIp(req);
  const macAddress = await getClientMacAddress(); // Implement a way to get MAC address from the client

  const isAllowed = await checkDeviceAccess(macAddress, clientIp);
  if (!isAllowed) {
      return res.status(403).json({ error: 'Access Denied: Unauthorized device' });
  }
  console.log("api: checking device access finished")
  next();
});

// Middleware to get the IP address
router.use((req, res, next) => {
  console.log("api: getting ip address started")
  const clientIp = requestIp.getClientIp(req); // On most environments returns IPv4/IPv6 address
  console.log("ipd address", clientIp);
  req.clientIp = clientIp;
  console.log("api: getting ip address finished")
  next();
});

/*const clientMac=getMac((err, macAddress) => {
  try {
    if (err) {
      throw new Error("Unable to get MAC address");
    }
    console.log(macAddress);  
  } catch (error) {
    
  }
  
});*/
const checkDeviceAccess = async (macAddress, ipAddress) => {
  //console.log("api: checking device access started!")
  try {
    const result = await executeQueryAndGetResult(authQueries.checkDeviceAccess, [macAddress, ipAddress]);

    if (result?.rows?.length > 0) {
      // Allow access
      return true;
    } else {
      // Deny access
      return false;
    }  
  } catch (error) {
    console.log(error);
  }
  
  //console.log("api: checking device access finsihed!")
};

export default { authenticateToken, checkDeviceAccess };
