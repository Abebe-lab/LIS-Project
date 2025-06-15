import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import router from "./src/park/routes.js";
import logRouter from "./src/park/routes/logRoutes.js";
import loggingController from "./src/shared/security/loggingController.js";
import authJwt from "./src/shared/security/authJwt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;
//for testing only
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000", "https://lis.ipdc.gov.et"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "deviceid", "deviceId"],
  })
);

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router.use("/uploads", express.static(path.join(__dirname, "uploads")));
router.use(express.static(path.join(__dirname, "client")));

app.get("/", (req, res) => res.send("Welcome to IPDC-LIS, This is a secure site and needs authentication to access."));

app.use("/api/v1/", authJwt.verifyToken,loggingController.loggingMiddleware, router);
app.use(loggingController.loggingMiddleware);
app.use("/api/v1/logs", logRouter);

app.listen(PORT, "0.0.0.0", () => console.log(`app listening on port ${PORT}`));

