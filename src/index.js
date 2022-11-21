import express from 'express';
import cors from 'cors';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import usersRouters from "./routes/usersRoutes.js";
import balancesRouters from "./routes/balancesRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());

//Exports
export const token = uuid();
export const day= dayjs().format("DD/MM")


app.use(usersRouters);
app.use(balancesRouters);
app.listen(5000, () => {
    console.log('Running on http://localhost:5000')
});