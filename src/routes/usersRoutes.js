import { postUser,loginUser,deleteSession } from "../controllers/usersController.js";

import { Router } from "express";
import { signUpSchemaMd } from "../middlewares/signUpSchemaMiddleware.js";
import { signInSchemaMd } from "../middlewares/signInSchemaMiddleware.js";

const router = Router();

router.post("/sign-up", signUpSchemaMd, postUser)
router.post("/sign-in", signInSchemaMd,loginUser)
router.delete("/delete", deleteSession)

export default router;