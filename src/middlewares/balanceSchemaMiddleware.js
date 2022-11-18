import { balanceSchema } from "../index.js";

export function balanceSchemaMd(req, res, next) {

    const validation = balanceSchema.validate(req.body);
    if (validation.error) {
        res.status(422).send("Todos os Campos São obrigatórios")
        return
    }
    next();
}