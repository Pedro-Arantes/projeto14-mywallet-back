import express from 'express';
import cors from 'cors';
import dayjs from 'dayjs';
import joi from "joi";
import { v4 as uuid } from 'uuid';
import usersRouters from "./routes/usersRoutes.js";
import balancesRouters from "./routes/balancesRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());
//Exports
export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
});

export const signInSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
});

export const balanceSchema = joi.object({
    value: joi.string().required(),
    description: joi.string().required(),
    type:joi.string().required()
});
export const token = uuid();
export const day= dayjs().format("DD/MM")


app.use(usersRouters);
app.use(balancesRouters);
app.listen(5000, () => {
    console.log('Running on http://localhost:5000')
});