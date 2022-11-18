import {  postBalance,getBalance,sendStatus} from "../controllers/balancesController.js";
import { balanceSchemaMd } from "../middlewares/balanceSchemaMiddleware.js";
import { Router } from "express";

const router = Router();

router.post("/balance",balanceSchemaMd, postBalance)
router.get("/balance", getBalance)
router.post("/status", sendStatus)

export default router;