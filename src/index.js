import { postUser, loginUser } from "./controllers/usersController.js";
import { postBalance, getBalance,sendStatus } from "./controllers/balancesController.js";
import express from 'express';
import cors from 'cors';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import dayjs from 'dayjs';
import joi from "joi";
import { v4 as uuid } from 'uuid';


dotenv.config();
const app = express();
const mongoClient = new MongoClient(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

try {
    await mongoClient.connect();

} catch (error) {
    console.log(error)
}

const db = mongoClient.db("MyWallet_DB");

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
export const users = db.collection("users")
export const sessions = db.collection("sessions")
export const balances = db.collection("balances")
export const time = dayjs().format("HH:mm:ss")

app.post("/sign-up", postUser)
app.post("/sign-in", loginUser)
app.post("/balance", postBalance)
app.get("/balance", getBalance)
app.post("/status", sendStatus)


app.listen(5000, () => {
    console.log('Running on http://localhost:5000')
});