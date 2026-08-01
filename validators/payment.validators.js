import Joi from 'joi';

export const paymentSchema = Joi.object({
  amount: Joi.number().positive().required(),
  method: Joi.string().valid('wallet', 'card').required()
});
