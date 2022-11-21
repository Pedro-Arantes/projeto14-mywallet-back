import { signUpSchema } from "../models/signUpModel.js";

export function signUpSchemaMd(req, res, next) {

    const validation = signUpSchema.validate(req.body);
    if (validation.error) {
        res.status(422).send("Todos os Campos São obrigatórios")
        return
    }
    next();
}