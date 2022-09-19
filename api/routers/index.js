import { Router } from "express";
import { getOperations } from "../controllers/OpController.js";

const router = Router();
const operationRouter = Router();

// Operation Router
operationRouter.get("/", (req, res) => {
  getOperations(req, res);
});

router.get("/", (req, res) => {
  res.send("Welcome to OCP Maintenance API");
});

router.use("/operations", operationRouter);

export default router;
