import {  balances,  sessions, users} from "../database/db.js"
import {day } from "../index.js";

export async function postBalance(req, res) {

    const { value, description, type } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if (!token) return res.sendStatus(401);
    try {
        const session = await sessions.findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }

        let user = await users.findOne({
            _id: session.userId
        })
        if (!user) return res.sendStatus(401);
        const userId = session.userId
        user = user.name
        const obj = {
            user,
            value,
            description,
            type,
            day,
            userId 
        }
        
        await balances.insertOne(obj);
        res.sendStatus(201);
        return

    } catch (error) {
        res.sendStatus(500);
        console.log(error)
    }



}

export async function getBalance(req, res) {
    
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.sendStatus(401);

    try {
        
        const session = await sessions.findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }

        const user = await users.findOne({
            _id: session.userId
        })
        if (!user) return res.sendStatus(401);
        const userId = session.userId
      
        const balance = await balances.find({ userId }).toArray()
        res.status(200).send({balance,user: user.name})
        return

    } catch (error) {
        res.sendStatus(500);
        console.log(error)
    }

}
export async function sendStatus(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(401);

    try {
        const session = await sessions.findOne({ token });

        if (!session) {
            return res.sendStatus(401);
        }

        const user = await users.findOne({
            _id: session.userId
        })

        if (user) {
            res.sendStatus(200)
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(error)
    }

}
