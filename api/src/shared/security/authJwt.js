import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  //console.log("[url]", req.url);//console.log("[headers]",req.headers);
  const publicRoutes = ["/api/v1/users/login", "/api/v1/users/resetPassword", "/users/resetPassword", "/users/login"];
  if (publicRoutes.includes(req.url) || req.url.toString().includes("/uploads/profilePicture")) {
    return next();
  }
  let authHeader = req?.headers?.authorization;
  if (!authHeader) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "The session may have expired, Please log out and log in again!",
        code: "TOKEN_EXPIRED",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
const authJwt = {
  verifyToken: verifyToken,
};
export default authJwt;
