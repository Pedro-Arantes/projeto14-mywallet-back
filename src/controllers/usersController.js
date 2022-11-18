import { users, sessions  } from "../database/db.js"
import { token } from "../index.js";
import bcrypt from "bcrypt";

export async function postUser(req, res) {

    const { name, email, password } = req.body
    
    const criptPass = bcrypt.hashSync(password, 10);
    const findUser = await users.findOne({ email })
    if (findUser) {
        res.status(409).send("Usuário já cadastrado")
        return
    }

    const obj = {
        name: name,
        email: email,
        password: criptPass
    }
    try {
        await users.insertOne(obj)
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }


}
export async function loginUser(req, res) {

    const { email, password } = req.body
    

    try {
        const findUser = await users.findOne({ email })
        if (findUser && bcrypt.compareSync(password, findUser.password)) {
            const obj = {
                token,
                userId: findUser._id
            }
            await sessions.insertOne(obj)
            res.send(token)
        } else {
            res.status(401).send("usuário ou senha inválidos");
            return
        }
    } catch (error) {
        console.log(error)
    }

}

export async function deleteSession(req,res){

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

        await sessions.deleteOne({token})
        res.status(200).send({ message: "Deslogado com sucesso!"})
    } catch (error) {
        console.log(error)
    }
        
}



