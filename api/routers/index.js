import { Router } from "express";
import { getLogs, getLogsByDate } from "../controllers/LogController.js";
import {
  getOperations,
  getOperationsByFrq,
  getOperationsById,
  getOperationsByStatus,
  getSuggestionTasks,
  updateOperationStatus,
} from "../controllers/OpController.js";

const router = Router();
const operationRouter = Router();
const logRouter = Router();

// ------------------------------ Operation Router
// get all operations
operationRouter.get("/all", (req, res) => {
  getOperations(req, res);
});

// get operations by frq
operationRouter.get("/frq/:frq", (req, res) => {
  getOperationsByFrq(req, res);
});

// get operation by _id
operationRouter.get("/:id", (req, res) => {
  getOperationsById(req, res);
});

// get operations by status
operationRouter.get("/status/:status", (req, res) => {
  getOperationsByStatus(req, res);
});

// set operation status { taskId, status }
operationRouter.post("/update/status", (req, res) => {
  updateOperationStatus(req, res);
});

// get suggested tasks
operationRouter.get("/today/suggestions", (req, res) => {
  getSuggestionTasks(req, res);
});

// ------------------------------ Log Router
// get all logs
logRouter.get("/all", (req, res) => {
  getLogs(req, res);
});

// add log { taskId, message, date, status }
// logRouter.post("/add", (req, res) => {
//   addLog(req, res);
// });

// get logs by date
logRouter.get("/days", (req, res) => {
  getLogsByDate(req, res);
});

// ------------------------------ Main Router
router.get("/", (req, res) => {
  res.send("Welcome to OCP Maintenance API");
});

router.use("/operations", operationRouter);
router.use("/logs", logRouter);

export default router;
