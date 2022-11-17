import { token, balances, balanceSchema, sessions, users } from "../index.js"

export async function postBalance(req, res) {

    const { value, description, type } = req.body;
    const validation = balanceSchema.validate(req.body);
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (validation.error) {
        res.status(422).send("Todos os Campos São obrigatórios")
        return
    }
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
        user = user.name
        const obj = {
            user,
            value,
            description,
            type
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

        let user = await users.findOne({
            _id: session.userId
        })
        if (!user) return res.sendStatus(401);
        user = user.name
        const balances = await balances.find({ user }).toArray()
        res.status(200).send(balances)
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

