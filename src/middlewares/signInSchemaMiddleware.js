import { signInSchema } from "../models/signInModel.js";

export function signInSchemaMd(req, res, next) {

    const validation = signInSchema.validate(req.body);
    if (validation.error) {
        res.status(422).send("Todos os Campos São obrigatórios")
        return
    }
    next();
}