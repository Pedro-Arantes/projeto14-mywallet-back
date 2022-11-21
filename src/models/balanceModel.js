import joi from "joi";

export const balanceSchema = joi.object({
    value: joi.string().required(),
    description: joi.string().required(),
    type:joi.string().required()
});