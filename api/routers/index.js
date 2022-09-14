import { Router } from "express";
import { getOperations } from "../controllers/OpController.js";

const router = Router();
const operationRouter = Router();

// Operation Router
operationRouter.get("/", (req, res) => {
  getOperations(req, res);
});

router.use("/operations", operationRouter);

export default router;
