import { users, token, sessions,signUpSchema,signInSchema } from "../index.js"
import bcrypt from "bcrypt";

export async function postUser(req, res) {

    const { name, email, password} = req.body
    const validation = signUpSchema.validate(req.body);

    if (validation.error) {
        res.status(422).send("Todos os Campos São obrigatórios")
        return
      }
    const criptPass = bcrypt.hashSync(password, 10);

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
    const validation = signInSchema.validate(req.body);

    if (validation.error) {
        res.status(422).send("Todos os Campos São obrigatórios")
        return
      }

    try {
        const findUser = await users.findOne({ email })
        if (findUser && bcrypt.compareSync(password, findUser.password)) {
            const obj = {
                token,
                userId:  findUser._id
            }
            await  sessions.insertOne(obj)
            res.send(token)
        } else {
            res.status(401).send("usuário ou senha inválidos");
        }
    } catch (error) {
        console.log(error)
    }

}



